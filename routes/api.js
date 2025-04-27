/**
 * API Routes for Claude MCP Demo
 */

const express = require('express');
const router = express.Router();
const { formatDate, generateId } = require('../utils/helpers');

// Sample data for demonstration
let items = [
  { id: 'abc123', name: 'Item 1', created: new Date() },
  { id: 'def456', name: 'Item 2', created: new Date() },
  { id: 'ghi789', name: 'Item 3', created: new Date() }
];

// Get all items
router.get('/items', (req, res) => {
  // Format the dates before sending
  const formattedItems = items.map(item => ({
    ...item,
    created: formatDate(item.created)
  }));
  
  res.json(formattedItems);
});

// Get a specific item by ID
router.get('/items/:id', (req, res) => {
  const item = items.find(item => item.id === req.params.id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.json({
    ...item,
    created: formatDate(item.created)
  });
});

// Create a new item
router.post('/items', (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const newItem = {
    id: generateId(),
    name,
    created: new Date()
  };
  
  items.push(newItem);
  
  res.status(201).json({
    ...newItem,
    created: formatDate(newItem.created)
  });
});

// Update an item
router.put('/items/:id', (req, res) => {
  const { name } = req.body;
  const itemIndex = items.findIndex(item => item.id === req.params.id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  items[itemIndex] = {
    ...items[itemIndex],
    name
  };
  
  res.json({
    ...items[itemIndex],
    created: formatDate(items[itemIndex].created)
  });
});

// Delete an item
router.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(item => item.id === req.params.id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const deletedItem = items[itemIndex];
  items = items.filter(item => item.id !== req.params.id);
  
  res.json({
    ...deletedItem,
    created: formatDate(deletedItem.created)
  });
});

module.exports = router;
