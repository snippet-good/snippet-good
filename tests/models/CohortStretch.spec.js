const {
  models: { Stretch, Cohort, CohortStretch },
  initDb
} = require('../../server/db/index')
const db = require('../../server/db/db')

describe('our Cohort Stretch model', () => {
  beforeAll(() => {
    return initDb(true)
  })
  afterAll(async () => {
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
          cohortId: cohort.id
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
  test('it has a class level method named getStretches that returns stretches', () => {
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
          cohortId: cohort.id
        })
      })
      .then(() => {
        return CohortStretch.getStretches('open').then(stretches => {
          expect(stretches[0].status).toBe('open')
          expect(stretches[0].solution).toBe(
            'function forEach(arr, fn) { for (let i = 0; i < arr.length; ++i) { fn(arr[i]) } }'
          )
        })
      })
  })
})
