const express = require('express');
const { validateMenuItem } = require('../utils/validate');
const menu = require('../data/menu');

const router = express.Router();

// Add Menu Item
router.post('/', (req, res) => {
  const { name, price, category } = req.body;
  if (!validateMenuItem(name, price, category)) {
    return res.status(400).json({ error: 'Invalid menu item details' });
  }
  const newItem = { id: menu.length + 1, name, price, category };
  menu.push(newItem);
  res.json({ message: 'Menu item added successfully', item: newItem });
});

// Get Menu
router.get('/', (req, res) => {
  res.json(menu);
});

module.exports = router;
