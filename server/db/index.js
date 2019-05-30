const db = require('./db')
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
