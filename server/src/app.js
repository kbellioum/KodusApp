const express = require('express')
const glob = require('glob')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')

var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/KodusApp', {
  useMongoClient: true
})

var db = mongoose.connection
db.on('error', function () {
  throw new Error('unable to connect to database at ' + 'mongodb://localhost/KodusApp')
})

var models = glob.sync(path.normalize(path.join(__dirname, '/')) + 'models/*.js')
models.forEach(function (model) {
  require(model)
})

const app = express()
app.use(cookieParser())
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Configuring Passport
var passport = require('passport')
var expressSession = require('express-session')

app.use(expressSession({
  saveUninitialized: true,
  resave: false,
  secret: 'mySecretKey',
  store: new (require('express-sessions'))({
    storage: 'mongodb',
    instance: mongoose,
    host: 'localhost',
    port: 27017,
    db: 'KodusApp',
    collection: 'sessions'
  })
}))
app.use(passport.initialize())
app.use(passport.session())

// Initialize Passport
var initPassport = require('./passport/init')
initPassport(passport)

require('./routes')(app)

app.listen(config.port, function () {
  console.log(`server started on port ${config.port}`)
})
