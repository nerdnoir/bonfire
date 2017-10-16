let repository = require('../repository/events')

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
  repository
    .save(req.body)
    .then((event) => {
      res.json(event)
      res.append('Content-Location', `/event/${event.id}`)
      res.sendStatus(201)
    })
}

//export all the functions
module.exports = {getEvents, postEvent, getEvent }