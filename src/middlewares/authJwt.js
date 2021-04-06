const jwt = require("jsonwebtoken");
const config = require("../config/index.js");
const User = require('../models/user.js')

authJwt = (req, res, next) => {
    const token = req.headers["x-access-token"];
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(401).send({ message: "Unauthorized!" });
                return;
            }
            console.log(user.id)
            req.id = user.id;
            next();
        });
    } else {
        res.status(403).send({ message: "No token provided!" });
        return;
    }
};

// isAdmin = (req, res, next) => {
//   User.findById(req.userId).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//
//     Role.find(
//       {
//         _id: { $in: user.roles }
//       },
//       (err, roles) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }
//
//         for (let i = 0; i < roles.length; i++) {
//           if (roles[i].name === "admin") {
//             next();
//             return;
//           }
//         }
//
//         res.status(403).send({ message: "Require Admin Role!" });
//         return;
//       }
//     );
//   });
// };
//
// isModerator = (req, res, next) => {
//   User.findById(req.userId).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }
//
//     Role.find(
//       {
//         _id: { $in: user.roles }
//       },
//       (err, roles) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }
//
//         for (let i = 0; i < roles.length; i++) {
//           if (roles[i].name === "moderator") {
//             next();
//             return;
//           }
//         }
//
//         res.status(403).send({ message: "Require Moderator Role!" });
//         return;
//       }
//     );
//   });
// };

// const authJwt = {
//   verifyToken
// };
//
module.exports = authJwt;
