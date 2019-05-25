const {
  models: { Cohort },
  initDb
} = require('../../server/db/index')
const db = require('../../server/db/db')
const sequelizeValidationError = require('sequelize').ValidationError

const requiredFieldTest = (error, obj) => {
  return Cohort.create(obj)
    .then(() => {
      error = new Error('NOOOOOOOOOOOOOOOOO')
    })
    .catch(err => {
      console.log(err)
      error = err
    })
    .then(() => {
      expect(error.message).not.toBe('NOOOOOOOOOOOOOOOOO')
      expect(error).toBeInstanceOf(sequelizeValidationError)
    })
}

describe('Cohort model', () => {
  beforeAll(() => {
    return initDb(true)
  })

  afterAll(async done => {
    await db.close()
    done()
  })

  test('Cohort instance is successfully created with name, startDate, and endDate fields filled in', () => {
    let message = ''
    return Cohort.create({
      name: '1901-FLEX',
      startDate: new Date(2019, 0, 1),
      endDate: new Date(2019, 6, 20)
    })
      .then(() => {
        message = 'instance successfully created'
      })
      .catch(err => {
        console.log(err)
        message = 'instance NOT successfully created'
      })
      .then(() => {
        expect(message).toBe('instance successfully created')
      })
  })

  test('name field is required', () => {
    let error = ''
    return requiredFieldTest(error, {
      startDate: new Date(2019, 0, 1),
      endDate: new Date(2019, 6, 20)
    })
  })

  test('startDate field is required', () => {
    let error = ''
    return requiredFieldTest(error, {
      name: '1901-FLEX',
      endDate: new Date(2019, 6, 20)
    })
  })

  test('endDate field is required', () => {
    let error = ''
    return requiredFieldTest(error, {
      name: '1901-FLEX',
      startDate: new Date(2019, 0, 1)
    })
  })

  test('endDate must be after startDate ', () => {
    let error = ''
    return Cohort.create({
      name: '1901-FLEX',
      startDate: new Date(2019, 0, 1),
      endDate: new Date(2019, 0, 1)
    })
      .then(() => {
        error = new Error('NOOOOOOOOOOOOOOOOO')
      })
      .catch(err => {
        console.log(err)
        error = err
      })
      .then(() => {
        expect(error.message).toBe(
          'Validation error: endDate must be after startDate'
        )
        expect(error).toBeInstanceOf(sequelizeValidationError)
      })
  })
})
