const express = require('express');
const jsxEngine = require('jsx-view-engine');
const methodOverride = require('method-override');
const morgan = require('morgan');
const itemRoutes = require('./routes/itemRoutes');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(morgan('combined'))
app.use('/todos', itemRoutes)
app.use(methodOverride('_method'))
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

module.exports = app