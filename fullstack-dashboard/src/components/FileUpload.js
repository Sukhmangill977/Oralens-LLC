import React from 'react';

const FileUpload = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file.name); // Pass file name to parent
    }
  };

  return (
    <input type="file" onChange={handleFileChange} />
  );
};

export default FileUpload;
