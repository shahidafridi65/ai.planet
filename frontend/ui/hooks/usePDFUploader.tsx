// Import necessary hooks from React.
import React, { useEffect, useState } from 'react'
// Import the AI services which handles document uploads.
import AIServices from '../services/AIServices';

// Define a custom hook for uploading PDF files.
const usePDFUploader = (file: File | null) => {
  // State to store the upload ID of the file.
  const [fileUploadId, setFileUploadId] = useState<number | null>(null);
  // State to indicate the loading status.
  const [loading, setLoading] = useState(false);

  // useEffect hook to handle the file upload when the file changes.
  useEffect(() => {
    if (file) {
      setLoading(true); // Set loading to true when a file is being uploaded.
      // Call the uploadDocument function from the AIServices to upload the file.
      const uploadFile = async () => {
        const uploadResponse = await AIServices.uploadDocument(file);
        setLoading(false); // Set loading to false once the upload is complete.
        // Set the file upload ID from the response, or null if not available.
        setFileUploadId(uploadResponse?.record?.id || null);
      }
      uploadFile(); // Trigger the file upload.
    }
  }, [file]) // Only re-run the effect if the file changes.

  // Return the file upload ID and loading status.
  return { fileUploadId, loading };
}

export default usePDFUploader