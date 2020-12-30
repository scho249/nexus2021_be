const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const config = require('dotenv'); // .env file

// single database connection shared to all routes
// other routes can access using getDb
const initDb = require("./db/db.js").initDb
const getDb = require("./db/db.js").getDb
const bodyParser = require("body-parser")
const cors = require("cors");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

var corsOptions = {
  origin: "http://localhost:3101"
};

const indexRouter = require('./routes/index.js')
// const projectsRouter = require('./routes/projects.js')

const app = express()

// app.set('view engine','ejs')
app.set('views', __dirname + '/views')
// app.set('layout','layouts/layout')
// app.use(expressLayouts)
app.use(express.static('public'))

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/index', indexRouter)
app.get('/', (req, res) => {
  res.json({ message: "Welcome to NEXUS UW application." });
})
// app.use('/', indexRouter);
// app.use('/projects', projectsRouter);

const PORT = process.env.PORT || 3100;

initDb(function (err) {
    app.listen(PORT, (err) => {
        if (err) {
            throw err; //
        }
        console.log("API Up and running on port " + PORT);
    })}
);


// app.listen(PORT), ()  => { console.log(`Server running on port ${PORT}.`) };
