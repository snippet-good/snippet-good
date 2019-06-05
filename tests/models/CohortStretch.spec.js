const {
  models: { Stretch, Cohort, CohortStretch, CohortUser, User },
  initDb
} = require('../../server/db/index')
const db = require('../../server/db/db')

describe('our Cohort Stretch model', () => {
  beforeAll(() => {
    return initDb(true)
  })
  afterAll(async done => {
    await db.close()
    done()
  })
  test('it successfully creates a CohortStretch', () => {
    let message = ''
    return Promise.all([
      Stretch.create({
        title: 'forEach',
        textPrompt: 'pretend the forEach method does not exist. Create it.',
        codePrompt: 'const print = function(val){ console.log(val); }',
        difficulty: 1,
        canBeCoded: false
      }),
      Cohort.create({
        name: '1901-FLEX',
        startDate: new Date(2019, 0, 1),
        endDate: new Date(2019, 6, 20)
      })
    ])
      .then(([stretch, cohort]) => {
        return CohortStretch.create({
          status: 'open',
          allowAnswersToBeRun: false,
          solution:
            'function forEach(arr, fn) { for (let i = 0; i < arr.length; ++i) { fn(arr[i]) } }',
          minutes: 5,
          stretchId: stretch.id,
          cohortId: cohort.id,
          scheduledDate: new Date(2019, 9, 1, 18, 40)
        })
      })
      .then(() => {
        message = 'CohortStretch was created!'
      })
      .catch(ex => {
        //console.log(ex)
        message = 'CohortStretch was NOT created!'
      })
      .then(() => {
        expect(message).toBe('CohortStretch was created!')
      })
  })
  test('it has a class level method named getAllCohortStretches that returns all stretches', done => {
    return Promise.all([
      Stretch.create({
        title: 'forEachTwo',
        textPrompt: 'pretend the forEach method does not exist. Create it.',
        codePrompt: 'const print = function(val){ console.log(val); }',
        difficulty: 1,
        canBeCoded: false
      }),
      Cohort.create({
        name: '1901-FLEX',
        startDate: new Date(2019, 0, 1),
        endDate: new Date(2019, 6, 20)
      }),
      User.create({
        userName: 'Prof',
        firstName: 'The',
        lastName: 'Prof',
        email: 'notypescript@gmail.com',
        password: 'linens',
        isAdmin: true
      }),
      User.create({
        userName: 'joe',
        firstName: 'joe',
        lastName: 'stone',
        email: 'joe@gmail.com',
        password: 'easy',
        isAdmin: false
      })
    ])
      .then(([stretch, cohort, prof, joe]) => {
        return Promise.all([
          CohortStretch.create({
            status: 'open',
            allowAnswersToBeRun: false,
            solution:
              'function forEach(arr, fn) { for (let i = 0; i < arr.length; ++i) { fn(arr[i]) } }',
            minutes: 10,
            stretchId: stretch.id,
            cohortId: cohort.id,
            scheduledDate: new Date(2019, 9, 1, 18, 40)
          }),

          CohortUser.create({
            cohortId: cohort.id,
            userId: prof.id
          }),
          CohortUser.create({
            cohortId: cohort.id,
            userId: joe.id
          })
        ])
      })
      .then(() => {
        return CohortStretch.getAllCohortStretches().then(stretches => {
          expect(stretches).toHaveLength(2)
          return done()
        })
      })
      .catch(err => done(err))
  })
  test('the objects returned in ChortStretch include cohort names and admin ids', done => {
    return CohortStretch.getAllCohortStretches()
      .then(cohortStretches => {
        const stretchToTest = cohortStretches.find(s => s.minutes === 10)
        expect(stretchToTest.status).toBe('open')
        expect(stretchToTest.solution).toBe(
          'function forEach(arr, fn) { for (let i = 0; i < arr.length; ++i) { fn(arr[i]) } }'
        )
        expect(stretchToTest.cohortName).toBe('1901-FLEX')
        expect(stretchToTest.adminIds).toHaveLength(1)
        return done()
      })
      .catch(err => done(err))
  })
})
