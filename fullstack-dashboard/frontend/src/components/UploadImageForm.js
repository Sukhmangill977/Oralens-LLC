import React, { useState } from 'react';

function UploadImageForm({ orgId, teamId, memberId }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(""); // For displaying status messages

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload submission
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      // Make API request to upload the image
      const response = await fetch(`/api/organizations/${orgId}/teams/${teamId}/members/${memberId}/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      // Display success or failure message
      if (response.ok) {
        setMessage("Image uploaded successfully.");
      } else {
        setMessage(result.error || "Failed to upload image.");
      }
    } catch (error) {
      setMessage("An error occurred while uploading the image.");
    }
  };

  return (
    <div>
      <h3>Upload Image for Member</h3>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadImageForm;
