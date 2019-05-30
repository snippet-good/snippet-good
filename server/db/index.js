const db = require('./db')
const { Op } = require('sequelize')
const models = require('./models')
const {
  User,
  StretchAnswer,
  Stretch,
  Comment,
  Cohort,
  CohortStretch,
  Category,
  CohortUser
} = models

Cohort.getCohortsOfSingleAdmin = function(adminId) {
  return this.findAll({
    include: [{ model: CohortUser, attributes: [], where: { userId: adminId } }]
  })
}

StretchAnswer.getAnswersOfStudentsOfSingleAdmin = function(adminId) {
  return User.findOne({
    where: { id: adminId },
    include: CohortUser
  })
    .then(user => user.cohortusers.map(cu => cu.cohortId))
    .then(cohortIds => {
      return this.findAll({
        include: [
          {
            model: CohortUser,
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
          cohortuser: { cohortId },
          ...itemValues
        } = values
        return {
          ...itemValues,
          cohortId
        }
      })
    })
}

User.getStudentsOfSingleAdmin = function(adminId) {
  return this.findOne({
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

CohortStretch.getAllCohortStretches = function() {
  return this.findAll({
    include: [
      {
        model: Cohort,
        attributes: ['name', 'id'],
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

      const { cohortusers, name, id } = cohortValues
      return {
        ...cohortStretchesFields,
        cohortId: id,
        cohortName: name,
        adminIds: cohortusers.map(cu => cu.userId)
      }
    })
  })
}

Stretch.getAllStretches = function() {
  return this.findAll({
    include: [
      Category,
      { model: User, as: 'author', attributes: ['firstName', 'lastName'] }
    ]
  }).then(stretches => {
    return stretches.map(stretch => {
      const data = stretch.get()
      const { category, author, ...stretchFields } = data
      return {
        ...stretchFields,
        categoryName: category.name,
        autherName: `${author.firstName} ${author.lastName}`
      }
    })
  })
}

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

function initDb(force = false) {
  return db.authenticate().then(() => {
    // Sequelize associations
    // --------------------------

    // Many-to-Many between User and Cohort
    CohortUser.belongsTo(Cohort)
    Cohort.hasMany(CohortUser)
    CohortUser.belongsTo(User)
    User.hasMany(CohortUser)

    // Comment belongs to CohortUser
    Comment.belongsTo(CohortUser)
    CohortUser.hasMany(Comment)

    // StretchAnswer belongs to CohortUser
    StretchAnswer.belongsTo(CohortUser)
    CohortUser.hasMany(StretchAnswer)

    // Stretch belongs to User
    Stretch.belongsTo(User, { as: 'author' })
    User.hasMany(Stretch, { foreignKey: 'authorId' })

    // CohortStretch belongs to Cohort
    CohortStretch.belongsTo(Cohort)
    Cohort.hasMany(CohortStretch)

    // CohortStretch belongs to Stretch
    CohortStretch.belongsTo(Stretch)
    Stretch.hasMany(CohortStretch)

    // Stretch belongs to Category
    Stretch.belongsTo(Category)
    Category.hasMany(Stretch)

    //StretchAnswer belongs to Stretch
    StretchAnswer.belongsTo(Stretch)
    Stretch.hasMany(StretchAnswer)

    //Comment belongs to StretchAnswer
    Comment.belongsTo(StretchAnswer)
    StretchAnswer.hasMany(Comment)

    return db.sync({ force })
  })
}

module.exports = {
  initDb,
  models
}
