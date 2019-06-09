const { Op } = require('sequelize')
const { User, CohortStretch, CohortUser, StretchAnswer } = require('../models')

const getAnswersOfStudentsOfSingleAdmin = function(adminId) {
  return User.findOne({
    where: { id: adminId },
    include: CohortUser
  })
    .then(user => user.cohortusers.map(cu => cu.cohortId))
    .then(cohortIds => {
      console.log(cohortIds)
      return StretchAnswer.findAll({
        include: [
          {
            model: CohortStretch,
            attributes: ['cohortId'],
            where: { cohortId: { [Op.in]: cohortIds } }
          }
        ]
      })
    })
    .then(stretchAnswers => {
      return stretchAnswers.map(s => {
        const values = s.get()
        const {
          cohortstretch: { cohortId },
          ...itemValues
        } = values
        return {
          ...itemValues,
          cohortId
        }
      })
    })
}

module.exports = { getAnswersOfStudentsOfSingleAdmin }
