const expect = require('chai').expect
const event = require('../../../app/model/event')

describe('Events', () => {
  
  describe('Creating an event', () => {
    
    it('requires a title', () => {
      let candidateEvent = {
        title: 'Developer Anarchy Workshop - Antarctica'
      }
      let eventCreated = {}
      let save = (event) => eventCreated = event
      
      event.createEvent(candidateEvent, save)
      
      expect(eventCreated).to.have.property('title')
      expect(eventCreated.title).to.equal('Developer Anarchy Workshop - Antarctica')
    })
    
    it('throws an exception if title is not provided', () => {
      let candidateEvent = {title: null}
      expect(() => {event.createEvent(candidateEvent)})
        .to.throw('Title is required')
    })
    
    it('title cannot exceed 60 characters', () => {
      let candidateEvent = {
        title: 'Developer Anarchy Workshop - The Former Yugoslav Republic of Macedonia'
      }
      expect(() => {event.createEvent(candidateEvent)}).to.throw('Title is required.')
    })
    
    it('requires a city')
    
  })
})
