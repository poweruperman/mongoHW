const { Schema, model } = require('mongoose')

const db = {
    Scrap : require('./Scrap.js')(Schema, model)
}

module.exports = db