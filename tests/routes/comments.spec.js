const app = require('supertest')(require('../../server/app'))
const {
  models: { Comment, StretchAnswer, User },
  initDb
} = require('../../server/db/index')
const db = require('../../server/db/db')

describe('/api/comments', () => {
  beforeAll(() => {
    return initDb(true)
      .then(() => {
        return Promise.all([
          StretchAnswer.create({
            id: '11111111-1111-1111-1111-111111111111',
            body: 'const rt = function(){}',
            isSolved: false,
            rating: 2
          }),
          User.create({
            userName: 'Prof',
            firstName: 'The',
            lastName: 'Prof',
            email: 'notypescript@gmail.com',
            password: 'linens',
            isAdmin: true
          })
        ])
      })
      .then(([stretchAnswer, prof]) => {
        return Comment.create({
          body: 'strange answer',
          stretchanswerId: stretchAnswer.id,
          userId: prof.id
        })
      })
  })

  afterAll(done => {
    db.close().then(() => done())
  })

  describe('GET /api/comments/stretchAnswer/:stretchAnswerId', () => {
    test('it returns a 200 status and json data', done => {
      return app
        .get('/api/comments/stretchAnswer/afead5e1-a142-49c6-85b9-87aa946ea010')
        .expect(200)
        .expect('Content-Type', /application\/json/, done)
    })

    test('it returns all comments associated to the :stretchAnswerId', async done => {
      try {
        const { body } = await app.get(
          '/api/comments/stretchAnswer/11111111-1111-1111-1111-111111111111'
        )
        expect(body).toHaveLength(1)
        expect(body[0].stretchanswerId).toBe(
          '11111111-1111-1111-1111-111111111111'
        )
        return done()
      } catch (err) {
        done(err)
      }
    })

    test('it includes the full name of the person who wrote each comment in its return', async done => {
      try {
        const { body } = await app.get(
          '/api/comments/stretchAnswer/11111111-1111-1111-1111-111111111111'
        )
        expect(body[0].writerName).toBe('The Prof')
        return done()
      } catch (err) {
        done(err)
      }
    })
  })
})
