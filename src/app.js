const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const config = require('dotenv');
// const { registerRoutes } = require('./routes');

const indexRouter=require('./routes/index.js')
const projectsRouter=require('./routes/projects.js')



app.set('view engine','ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nexus',
{ useUnifiedTopology: true, useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', function() {
    console.log('we\'re connected!')
  });



app.use('/index', indexRouter)
app.get('/', (req, res) => {
  res.send('NEXUS UW App Backend 1')
})
app.use('/', indexRouter);
app.use('/projects', projectsRouter);


app.listen(process.env.PORT || 3000), () => console.log(`Server running on port ${process.env.PORT}`);
