const db = require('../db')

const User = db.define('user', {
  userName: {
    type: db.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  password: {
    type: db.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  }
})

module.exports = User
