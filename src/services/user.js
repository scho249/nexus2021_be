const config = require('../config/index.js');
const User = require('../models/user.js')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    signIn,
    createUser,
    resetPassword
};

exports.signIn = (req, res) => {
    const user = await User.findOne({ username: req.body.username });
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

    var token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
};

exports.resetPassword = (req, res) => {
  const user = await User.findOne({ username: req.body.username });

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
  }
}

// async function getById(id) {
//     return await User.findById(id);
// }

exports.requestPasswordReset = (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email: req.body.email });

  var token = jwt.sign({ username: user.username }, config.JWT_SECRET, {expiresIn: 86400 });
  // await mailer.sendPasswordResetIntru(email, jwtToken);
  res.send('Email sent');

  if (err) {
    res.status(500).send({ message: err });
    return;
  }
};

exports.createUser = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    // save user
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "User was registered successfully!" });
    }
}

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
