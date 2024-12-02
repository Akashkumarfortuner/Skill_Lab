const express = require('express');
const orders = require('../data/orders');

const router = express.Router();

// Place Order
router.post('/', (req, res) => {
  const { items } = req.body;
  const newOrder = { id: orders.length + 1, items, status: 'Preparing' };
  orders.push(newOrder);
  res.json({ message: 'Order placed successfully', order: newOrder });
});

// Get All Orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Get Specific Order
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

module.exports = router;
