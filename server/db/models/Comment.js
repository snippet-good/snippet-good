const db = require('../db')

const Comment = db.define('comment', {
  body: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Comment
