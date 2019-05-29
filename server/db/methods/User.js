const models = require('../models')
const { User, CohortUser } = models

User.getStudentsByCohort = function(cohortId) {
  return this.findAll({
    where: {
      isAdmin: false
    },
    include: [
      {
        attributes: [],
        model: CohortUser,
        where: {
          cohortId
        }
      }
    ]
  })
}
