const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  user_id:  {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User'
  },
  name: { type: String, required: true },
  email: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User'
  },
  // location: {
  //   city: String,
  //   postal: { Number, required: true}
  // },
  education: {
    school: { type: String },
    degree: { type: String},
    major: { type: String}
  },
  created_at: { Date, required: true},
  updated_at: { Date, required: true },
  bio_description: { type: String },
  skills: { [{ type: String }] },
  roles: { [{ type: String }] }
})
module.exports = mongoose.model('Profile', profileSchema)
