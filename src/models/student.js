// const mongoose = require('mongoose')
//
// const projectSchema = new mongoose.Schema({
//   title: { type:String, required: true },
//   owner_id: {
//     type: mongoose.Schema.Types.ObjectID,
//     ref: 'User'
//   },
//   size: { type:Number, required: true },
//   team: {
//     type: [Schema.Types.ObjectID],
//     ref: 'User'
//   },
//   location: {
//     city: String,
//     postal: { Number, required: true}
//   },
//   status: {
//     type: String,
//     enum:['Active','Completed','Halted','Removed','New']},
//   duration: {
//     length: {
//       type: String,
//       enum:['1-3 months','3-6 months','6-9 months', 'More than 9 months']},
//     created_date: {Date, required: true},
//     end_date: Date
//   },
//   updated_at: { Date, required: true },
//   description: { type: String, required: true },
//   skill: {
//     type: [Schema.Types.ObjectID],
//     ref: 'Skill'
//   },
//   roles: {
//     type: [Schema.Types.ObjectID],
//     ref: 'Role'
//   },
//   interests: {
//     type: [Schema.Types.ObjectID],
//     ref: 'Interest'
//   }
// })
//
// module.exports = mongoose.model('Project', projectSchema)
