const db = require('../db')

const StretchAnswer = db.define('stretchanswer', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true
  },
  body: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isSolved: {
    type: db.Sequelize.BOOLEAN
  },
  rating: {
    type: db.Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  timeToSolve: {
    type: db.Sequelize.INTEGER
  }
})

module.exports = StretchAnswer
