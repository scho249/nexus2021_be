const config = require('../config/index.js');
const User = require('../models/user.js')
const Profile = require('../models/profile.js');
const upload  = require("../app.js");

exports.createProfile = (upload, req, res) => {
    console.log('here');
    upload.single('file');
    console.log("File was uploaded successfully!");
    Profile.findOne({ user_id: req.params.user_id })
           .exec((err, profile) => {
               if (err) {
                   res.status(500).send({ message: err });
                   return;
               } else if (profile) {
                   res.status(400).send({message: "Profile already exists"});
                   return;
               } else {
                   console.log(req.resume_id);

                   const profile = new Profile({
                       user_id: req.params.user_id,
                       fullName: req.body.fullName,
                       education: {
                           campus: req.body.education.campus,
                           year: req.body.education.year,
                           major: req.body.education.major },
                       bio: req.body.description,
                       skills: req.body.skills,
                       interest: req.body.interests,
                       created_at: new Date(Date.now()),
                       updated_at: new Date(Date.now()),
                   });

                   profile.save((err1, profile) => {
                       if (err1) {
                           res.status(500).send({ message: err1 });
                           return;
                       }
                       res.json({ message: "Profile was successfully made!",
                               profile_id: profile._id,
                               user: profile.fullName});
                   });
               };
       });
}
