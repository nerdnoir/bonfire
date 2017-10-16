let mongoose = require('mongoose')
let config = require('config')

// Event schema definition
let EventSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    organizer: {type: String, required: true},
    maxAttendees: {type: Number, required: false},
    createdAt: {type: Date, default: Date.now},
  },
  {
    versionKey: false,
    // Use a per-team collection for demo purposes
    collection: config.DBCollection
  }
)

// An event model (concept from mongoose)
let Event = mongoose.model('event', EventSchema)

class EventRepository {
  
  all () {
    let query = Event.find({})
    return query.exec((err, events) => {
      if (err) return err
      return events
    })
  }
  
  find (eventId) {
    return Event.findOne({_id: eventId}, (err, event) => {
      if (err) return err
      //If no errors, send it back to the client
      return event
    })
  }
  
  save (event) {
    // TODO: You might have to do some mapping here, depending
    // on the shape of the event object your team created.
    return new Event(event).save((err) => { if (err) return err })
  }
}

// Exports the EventRepository for use elsewhere
module.exports = new EventRepository()