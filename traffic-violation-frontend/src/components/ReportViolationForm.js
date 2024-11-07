// src/components/ReportViolationForm.js
import React, { useState } from 'react';
import axios from 'axios';

function ReportViolationForm() {
  const [type, setType] = useState('');
  const [severity, setSeverity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/violations/report', {
        type,
        severity,
      });
      alert(response.data.message);
      setType('');
      setSeverity('');
    } catch (error) {
      console.error('Error reporting violation:', error);
      alert('Failed to report violation');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report a Violation</h2>
      <label>
        Type:
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
      </label>
      <label>
        Severity:
        <select value={severity} onChange={(e) => setSeverity(e.target.value)} required>
          <option value="">Select severity</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </label>
      <button type="submit">Report Violation</button>
    </form>
  );
}

export default ReportViolationForm;
