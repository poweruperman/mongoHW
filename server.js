const axios = require('axios')
const cheerio = require('cheerio')
const db = require('mongojs')('scrap')
const { join } = require('path')
const express = require('express')
const app = express()
// const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URL : "mongodb://localhost/scraps_db";
require('dotenv').config()


app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended : true}))
app.use(express.json())
app.engine('.hbs', require('express-handlebars')({ defaultLayout : 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

require('./routes')(app)

require('mongoose').connect(MONGODB_URI, { useNewUrlParser : true, useCreateIndex : true, useFindAndModify : true })
    // .then(_ => app.listen(PORT, () => console.log(`PORT number is : ${PORT}`)))
    .then(_ => app.listen(3030, () => console.log(`PORT number is : 3030`)))
    .catch(e => console.log(e))