const { join } = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraps_db"
require('dotenv').config()


app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.engine('.hbs', require('express-handlebars')({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

require('./routes')(app)

require('mongoose').connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true })
    .then(_ => app.listen(PORT, () => console.log(`PORT number is : ${PORT}`)))
    .catch(e => console.log(e))