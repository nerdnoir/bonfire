require('chai').should()
const Event = require('../../../app/model/event')

describe("Events", () => {
  it("A sample test", () => {
    const subject = new Event()
    true.should.be.true
  })
})