const db = require('./db')
const { User, Admin, Snippet, Stretch, Comment } = require('./models')

const initDb = (force = false) => {
  return db.authenticate().then(() => {
    // set associations
    User.belongsTo(Admin)
    Admin.hasMany(User)

    return db.sync({ force })
  })
}

module.exports = {
  initDb,
  models: {
    User,
    Admin,
    Snippet,
    Stretch,
    Comment
  }
}
