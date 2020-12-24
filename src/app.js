const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const config = require('dotenv'); // .env file

// single database connection shared to all routes
// other routes can access using getDb
const initDb = require("./db/db.js").initDb;
const getDb = require("./db/db.js").getDb;
// const { registerRoutes } = require('./routes');

const indexRouter=require('./routes/index.js')
const projectsRouter=require('./routes/projects.js')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


app.set('view engine','ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


const port = 3001;

initDb(function (err) {
    app.listen(port, (err) => {
        if (err) {
            throw err; //
        }
        console.log("API Up and running on port " + port);
    })}
);

app.use('/index', indexRouter)
app.get('/', (req, res) => {
  res.send('NEXUS UW App Backend 1')
})
app.use('/', indexRouter);
app.use('/projects', projectsRouter);


app.listen(process.env.PORT || 3000), () => console.log(`Server running on port ${process.env.PORT}`);
