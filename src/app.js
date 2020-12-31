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

var corsOptions = {
  origin: "http://localhost:3101"
};

const indexRouter = require('./routes/index.js')
// const projectsRouter = require('./routes/projects.js')

const app = express()

app.set('view engine','ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3100;

// initDb(function (err) {
//     app.listen(PORT, (err) => {
//         if (err) {
//             throw err; //
//         }
//         console.log("API Up and running on port " + PORT);
//     });
// });

function initial()  {
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
        new User({
              username: 'kwin',
              email: 'kwin@kwin.com',
              password: bcrypt.hashSync('kwinkwin', 10),
              firstName: 'kwin',
              lastName: 'kwin'
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'kwin' to users collection");
      });
  }});
};

db.mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


// app.use('/', indexRouter);
app.use('/', (req, res) => {
  res.json({ message: "Welcome to NEXUS UW application." });
});
app.listen(PORT), ()  => { console.log(`Server running on port ${PORT}.`) };

// app.use('/', indexRouter);
// app.use('/projects', projectsRouter);
