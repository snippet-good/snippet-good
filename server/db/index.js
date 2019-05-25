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

function initDb(force = false) {
  return db.authenticate().then(() => {
    // Sequelize associations
    // --------------------------

    // Many-to-Many between User and Cohort
    CohortUser.belongsTo(Cohort)
    Cohort.hasMany(CohortUser)
    CohortUser.belongsTo(User)
    User.hasMany(CohortUser)

    // Comment belongs to User
    Comment.belongsTo(User)
    User.hasMany(Comment)

    // StretchAnswer belongs to User
    StretchAnswer.belongsTo(User)
    User.hasMany(StretchAnswer)

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
