const { Op } = require('sequelize')
const {
  User,
  CohortStretch,
  CohortUser,
  StretchAnswer,
  Cohort
} = require('../models')

// These are the main parameters that are used in Sequelize models' find methods.
const defaults = {
  include: [
    {
      model: CohortStretch,
      attributes: ['cohortId', 'stretchId'],
      include: [
        {
          model: Cohort,
          attributes: ['name']
        }
      ]
    }
  ]
}

// This method formats a single instance of StretchAnswer.
StretchAnswer.prototype.format = function() {
  const { cohortstretch, ...stretchAnswerFields } = this.dataValues
  const { cohort, ...cohortsStretchFields } = cohortstretch.get()
  return {
    ...stretchAnswerFields,
    ...cohortsStretchFields,
    cohortName: cohort.name
  }
}

StretchAnswer.prototype.addAssociations = function(format = true) {
  return StretchAnswer.findByPk(this.id, defaults).then(sa =>
    format ? sa.format() : sa
  )
}

StretchAnswer.getAnswersOfStudent = function(studentId) {
  return this.findAll({
    where: { userId: studentId },
    ...defaults
  }).then(stretchAnswers => {
    return stretchAnswers.map(sa => sa.format())
  })
}

StretchAnswer.getAnswersOfStudentsOfSingleAdmin = function(adminId) {
  return User.findOne({
    where: { id: adminId },
    include: CohortUser
  })
    .then(user => user.cohortusers.map(cu => cu.cohortId))
    .then(cohortIds => {
      return StretchAnswer.findAll({
        include: [
          {
            model: CohortStretch,
            attributes: ['cohortId'],
            where: { cohortId: { [Op.in]: cohortIds } },
            include: [
              {
                model: Cohort,
                attributes: ['name']
              }
            ]
          }
        ]
      })
    })
    .then(stretchAnswers => {
      return stretchAnswers.map(s => {
        const values = s.get()
        const { cohortstretch, ...itemValues } = values
        const {
          cohortId,
          cohort: { name }
        } = cohortstretch.get()
        return {
          ...itemValues,
          cohortId,
          cohortName: name
        }
      })
    })
}
