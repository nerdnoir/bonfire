let express = require('express')
let app = express()
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let port = 8080
let event = require('./app/routes/event')
let config = require('config') //we load the db location from the JSON files

// Some default DB options to account for our slowish DB service.
let options = {
  server: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
  replset: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}}
}

// Setup the DB connection.
mongoose.connect(config.DBHost, options)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'CONNECTION ERROR:'))

// Parse/encode request/response as JSON.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.json({type: 'application/json'}))

// A dumb default route.
app.get('/', (req, res) => res.json({message: 'Welcome to Bonfire!'}))

// Map routes to our route objects.
app.route('/event')
  .get(event.getEvents)
  .post(event.postEvent)

app.route('/event/:id')
  .get(event.getEvent)

app.listen(port)
console.log('Listening on port ' + port)

module.exports = app