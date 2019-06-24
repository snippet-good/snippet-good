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
  cohortSolution: {
    type: db.Sequelize.TEXT
  },
  startTimer: {
    type: db.Sequelize.DATE
  },
  scheduledDate: {
    type: db.Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = CohortStretch
