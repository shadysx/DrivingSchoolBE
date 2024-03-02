import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel, Grid, Typography } from '@mui/material';
import { Question, createInitialQuestion } from '../../../interfaces/Interfaces';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { API, CREATE_QUESTION, UPDATE_QUESTION, UPDATE_QUESTIONS } from '../../../constants';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Resizer from 'react-image-file-resizer';

interface QuestionViewDialogProps {
  open: boolean;
  onClose: () => void;
  selectedQuestion: Question;
  isCreating: boolean
};


const QuestionViewDialog: FC<QuestionViewDialogProps> = ({ open, onClose, selectedQuestion, isCreating}) => {
  const [editedQuestion, setEditedQuestion] = useState<Question>({});
  const [isModified, setIsModified] = useState(false);

  //#region Drag and drop ting
  const [dragging, setDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);
  const [highlightDropZone, setHighlightDropZone] = useState(false);

  useEffect(() => {
    const handleWindowDragOver = (e: DragEvent) => {
      e.preventDefault();
      setHighlightDropZone(true);
    };

    const handleWindowDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setHighlightDropZone(false);
    };

    window.addEventListener('dragover', handleWindowDragOver);
    window.addEventListener('dragleave', handleWindowDragLeave);

    return () => {
      window.addEventListener('dragover', handleWindowDragOver);
      window.addEventListener('dragleave', handleWindowDragLeave);
    };
  }, []);

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDragging(false);
    setHighlightDropZone(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHighlightDropZone(true);
  };

  const handleDragLeave = () => {
    setHighlightDropZone(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    setDragPosition(null);
    setHighlightDropZone(false);

    const file = e.dataTransfer.files[0];
    await uploadImage(file);
  };

  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer( file, maxWidth, maxHeight, 'JPEG', 60, 0, (uri) => {
          resolve(uri);
        },
        'blob'
      );
    });
  };

  // This will upload an image and a thumbnail
  const uploadImage = async (file: File) => {
    try {
      let resizedImage = await resizeImage(file, 1050, 750)
      const storage = getStorage();
      const imageRef = ref(storage, `images/${uuidv4()}.jpg`)
      const snapshot = await uploadBytes(imageRef, resizedImage as Blob);
      const newUrl = await getDownloadURL(snapshot.ref)
      console.log('Uploaded a blob or file!', snapshot);

      console.log("resizedURL full ", newUrl)
      resizedImage = await resizeImage(file, 525, 375)
      
      const resizedImageRef = ref(storage, `images/thumbnails/${uuidv4()}.jpg`)
      const snapshotResizedImage = await uploadBytes(resizedImageRef, resizedImage as Blob);
      const newResizedImageUrl = await getDownloadURL(snapshotResizedImage.ref)
      console.log("resizedURL", newResizedImageUrl)

      setEditedQuestion((prevQuestion) => ({ ...prevQuestion, imageUri: newUrl, thumbnailUri: newResizedImageUrl }));
      setIsModified(true);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  //#endregion 

  useEffect(() => {
    setEditedQuestion({...selectedQuestion})
  }, [selectedQuestion])

  const handleInputChange = (field: string, value: string | boolean) => {
    setEditedQuestion((prevQuestion) => ({ ...prevQuestion, [field]: value }));
    setIsModified(true);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...editedQuestion.answers];
    updatedAnswers[index] = value;
    setEditedQuestion((prevQuestion) => ({ ...prevQuestion, answers: updatedAnswers }));
    setIsModified(true);
  };

  const handleIsModifiedData = () => {
    if (isModified) {
      const userConfirmed = window.confirm("Vous allez perdre les changements en cours, voulez-vous quand même quitter ?");
        if (userConfirmed) {
          setIsModified(false);
          onClose();
      }
    }
    else {
      onClose();
    }
  }

  const handleSaveQuestion = async (editedQuestion: Question) => {
    try {
      editedQuestion.answerIndex = 0
      console.log("LOG (QuestionManager: saveQuestionToServer):", JSON.stringify(editedQuestion, null, 4))
      const result = isCreating
      ? await axios.post(API + CREATE_QUESTION, JSON.stringify(editedQuestion), {
          headers: {
            "Content-Type": "application/json",
          },
        })
      : await axios.put(API + UPDATE_QUESTION, JSON.stringify(editedQuestion), {
          headers: {
            "Content-Type": "application/json",
          },
        });
    } catch (error) {
      alert("ERROR making POST request: (QuestionManager: saveQuestionToServer) " + error);
    } finally {
      setIsModified(false);
      onClose();
    }

  };

  return (
    <Dialog open={open} onClose={handleIsModifiedData} fullWidth maxWidth="md">
    <DialogTitle>{isCreating ? "Créer une question" : "Modifier une question"}</DialogTitle>
    <DialogContent>
      <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{flex: 1, padding: 30}}> 
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            position: 'relative',
            width: '100%',
            height: 'auto', 
            border: highlightDropZone ? '2px dashed #2196F3' : '2px dashed transparent',
            borderRadius: '5px',
            transition: 'border 0.3s ease-in-out',
            maxWidth: '100%', 
            objectFit: "cover"
          }}
        >
          {dragging && dragPosition && (
            <div
              style={{
                position: 'absolute',
                left: dragPosition.x,
                top: dragPosition.y,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                width: '200px', 
                height: 'auto', 
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
              onDragEnd={handleDragEnd}
            >
              <p>Drop Image Here</p>
            </div>
          )}
          <img
            src={editedQuestion?.imageUri}
            alt="Question"
            style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
          <TextField
            label="Question"
            variant="outlined"
            multiline
            fullWidth
            value={editedQuestion?.text}
            InputProps={{
              readOnly: false,
            }}
            style={{ marginTop: 10 }}
            onChange={(e) => handleInputChange('text', e.target.value)}
          />
          <TextField
            label="Explications"
            variant="outlined"
            multiline
            fullWidth
            rows={4}
            value={editedQuestion?.explanation || ""}
            InputProps={{
              readOnly: false,
            }}
            style={{ marginTop: 10 }}
            onChange={(e) => handleInputChange('explanation', e.target.value)}
          />
        </div>
        <div style={{flex: 1, padding: 30}}> 
        <div style={{}}>

        
          {/* Right side for Answers */}
          {editedQuestion?.answers?.map((answer, index) => (
            <TextField
              key={index}
              label={index === 0 ? `Réponse ${index + 1} (Bonne réponse)` : `Réponse ${index + 1}`}
              variant="outlined"
              multiline
              fullWidth
              value={answer}
              InputProps={{
                readOnly: false,
              }}
              style={{ marginTop: 10 }}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          ))}
          <TextField
            label="Url Image"
            variant="outlined"
            fullWidth
            value={editedQuestion?.imageUri}
            InputProps={{
              readOnly: false,
            }}
            style={{ marginTop: 10 }}
            onChange={(e) => handleInputChange('imageUri', e.target.value)}
          />
          <FormControlLabel
              control={<Checkbox checked={editedQuestion?.isSerious || false}/>}
              label="Faute grave"
              style={{ marginTop: 10 }}
              onChange={() => handleInputChange('isSerious', !editedQuestion.isSerious)}
            />
        </div>
        </div>

      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleIsModifiedData()} color="primary">
        Annuler
      </Button>
      <Button onClick={() => handleSaveQuestion(editedQuestion)} color="primary">
        Sauvegarder
      </Button>
    </DialogActions>
  </Dialog>
  );
}

export default QuestionViewDialog;