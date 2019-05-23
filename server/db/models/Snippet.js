const db = require('../db')

const Snippet = db.define('snippet', {
  body: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isSolved: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Snippet
