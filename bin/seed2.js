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

  // Create users
  const users = await Promise.all(data.users.map(u => User.create(u)))

  // Create cohorts
  const cohorts = await Promise.all(data.cohorts.map(c => Cohort.create(c)))

  // Create associations for users and cohorts on CohortUser join table
  await Promise.all(
    cohorts.map(cohort => {
      const i = getRandomIndex(users.length)
      const obj = { cohortId: cohort.id, userId: users[i].id }
      return CohortUser.create(obj)
    })
  )

  console.log('database successfully seeded!')
}

module.exports = syncAndSeed
