const mongoose = require('mongoose')

const intSchema = new mongoose.Schema({
  name: { type: String, required: true },
})

module.exports = mongoose.model('Interest', intSchema)
