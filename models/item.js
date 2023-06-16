const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const itemSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: String,
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item