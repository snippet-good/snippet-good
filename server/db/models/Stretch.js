const db = require('../db')

const Stretch = db.define('stretch', {
  title: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  textPrompt: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  codePrompt: {
    type: db.Sequelize.TEXT
  },
  solution: {
    type: db.Sequelize.TEXT
  }
})

module.exports = Stretch
