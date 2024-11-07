// src/App.js
import React, { useState } from 'react';
import ReportViolationForm from './components/ReportViolationForm';
import ViolationQueue from './components/ViolationQueue';
import ProcessViolation from './components/ProcessViolation';

function App() {
  const [refreshQueue, setRefreshQueue] = useState(false);

  const handleProcessed = () => {
    setRefreshQueue(!refreshQueue);
  };

  return (
    <div>
      <h1>Traffic Violation Management System</h1>
      <ReportViolationForm />
      <ViolationQueue key={refreshQueue} />
      <ProcessViolation onProcessed={handleProcessed} />
    </div>
  );
}

export default App;
