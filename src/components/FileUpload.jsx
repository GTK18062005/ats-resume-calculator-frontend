import React from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload, Description } from '@mui/icons-material';

const FileUpload = ({ onFileSelect, selectedFile }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      onFileSelect(acceptedFiles[0]);
    }
  });

  return (
    <div>
      <div 
        {...getRootProps()} 
        className={`upload-zone ${isDragActive ? 'dragging' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="icon">
          <CloudUpload style={{ fontSize: 60 }} />
        </div>
        {isDragActive ? (
          <p>Drop your resume here...</p>
        ) : (
          <div>
            <p style={{ fontSize: '1.1rem', fontWeight: 500, color: '#333' }}>
              Drag & drop your resume here
            </p>
            <p style={{ color: '#666', marginTop: 5 }}>
              or click to browse files
            </p>
            <p style={{ color: '#999', fontSize: '0.9rem', marginTop: 10 }}>
              Supports: PDF, DOCX (Max 10MB)
            </p>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="file-info">
          <Description />
          <span>{selectedFile.name}</span>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            ({(selectedFile.size / 1024).toFixed(1)} KB)
          </span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;