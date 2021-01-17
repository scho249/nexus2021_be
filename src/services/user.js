const config = require('../config/index.js');
const User = require('../models/user.js')
const mailer = require('./mailer/index.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signIn = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(user.email + "pass:" + user.password)

    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
    }

    var token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
        id: user._id,
        email: user.email,
        accessToken: token
      });
  });
};

exports.resetPassword = (req, res) => {
  const user = User.findOne({ username: req.body.username });

  if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  Object.assign(user, req.body);

  user.save((err, user) => {
      if (err) {
          res.status(500).send({ message: err });
          return;
      }
      res.send({ message: "User was updated successfully!" });
  });
}

// async function getById(id) {
//     return await User.findById(id);
// }

// async function requestPasswordReset(req, res) {
//   const { email } = req.query;
//   const user = User.findOne({ email: req.body.email });
//   console.log(`${user.email}`);
//   var token = jwt.sign({ username: user.username }, config.JWT_SECRET, { expiresIn: 86400 });
//   let msg = await mailer.sendPasswordResetIntru(email, token);
//   res.send('Email sent for user `${user.username}`, msg id is %s', msg.messageID);
//
//   if (err) {
//     res.status(500).send({ message: err });
//     return;
//   }
// };

// exports.requestPasswordReset = requestPasswordReset;

exports.createUser = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    // save user
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "User was registered successfully!" });
    })
};

// exports.update = (req, res) => {
//     const user = await User.findById(id);
//
//     // validate
//     if (!user) throw 'User not found';
//     // if (user.username !== req.body.username
//     //     && await User.findOne({ username: req.body.username })) {
//     //     throw 'Username "' + req.body.username + '" is already taken';
//     // }
//
//     // hash password if it was entered
//     if (req.body.password) {
//         userParam.hash = bcrypt.hashSync(userParam.password, 10);
//     }
//
//     // copy userParam properties to user
//     Object.assign(user, userParam);
//
//     user.save((err, user) => {
//         if (err) {
//             res.status(500).send({ message: err });
//             return;
//         }
//         res.send({ message: "User was updated successfully!" });
//     }
// }

// exports._delete(id) {
//     await User.findByIdAndRemove(id);
// }
