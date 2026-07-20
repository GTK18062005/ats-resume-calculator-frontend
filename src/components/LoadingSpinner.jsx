import React from 'react';

const LoadingSpinner = ({ message = 'Analyzing your resume...' }) => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p style={{ marginTop: 20, color: '#667eea', fontWeight: 500 }}>
        {message}
      </p>
      <p style={{ color: '#999', fontSize: '0.9rem' }}>
        This may take a few seconds
      </p>
    </div>
  );
};

export default LoadingSpinner;