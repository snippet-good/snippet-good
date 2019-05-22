const db = require('../db')

const Snippet = db.define('snippet', {
  body: {
    type: db.TEXT,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  isSolved: {
    type: db.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Snippet
