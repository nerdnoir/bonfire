let repository = require('../repository/events')
let event = require('../model/event')

// GET /event route to retrieve all the events.
function getEvents (req, res) {
  repository.all().then((data) => res.json(data))
}

function getEvent (req, res) {
  let eventId = req.params.id
  repository.find(eventId).then((data) => res.json(data))
}

// POST /event to save a new event.
function postEvent (req, res) {
  event.createEvent(req.body,  repository.save.then(console.log))
  
  res.append('Content-Location', "/event/42")
    .setStatus(201)
    .json(req.body)
}

//export all the functions
module.exports = {getEvents, postEvent, getEvent }