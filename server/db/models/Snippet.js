const db = require('../db')

const Snippet = db.define('snippet', {
  body: {
    type: db.TEXT,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  status: {
    type: db.ENUM('active', 'closed'),
    allowNull: false,
    validate: {
      isEmpty: false
    }
  }
})

module.exports = Snippet
