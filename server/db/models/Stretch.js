const db = require('../db')

const Stretch = db.define('stretch', {
  title: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  body: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  author: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  }
})

module.exports = Stretch
