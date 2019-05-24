const db = require('./db')
const { User, Snippet, Stretch, Comment } = require('./models')

function initDb(force = false) {
  return db.authenticate().then(() => {
    // Sequelize associations
    // --------------------------
    // A user has many snippets
    Snippet.belongsTo(User)
    User.hasMany(Snippet)

    // A stretch has many snippets
    Snippet.belongsTo(Stretch)
    Stretch.hasMany(Snippet)

    //A user has many stretches
    Stretch.belongsTo(User, { as: 'author' })
    User.hasMany(Stretch)

    // A user and snippet both have many comments
    Comment.belongsTo(User)
    User.hasMany(Comment)

    //
    //CohortStretch.belongsTo(Cohort)
    //Cohort.hasMany(CohortStretch)

    //CohortStretch.belongsTo(Stretch)
    //Stretch.hasMany(CohortStretch)

    Comment.belongsTo(Snippet)
    Snippet.hasMany(Comment)

    return db.sync({ force })
  })
}

module.exports = {
  initDb,
  models: {
    User,
    Snippet,
    Stretch,
    Comment
  }
}
