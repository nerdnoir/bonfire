const expect = require('chai').expect
const sinon = require('sinon')
const event = require('../../../app/model/event')
const Event = event.Event

describe('Events', () => {
  
  describe('Creating an event', () => {
    
    it('requires a title', () => {
      
      let message = {
        city: 'Tokyo'
      }
  
      return event.createEvent(message)
        .catch((ex) => {
          expect(ex).to.equal('Title is required.')
        })
    })
    
    it('title cannot exceed 60 characters', () => {
      let message = {
        title: 'Developer Anarchy Workshop - The Former Yugoslav Republic of Macedonia',
        city: 'Skopje'
      }
      return event.createEvent(message)
      .catch((err) => expect(err).to.equal('Title is too long.'))
    })
    
    it('requires a city', () => {
      let message = {
        title: 'Developer Anarchy Workshop - Tokyo'
      }
      
      return event.createEvent(message)
        .catch((ex) => {
          expect(ex).to.equal('City is required.')
        })
    })
    
  })
  
  describe('Publishing an event', () => {
    
    it('success changes status to published', () => {
      const subject = new Event({title: 'meetup', location: 'Atlanta'})
      subject.publishEvent({}, new Date(2017, 10, 19))
      expect(subject.isPublished()).to.be.true
    })
    
    it('MOCK: success notifies the event listing service', () => {
      const subject = new Event({title: 'meetup', location: 'Atlanta'})
      let mockListingService = sinon.spy()
      subject.publishEvent({on: new Date(2017, 10, 31)}, new Date(2017, 10, 19), mockListingService)
      expect(mockListingService.called).to.be.true
    })
  
    it('FAKE: success notifies the event listing service', () => {
      const subject = new Event({title: 'meetup', location: 'Atlanta'})
      let called = false
      let fakeListingService = (data) => called = true
      subject.publishEvent({on: new Date(2017, 10, 31)}, new Date(2017, 10, 19), fakeListingService)
      expect(called).to.be.true
    })
    
    it('notifying the event listing service (CONTRACT TBD)', () => {
      const subject = new Event({title: 'meetup', location: 'Atlanta'})
      let called = false
      subject.publishEvent({on: new Date(2017, 10, 31)}, new Date(2017, 10, 19), (data) => called = true)
      expect(called).to.be.true
    })
    
    it('location is optional when it is already been set', () => {
      const subject = new Event({})
      expect(() => subject.publishEvent({})).to.throw('Location is required')
    })
  
    it('Cannot publish an event without a location', () => {
      // arrange
      const publishEventMessage = { location: null }
      const subject = new Event({ title: 'My Fun Meetup', city: 'Nashville' })
      // act & assert
      expect(() => {subject.publishEvent(publishEventMessage)}).to.throw('Location is required.')
    })
    
    it('an event cannot be published for a past date', () => {
      const subject = new Event({location: 'Starbucks'})
      expect(() => subject.publishEvent({on: new Date(2016, 12, 23)}, new Date(2017, 1, 1)))
        .to.throw('Publish date has passed.')
    })
    
    it('providing a location when publishing sets that location.', () => {
      let publishEventCommand = {
        location: 'Airport hilton'
      }
      const subject = new Event({})
      subject.publishEvent({location: 'Nashville Community Center'})
      expect(subject.location).to.equal('Nashville Community Center')
    })
    
  })
  
  describe('Email marketing automation integration', () => {
    
    it('can publish a list of attendees names and emails to MailChimp', () => {
      const subject = new Event({title: 'Anarchy Workshop Atlantis'})
      subject.addAttendee(['Alice', 'Waters', 'alice@waters.net'])
      subject.addAttendee(['Bob', 'Funkhauser', 'funkmaster@outlook.com'])
      const mailChimp = sinon.mock({ publishList: function(list, contacts) { }})
      subject.sendAttendeesTo(mailChimp)
    })
    
  })
  
})
