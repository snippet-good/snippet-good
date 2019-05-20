const db = require('../db')

const Comment = db.define('comment', {
  body: {
    type: db.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  author: {
    type: db.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  }
})

module.exports = Comment
