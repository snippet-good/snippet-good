const db = require('../db')

const Stretch = db.define('stretch', {
  title: {
    type: db.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  body: {
    type: db.TEXT,
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

module.exports = Stretch
