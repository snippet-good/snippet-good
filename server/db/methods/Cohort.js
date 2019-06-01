const { Cohort, CohortUser } = require('../models')

const getCohortsOfSingleAdmin = function(adminId) {
  return Cohort.findAll({
    include: [{ model: CohortUser, attributes: [], where: { userId: adminId } }]
  })
}

module.exports = { getCohortsOfSingleAdmin }
