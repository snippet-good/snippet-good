const db = require('../db')

const CohortStretch = db.define('cohortstretch', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true
  },
  status: {
    type: db.Sequelize.ENUM('scheduled', 'open', 'closed'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  allowAnswersToBeRun: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  solution: {
    type: db.Sequelize.TEXT
  },
  minutes: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1
    }
  },
  scheduledDate: {
    type: db.Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
      afterCurrentDate(value) {
        // if (value < Date.now())
        // throw new Error('Can not schedule stretch for before right now')
      }
    }
  }
})

module.exports = CohortStretch
