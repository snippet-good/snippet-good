const { initDb } = require('../server/db')

const data = require('./data')
const modules = require('./modules')

const syncAndSeed = async () => {
  await initDb(true)

  // Create category instances for stretches
  const categories = await modules.createCategories(data.categories)

  // Create user instances
  const admins = await modules.createUsers(data.admins)
  const students = await modules.createUsers(data.students)

  // Create stretch instances
  const stretches = await modules.createStretches({
    stretches: data.stretches,
    categories: categories,
    admins: admins
  })

  // Create cohort instances
  const cohorts = await modules.createCohorts(data.cohorts)

  // Create cohort stretch instances,
  // which are associations for cohort and stretch
  await modules.createCohortStretches({
    cohortStretches: data.cohortStretches,
    stretches: stretches,
    cohorts: cohorts,
    admins: admins
  })

  // Create associations between cohorts and admins
  await modules.createCohortUsers({
    cohorts: cohorts,
    users: [...admins, ...students]
  })

  console.log('Database successfully seeded!')
}

module.exports = syncAndSeed
