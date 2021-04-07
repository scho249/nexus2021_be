const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  user_id:  {  type: String  },
  fullName: { type: String },
  education: {
    campus: {
      type: String,
      enum: ['Seattle','Tacoma','Bothell'] },
    year: { type: String },
    major: { type: String }
  },
  interest: [{ type: String }],
  skills: [{ type: String }],
  bio: { type: String },
  created_at: { type: Date, required: true},
  updated_at: { type: Date, required: true },
})
module.exports = mongoose.model('Profile', profileSchema)
