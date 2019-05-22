const db = require('../db')

const Admin = db.define('admin', {
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

module.exports = Admin
