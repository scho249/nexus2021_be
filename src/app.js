const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const config = require('dotenv'); // .env file
const bcrypt = require('bcryptjs');

// single database connection shared to all routes
// other routes can access using getDb
// const initDb = require("./db/db.js").initDb
// const getDb = require("./db/db.js").getDb
const bodyParser = require("body-parser")
const cors = require("cors");

const db = require('./models/index.js');
const User=db.User;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express()

var corsOptions = {
  origin: "http://localhost:3101"
};

const indexRouter = require('./routes/index.js')
// const projectsRouter = require('./routes/projects.js')


app.set('view engine','ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// parse requests of content-type - application/json
app.use(cors(corsOptions));

//possible fix the CORS issue - Ajay
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to NEXUS UW application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// initDb(function (err) {
//     app.listen(PORT, (err) => {
//         if (err) {
//             throw err; //
//         }
//         console.log("API Up and running on port " + PORT);
//     });
// });

// function initial()  {
//   User.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//         new User({
//               email: 'kwin@kwin.com',
//               password: bcrypt.hashSync('kwinkwin', 10),
//               firstName: 'kwin',
//               lastName: 'kwin'
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }
//         console.log("added 'kwin' to users collection");
//       });
//   }});
// };

db.mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

require('./routes/auth.js')(app);
require('./routes/projects.js')(app);
