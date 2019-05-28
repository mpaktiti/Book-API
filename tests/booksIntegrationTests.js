require('should');

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book CRUD Test', () => {
  it('should allow a book to be posted and return read and _id', (done) => {
    const bookPost = {
      title: 'Hello World',
      author: 'Maria',
      genre: 'Bio'
    };
    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('read');
        res.body.read.should.equal(false);
        res.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
