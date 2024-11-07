// src/components/ViolationQueue.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViolationQueue() {
  const [nextViolation, setNextViolation] = useState(null);

  const fetchNextViolation = async () => {
    try {
      const response = await axios.get('http://localhost:3000/violations/next');
      setNextViolation(response.data.data);
    } catch (error) {
      console.error('Error fetching next violation:', error);
    }
  };

  useEffect(() => {
    fetchNextViolation();
  }, []);

  return (
    <div>
      <h2>Next Violation to Process</h2>
      {nextViolation ? (
        <div>
          <p>Type: {nextViolation.data.type}</p>
          <p>Severity: {nextViolation.data.severity}</p>
          <p>Timestamp: {new Date(nextViolation.data.timestamp).toLocaleString()}</p>
        </div>
      ) : (
        <p>No violations to process</p>
      )}
      <button onClick={fetchNextViolation}>Refresh</button>
    </div>
  );
}

export default ViolationQueue;
