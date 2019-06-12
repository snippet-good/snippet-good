const { Op } = require('sequelize')

const models = require('../models')
const { User, CohortUser } = models

const getStudentsOfSingleAdmin = function(adminId) {
  return User.findOne({
    where: { id: adminId },
    include: CohortUser
  })
    .then(user => user.cohortusers.map(cu => cu.cohortId))
    .then(cohortIds => {
      return this.findAll({
        where: { isAdmin: false },
        include: [
          {
            model: CohortUser,
            attributes: ['cohortId'],
            where: { cohortId: { [Op.in]: cohortIds } }
          }
        ]
      })
    })
    .then(students => {
      return students.map(s => {
        const values = s.get()
        const { cohortusers, ...studentValues } = values
        return {
          ...studentValues,
          cohortIds: cohortusers.map(cu => cu.cohortId)
        }
      })
    })
}

module.exports = { getStudentsOfSingleAdmin }
