const Item = require('../models/item');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.listItems = async (req, res) => {
    try {
        const foundItems = await Item.find({});
        res.json(foundItems)
    }
    catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.createItem = async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save()
        res.json(item)

    }
    catch (error) {
        res.status(400).json({})
    }
}

exports.getItem = async (req, res) => {
    try {
       const foundItem = await Item.findOne({_id: req.params.id})
       res.json(foundItem)
    }
    catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.updateItem = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const item = await Item.findOne({ _id: req.params.id })
        updates.forEach(update => item[update] = req.body[update])
        await item.save()
        res.json(item)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteItem = async (req, res) => {
    try {
        await Item.findOneAndDelete({'_id': req.params.id})
        res.json({ message: 'Item deleted' })
    }
    /* try {
        await Item.findOneAndDelete({'_id': req.params.id})
            .then(() => {
                res.redirect('/todos')
            })
    } */
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}