const router = require('express').Router()
const {
  models: { Cohort }
} = require('../db/index')

// GET, retrieves all cohorts from the database
router.get('/', (req, res, next) => {
  Cohort.findAll()
    .then(cohorts => res.json(cohorts))
    .catch(next)
})

// get cohorts belong to :userId
router.get('/user/:userId', (req, res, next) => {
  Cohort.getCohortsOfSingleAdmin(req.params.userId)
    .then(cohorts => res.json(cohorts))
    .catch(next)
})

// get single cohort
router.get('/:id', (req, res, next) => {
  Cohort.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(cohort => res.send(cohort))
    .catch(next)
})

module.exports = router
