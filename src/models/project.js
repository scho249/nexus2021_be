const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: { type:String, required: true },
  owner_id: {
    type: Schema.Types.ObjectID,
    ref: 'User'
  },
  team: {
    size: { type:Number, required: true},
    usernames: [String]
  },
  location: {
    city: String,
    postal: { Number, required: true}
  },
  status: {
    type: String,
    enum:['Active','Completed','Halted','Removed','New']},
  duration: {
    length: {
      type: String,
      enum:['1-3 months','3-6 months','6-9 months', 'More than 9 months']},
    created_date: Date,
    end_date: Date
  }
  description: {type:String, required: true},
  skill: {
    type: [Schema.Types.ObjectID],
    ref: 'Skill'
  },
  roles: {
    type: [Schema.Types.ObjectID],
    ref: 'Roles'
  },
  interests: {
    type: [Schema.Types.ObjectID],
    ref: 'Interests'
  }
})

module.exports = mongoose.model('Project', projectSchema)
