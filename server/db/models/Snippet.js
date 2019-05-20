const db = require('../db')

const Snippet = db.define('snippet', {
  body: {
    type: db.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  status: {
    type: db.ENUM('active', 'closed')
  }
})

module.exports = Snippet
