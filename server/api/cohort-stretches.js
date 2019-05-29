const router = require('express').Router()
const {
  models: { CohortStretch }
} = require('../db/index')

// GET, retrieves all cohort stretches from the database
<<<<<<< HEAD
router
  .get('/', (req, res, next) => {
    CohortStretch.findAll({
      include: [
        {
          model: Cohort,
          attributes: ['name'],
          include: [
            {
              model: CohortUser,
              include: [
                { model: User, where: { isAdmin: true }, attributes: [] }
              ]
            }
          ]
        }
      ]
    })
  })
  .then(cohortStretches => {
    return Promise.all([cohortStretches
      .map(cohortStretch => {
        const values = cohortStretch.get()
        const { cohort, ...cohortStretchesFields } = values
        const cohortValues = cohort.get()
        const { cohortusers, name } = cohortValues
        return {
          ...cohortStretchesFields,
          cohortName: name,
          adminIds: cohortusers.map(cu => cu.userId)
        }
      })
      .then(cohortStretches => res.json(cohortStretches))
  }).catch(next)
=======
router.get('/', (req, res, next) => {
  CohortStretch.getAllCohortStretches()
    .then(cohortStretches => res.json(cohortStretches))
    .catch(next)
})
>>>>>>> cd544121369451d4f6ca4b4468174c6037932faf

module.exports = router
