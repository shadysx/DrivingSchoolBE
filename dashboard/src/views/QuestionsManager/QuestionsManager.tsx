import React from 'react';
import { Question } from '../../interfaces/Interfaces'; 
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Titre', width: 250 },
  { field: 'text', headerName: 'Question', width: 800 },
];


interface QuestionsManagerProps {
  questions: Question[];
}

function QuestionsManager({ questions }: QuestionsManagerProps) {
  return (
    <>
    <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={questions}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[50, 100]}
        checkboxSelection
      />
    </div>            
    </>
  );
}

export default QuestionsManager;