const { initDb } = require('../server/db/index')
const { models } = require('../server/db/index')
const { User, Cohort, CohortUser, Comment } = models
const { Category, Stretch, CohortStretch, StretchAnswer } = models

const data = require('./data')

const getRandomIndex = max => Math.floor(Math.random() * max)

const syncAndSeed = async () => {
  await initDb(true)

  // Create categories
  await Promise.all(data.categories.map(c => Category.create(c)))

  // Create admins
  const admins = await Promise.all(data.admins.map(u => User.create(u)))

  // Create students
  const students = await Promise.all(data.students.map(s => User.create(s)))

  // Create cohorts
  const cohorts = await Promise.all(data.cohorts.map(c => Cohort.create(c)))

  // Create associations for admin and cohort on CohortUser join table
  await Promise.all(
    cohorts.map(cohort => {
      const i = getRandomIndex(admins.length)
      const obj = { cohortId: cohort.id, userId: admins[i].id }
      return CohortUser.create(obj)
    })
  )

  // Create associations for student and cohort on CohortUser join table
  await Promise.all(
    students.map(student => {
      const i = getRandomIndex(cohorts.length)
      const obj = { userId: student.id, cohortId: cohorts[i].id }
      return CohortUser.create(obj)
    })
  )

  console.log('Database successfully seeded!')
}

module.exports = syncAndSeed
