require('chai').should()
const Event = require('../../../app/model/event')

describe('Events', () => {
  it('have tickets', () => {
    const subject = new Event()
    subject.ticketCount().should.equal(0)
  })
})


describe('Events', () => {
  it('data structure or whatever', () => {
  
  })
})