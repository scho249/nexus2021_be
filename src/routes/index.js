const { Router, Request, Response } = require('express')
// const { Pool } = require('mysql2/promise')
const passport = require('passport');

const getDb = require("../db/db.js").getDb;
const User = require("../models/user.js");

// const result = require('../db/index.js')
// const auth = require('./auth';
// const students = require('./students');
// const projects = require('./projects.js');
// const contracts = require('./contracts');
// const saved = require('./saved');
// const options = require('./options');

// const authenticateJwt = passport.authenticate('jwt', { session: false });

// export default (app: Application, db: Pool): void => {
//   app.use('/auth', auth(db));
//   app.use('/students', authenticateJwt, students(db));
//   app.use('/projects', authenticateJwt, projects(db));
//   app.use('/contracts', authenticateJwt, contracts(db));
//   app.use('/saved', authenticateJwt, saved(db));
//   app.use('/options', options(db));
// };

const router = Router();
router.get('/', (req, res) => {
  res.json('Adding user kwin right now...');
});

module.exports = router
