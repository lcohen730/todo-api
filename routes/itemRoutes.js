const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// INDEX
// list all items
router.get('/', itemController.listItems)

// CREATE
// backend only functionality that is used to create an item
router.post('/', itemController.createItem)

// SHOW/ GET ITEM
// backend only functionality that gets a specific item (but does not show it)
router.get('/:id', itemController.getItem)

// UPDATE
// backend only functionality that is used to update an item
router.put('/:id', itemController.updateItem)

// DELETE
// backend only functionality that is used to delete an item
router.delete('/:id', itemController.deleteItem)

module.exports = router