// routes/violations.js

// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const PriorityQueue = require('../utils/priorityQueue'); // Import the PriorityQueue class

// Initialize router and priority queue
const router = express.Router();
const violationsQueue = new PriorityQueue();

// Utility function to log processed violations to a file
const logViolation = async (violation) => {
  try {
    const filePath = path.join(__dirname, '../data/processed_violations.json');
    const existingData = fs.existsSync(filePath) ? JSON.parse(await fs.promises.readFile(filePath, 'utf-8')) : [];
    existingData.push(violation);
    await fs.promises.writeFile(filePath, JSON.stringify(existingData, null, 2));
  } catch (error) {
    console.error('Error writing to file:', error);
  }
};

// Utility function to generate an invoice for processed violations
const generateInvoice = async (violation) => {
  try {
    const invoiceData = {
      id: Math.floor(Math.random() * 1000000), // Generate a random invoice ID
      violation: violation.data,
      amount: violation.priority * 100, // Example: fine amount based on priority level
      date: new Date()
    };
    const filePath = path.join(__dirname, '../data/invoices.json');
    const existingInvoices = fs.existsSync(filePath) ? JSON.parse(await fs.promises.readFile(filePath, 'utf-8')) : [];
    existingInvoices.push(invoiceData);
    await fs.promises.writeFile(filePath, JSON.stringify(existingInvoices, null, 2));
  } catch (error) {
    console.error('Error writing invoice to file:', error);
  }
};

// POST endpoint to report a new violation
router.post('/report', (req, res) => {
  const { type, severity } = req.body;
  const priorityMap = { High: 3, Medium: 2, Low: 1 };

  // Validate input
  if (!type || !severity || !priorityMap[severity]) {
    return res.status(400).json({ error: 'Type and valid severity are required' });
  }

  // Assign priority and add to the queue
  const priority = priorityMap[severity];
  violationsQueue.enqueue({ type, severity, timestamp: new Date() }, priority);
  res.status(201).json({ message: 'Violation reported and added to priority queue', data: { type, severity } });
});

// GET endpoint to view the next violation to process
router.get('/next', (req, res) => {
  if (violationsQueue.isEmpty()) {
    return res.status(200).json({ message: 'No violations to process' });
  }
  const nextViolation = violationsQueue.peek();
  res.status(200).json({ message: 'Next violation to process', data: nextViolation });
});

// DELETE endpoint to process (remove) the highest-priority violation
router.delete('/process', (req, res) => {
  if (violationsQueue.isEmpty()) {
    return res.status(200).json({ message: 'No violations to process' });
  }
  const processedViolation = violationsQueue.dequeue();
  
  // Log the violation and generate an invoice
  logViolation(processedViolation);
  generateInvoice(processedViolation);
  
  res.status(200).json({ message: 'Violation processed, logged, and invoice generated', data: processedViolation });
});

module.exports = router;
