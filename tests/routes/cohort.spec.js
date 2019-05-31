const app = require('supertest')(require('../../server/app'))
const { initDb } = require('../../server/db/index')
const {
  models: { Cohort, CohortUser, User }
} = require('../../server/db/index')
const db = require('../../server/db/db')

describe('/api/cohort routes', () => {
  let profId
  beforeAll(() => {
    return initDb(true).then(() => {
      return Promise.all([
        Cohort.create({
          name: '1809-FLEX',
          startDate: new Date(2019, 0, 1),
          endDate: new Date(2019, 0, 6)
        }),

        Cohort.create({
          name: '1810-FLEX',
          startDate: new Date(2019, 0, 1),
          endDate: new Date(2019, 0, 6)
        }),
        User.create({
          userName: 'Prof',
          firstName: 'The',
          lastName: 'Prof',
          email: 'notypescript@gmail.com',
          password: 'linens',
          isAdmin: true
        })
      ]).then(([cohortOne, cohortTwo, prof]) => {
        profId = prof.id
        return Promise.all([
          CohortUser.create({ userId: prof.id, cohortId: cohortOne.id }),
          CohortUser.create({ cohortId: cohortTwo.id })
        ])
      })
    })
  })
  afterAll(done => {
    db.close().then(() => done())
  })

  describe('GET /api/cohorts/user/:userId', () => {
    test('it returns all the cohorts instances associated to :userId', done => {
      app
        .get(`/api/cohorts/user/${profId}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body).toHaveLength(1)
          return done()
        })
    })

    test('it returns none of the fields in the User model', done => {
      app.get(`/api/cohorts/user/${profId}`).end((err, res) => {
        if (err) return done(err)
        expect(res.body[0].userName).toBeUndefined()
        return done()
      })
    })
  })
})
