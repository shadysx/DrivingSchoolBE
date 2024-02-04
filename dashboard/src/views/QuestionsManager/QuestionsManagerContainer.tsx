
import React, { useEffect, useState } from 'react';
import QuestionsManagerView from './QuestionsManagerView'; // Import the presentational component
import { Question } from '../../interfaces/Interfaces'; 
import axios from "axios"
import { API, CREATE_QUESTION, GET_QUESTIONS, UPDATE_QUESTION, UPDATE_QUESTIONS } from '../../constants';
import { GridRowId } from '@mui/x-data-grid';
import QuestionViewDialog from '../../components/dialogs/QuestionViewDialog/QuestionViewDialog';

function QuestionsManagerContainer() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editedData, setEditedData] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log(editedData)
  }, [editedData])

  // This build a collection of all the edited questions so we can eventually implement
  // a savechanges button instead of saving directly 
  const addQuestionToEditedData = (editedQuestion: Question) => {
    setEditedData((prevEditedData) => {
      const isQuestionEdited = prevEditedData.some((question) => question.id === editedQuestion.id);
  
      if (isQuestionEdited) {
        // If the question is already in editedData, update it
        console.log("Was edited")
        return prevEditedData.map((question) =>
          question.id === editedQuestion.id ? editedQuestion : question
        );
      } else {
        // If the question is not in editedData, add it
        console.log("Was not edited")
        return [...prevEditedData, editedQuestion];
      }
    });
  };

  const handleEdit = (id: GridRowId) => {
    let question = questions.find(q => q.id == id)
    setSelectedQuestion(question) 
    setOpen(true)
  };

  const handleDelete = (id: GridRowId) => {

  };

  const handleCloseDialog = () => {
    setOpen(false);
  }

  // Save the questions
  const saveQuestionsToServer = async () => {
    try {
      console.log("LOG (QuestionManager: saveQuestionsToServer):", JSON.stringify(editedData, null, 4))
      const result = await axios.put(
        API + UPDATE_QUESTIONS,
        JSON.stringify(editedData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("ERROR making POST request: (QuestionManager: saveQuestionsToServer)", error);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(API + GET_QUESTIONS);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Pass the data as props to the presentational component
  return (
    <>

    <QuestionsManagerView  
            questions={questions} 
            handleCellEdit={addQuestionToEditedData} 
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleSaveChanges={saveQuestionsToServer}/>
    <QuestionViewDialog open={open} onClose={handleCloseDialog} question={selectedQuestion} />
    </>


  )
}

export default QuestionsManagerContainer;