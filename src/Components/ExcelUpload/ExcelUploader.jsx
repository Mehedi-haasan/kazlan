import React, { useState } from 'react';
import BaseUrl from '../../Constant';


const ExcelUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage]=useState({})
  const [jsonData, setJsonData] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert('Please select a file.');

    const formData = new FormData();
    formData.append('excel', selectedFile);

    try {
      const response = await fetch(`${BaseUrl}/upload/excel`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setJsonData(result.data);
      } else {
        setMessage({ id: Date.now(), mgs: result.message });
      }
    } catch (error) {
      setMessage({ id: Date.now(), mgs: error.message });
    }
  };

  return (
    <div>
      <h2>Upload Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <h3>Parsed JSON Data:</h3>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default ExcelUploader;
