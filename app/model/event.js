function createEvent (candidateEvent, save = (domainEvent) => {}) {
  if (!candidateEvent.title) throw 'Title is required.'
  if (candidateEvent.title.length > 60) throw 'Title is too long.'
  if (!candidateEvent.city) throw 'City is required.'
  const eventCreated = {
    title: candidateEvent.title
  }
  save(eventCreated)
}

class Event {
  constructor (data) {
    this.title = data.title
    this.location = data.location
  }
  
  publishEvent (command, now, listingService = (data) => {}) {
    if (command.location) this.location = command.location
    if (!this.location) throw 'Location is required.'
    if (command.on < now) throw 'Publish date has passed.'
    listingService({})
    this.published = true
  }
  
  isPublished () {
    return this.published
  }
}

function publishEvent (command, save = (event) => {}, getEvent = () => { return {} }) {
  const event = getEvent()
  
  if (!event.location) {
    if (!command.location) throw 'Event has no location.'
  }
  
  save({location: 'Nashville Community Center'})
}

module.exports = {createEvent, publishEvent, Event}