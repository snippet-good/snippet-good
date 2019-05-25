const request = require('supertest')
const app = require('../../server/app')
const {
  models: { User }
} = require('../../server/db/index')
const db = require('../../server/db/db')
const syncAndSeed = require('../../bin/seed')

describe('Auth routes', () => {
  beforeAll(async () => {
    await syncAndSeed()
    return User.create({
      userName: 'joe',
      firstName: 'Joe',
      lastName: 'test',
      email: 'joe@gmail.com',
      password: '12345',
      isAdmin: true
    })
  })

  afterAll(async done => {
    await db.close()
    done()
  })

  describe('POST /api/auth', () => {
    test('it returns the user in req.body if user exists', done => {
      request(app)
        .post('/api/auth')
        .send({ email: 'joe@gmail.com', password: '12345' })
        .expect(200)
        .end((err, response) => {
          if (err) return done(err)
          expect(response.body.email).toBe('joe@gmail.com')
          return done()
        })
    })
    test('it returns an error caught by error-handling middleware if user not found', done => {
      let err
      request(app)
        .post('/api/auth')
        .send({ email: 'j', password: '1' })
        .expect(401)
        .then(() => {
          err = new Error('caught by next')
        })
        .catch(error => {
          err = error
        })
        .then(() => {
          expect(err.message).toBe('caught by next')
          return done()
        })
        .catch(finalError => done(finalError))
    })
  })

  describe('GET /api/auth', () => {
    test('it returns a 404 status if req.session.userId is not defined', done => {
      request(app)
        .get('/api/auth')
        .expect(404, done)
    })

    test('it returns an error caught by error-handling middleware if req.session.userId is not defined', done => {
      let err
      request(app)
        .get('/api/auth')
        .then(() => {
          err = new Error('caught by next')
        })
        .catch(error => {
          err = error
        })
        .then(() => {
          expect(err.message).toBe('caught by next')
          return done()
        })
        .catch(finalError => done(finalError))
    })
  })

  describe('DELETE /api/auth', () => {
    test('it returns a 204 status code', done => {
      request(app)
        .delete('/api/auth')
        .expect(204, done)
    })
  })
})
