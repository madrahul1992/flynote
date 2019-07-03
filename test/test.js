const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../index');
chai.use(chaihttp);
chai.should();

describe("Flynotes", () => {
  describe("POST /exp/", () => {
    // Test expression
    it("should evaluate the expression", (done) => {
      chai.request(app)
      .post('/exp/')
      .set('authorization', 'abc112')
      .send({'expression': '(2 + 1 * (4 - 2) - 15 / 5)'})
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
      });
    });
    // test authentication
    it("should evaluate the expression", (done) => {
      chai.request(app)
      .post('/exp/')
      .set('authorization', 'abc1121')
      .send({'expression': '(2 + 1 * (4 - 2) - 15 / 5)'})
      .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
      });
    });
  });
});