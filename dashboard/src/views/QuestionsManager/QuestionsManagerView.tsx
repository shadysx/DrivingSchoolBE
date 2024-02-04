import React, { useEffect, useState } from 'react';
import { Question } from '../../interfaces/Interfaces'; 
import { DataGrid, GridActionsCellItem, GridColDef, GridEditCellValueParams, GridRowId, GridRowModes, GridRowModesModel, GridRowsProp, GridToolbarContainer, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

interface QuestionsManagerProps {
  questions: Question[];
  handleCellEdit: (question: Question) => void
  handleSaveChanges: () => void
  handleEdit: (id: GridRowId) => void 
  handleDelete: (id: GridRowId) => void
}

function QuestionsManagerView({ questions, handleEdit, handleDelete }: QuestionsManagerProps) {
  const handleProcessRowUpdateError = () => {
    // TODO
  }

  function EditToolbar() {
    const handleClick = () => {
      // Creation Logic
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Titre', width: 250, editable: true },
    { field: 'text', headerName: 'Question', width: 800 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={() => handleEdit(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() => handleDelete(id)}
              color="inherit"
            />,
          ];

      }
    }
  ];

  return (
    <>
    <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={questions}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
        }}
        pageSizeOptions={[50, 100]}
        checkboxSelection
        onProcessRowUpdateError={handleProcessRowUpdateError}
        slots={{
          toolbar: EditToolbar,
        }}
      />
    </div>       

    </>
  );
      }

export default QuestionsManagerView;