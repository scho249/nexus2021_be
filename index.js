const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

app.set('view engine','ejs')
app.set('views',__dirname + '/routes')
app.set('layout','layouts/layout')
app.use(express.static('public'))
app.use(expressLayouts)

app.listen(process.env.PORT || 3000)
