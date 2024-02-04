import React, { FC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel, Grid, Typography } from '@mui/material';
import { Question } from '../../../interfaces/Interfaces';
import Checkbox from '@mui/material/Checkbox';

interface QuestionViewDialogProps {
  open: boolean;
  onClose: () => void;
  question: Question;
};

const QuestionViewDialog: FC<QuestionViewDialogProps> = ({ open, onClose, question }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
    <DialogTitle>Question</DialogTitle>
    <DialogContent>
      <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{flex: 1, padding: 30}}> 
          <img src={question?.imageUri} alt="Question" style={{ maxWidth: '100%', height: 'auto', objectFit: "cover"}} />
          <TextField
            label="Question"
            variant="outlined"
            multiline
            fullWidth
            value={question?.text}
            InputProps={{
              readOnly: false,
            }}
            style={{ marginTop: 10 }}
          />
          <TextField
            label="Explanation"
            variant="outlined"
            multiline
            fullWidth
            rows={4}
            value={question?.explanation}
            InputProps={{
              readOnly: false,
            }}
            style={{ marginTop: 10 }}
          />
        </div>
        <div style={{flex: 1, padding: 30}}> 
        <div style={{}}>
        <FormControlLabel
              control={<Checkbox checked={question?.isSerious}/>}
              label="Is Serious"
              style={{ marginTop: 10 }}
            />
          {/* Right side for Answers */}
          {question?.answers.map((answer, index) => (
            <TextField
              key={index}
              label={`Answer ${index + 1}`}
              variant="outlined"
              multiline
              fullWidth
              value={answer}
              InputProps={{
                readOnly: false,
              }}
              style={{ marginTop: 10}}
            />
          ))}
        </div>
        </div>

      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
  );
}

export default QuestionViewDialog;