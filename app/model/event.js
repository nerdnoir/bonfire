function createEvent(candidateEvent, save = (domainEvent) => {}) {
  if (!candidateEvent.title) throw "Title is required."
  if (candidateEvent.title.length > 60) throw "Title is required."
  const eventCreated = {
    title: candidateEvent.title
  }
  save(eventCreated)
}


module.exports = { createEvent }