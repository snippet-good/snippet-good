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

module.exports = router
