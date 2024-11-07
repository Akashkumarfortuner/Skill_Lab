// src/components/ProcessViolation.js
import React from 'react';
import axios from 'axios';

function ProcessViolation({ onProcessed }) {
  const handleProcess = async () => {
    try {
      const response = await axios.delete('http://localhost:3000/violations/process');
      alert(response.data.message);
      onProcessed(); // Callback to refresh violation queue
    } catch (error) {
      console.error('Error processing violation:', error);
      alert('Failed to process violation');
    }
  };

  return (
    <div>
      <button onClick={handleProcess}>Process Next Violation</button>
    </div>
  );
}

export default ProcessViolation;
