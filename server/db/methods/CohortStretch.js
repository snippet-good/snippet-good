const models = require('../models')
const { User, Cohort, CohortStretch, CohortUser } = models

CohortStretch.getAllCohortStretches = function() {
  return this.findAll({
    include: [
      {
        model: Cohort,
        attributes: ['name'],
        include: [
          {
            model: CohortUser,
            include: [{ model: User, where: { isAdmin: true }, attributes: [] }]
          }
        ]
      }
    ]
  }).then(cohortStretches => {
    return cohortStretches.map(cohortStretch => {
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
  })
}
