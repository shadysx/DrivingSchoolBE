import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
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
import { API, UPDATE_QUESTION, UPDATE_QUESTIONS } from '../../../constants';

interface QuestionViewDialogProps {
  open: boolean;
  onClose: () => void;
  selectedQuestion: Question;
};


const QuestionViewDialog: FC<QuestionViewDialogProps> = ({ open, onClose, selectedQuestion}) => {
  const [editedQuestion, setEditedQuestion] = useState<Question>({});
  const [isModified, setIsModified] = useState(false);

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
      console.log(editedQuestion)
      console.log("LOG (QuestionManager: saveQuestionToServer):", JSON.stringify(editedQuestion, null, 4))
      const result = await axios.put(
        API + UPDATE_QUESTION,
        JSON.stringify(editedQuestion),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsModified(false);
      onClose();
    } catch (error) {
      alert("ERROR making POST request: (QuestionManager: saveQuestionToServer) " + error);
    }
  };

  return (
    <Dialog open={open} onClose={handleIsModifiedData} fullWidth maxWidth="md">
    <DialogTitle>Question</DialogTitle>
    <DialogContent>
      <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{flex: 1, padding: 30}}> 
          <img src={editedQuestion?.imageUri} alt="Question" style={{ maxWidth: '100%', height: 'auto', objectFit: "cover"}} />
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
              label={`Réponse ${index + 1}`}
              variant="outlined"
              multiline
              fullWidth
              value={answer}
              InputProps={{
                readOnly: false,
              }}
              style={{ marginTop: 10}}
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