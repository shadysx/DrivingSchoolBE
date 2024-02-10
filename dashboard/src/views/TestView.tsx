import React, { useState, useRef } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const DragAndDropUpload = () => {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    await uploadImage(file);
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    await uploadImage(file);
  };

  const uploadImage = async (file) => {
    try {
      const storage = getStorage();
      const imageRef = ref(storage, 'images/' + file.name);
      const snapshot = await uploadBytes(imageRef, file);
      console.log('Uploaded a blob or file!', snapshot);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        width: 200,
        height: 200,
        border: '2px dashed',
        borderColor: dragging ? 'blue' : 'black',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />
      <p>Drag & Drop Image Here</p>
      <button onClick={() => fileInputRef.current.click()}>Browse</button>
    </div>
  );
};

export default DragAndDropUpload;
