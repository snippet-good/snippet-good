const { Op } = require('sequelize')
const {
  User,
  CohortStretch,
  CohortUser,
  StretchAnswer,
  Cohort,
  Stretch
} = require('../models')

// These are the main parameters that are used in Sequelize models' find methods.
const generateIncludes = cohortIds => {
  let cohortStretchObject = {
    model: CohortStretch,
    attributes: ['cohortId', 'stretchId']
  }
  if (cohortIds.length)
    cohortStretchObject.where = { cohortId: { [Op.in]: cohortIds } }
  return {
    include: [
      {
        ...cohortStretchObject,
        include: [
          {
            model: Cohort,
            attributes: ['name']
          },
          { model: Stretch, attributes: ['title'] }
        ]
      }
    ]
  }
}

// This method formats a single instance of StretchAnswer.
StretchAnswer.prototype.format = function() {
  const { cohortstretch, ...stretchAnswerFields } = this.dataValues
  const { cohort, stretch, ...cohortsStretchFields } = cohortstretch.get()
  return {
    ...stretchAnswerFields,
    ...cohortsStretchFields,
    cohortName: cohort.name,
    stretchTitle: stretch.title
  }
}

StretchAnswer.prototype.addAssociations = function(format = true) {
  return StretchAnswer.findByPk(this.id, generateIncludes([])).then(sa =>
    format ? sa.format() : sa
  )
}

StretchAnswer.getAnswersOfCohortsOfStudent = function(studentId) {
  return User.findByPk(studentId, { include: CohortUser })
    .then(user => user.cohortusers.map(cu => cu.cohortId))
    .then(cohortIds => this.findAll(generateIncludes(cohortIds)))
    .then(stretchAnswers => {
      return stretchAnswers.map(sa => sa.format())
    })
}

StretchAnswer.getAllAnswersWithExtraFields = function() {
  return StretchAnswer.findAll(generateIncludes([])).then(stretchAnswers => {
    return stretchAnswers.map(sa => sa.format())
  })
}
