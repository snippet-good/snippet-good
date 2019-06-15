const router = require('express').Router()
const {
  models: { CohortUser }
} = require('../db/index')

// GET, retrieves all cohort users from the database
router.get('/', (req, res, next) => {
  CohortUser.findAll()
    .then(cohortUsers => res.json(cohortUsers))
    .catch(next)
})

// GET, retrieves all cohort users of student
router.get('/student/:studentId', (req, res, next) => {
  CohortUser.findAll({ where: { userId: req.params.studentId } })
    .then(cohortUsers => res.json(cohortUsers))
    .catch(next)
})

module.exports = router
