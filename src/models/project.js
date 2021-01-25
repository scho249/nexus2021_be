const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
      title: { type: String, required: true },
      owner_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
      },
      size: {
        type: String,
        enum:['Micro','Small','Medium','Large']
      },
      team: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
      }],
      location: { type: String, required: true },
      status: {
        type: String,
        enum:['Active','Completed','Halted','Removed','New']},
      duration: {
        length: {
          type: String,
          enum:['1-3 months','3-6 months','6-9 months', 'More than 9 months']},
        created_date: { type: Date },
        end_date: {type: Date }
      },
      updated_at: { type: Date },
      description: { type: String, required: true },
      skill: [{ type: String }],
      categories:  [{ type: String }],
      roles:  [{
        title: { type: String },
        skill: [{ type: String }]
      }]
})

module.exports = mongoose.model('Project', projectSchema)
