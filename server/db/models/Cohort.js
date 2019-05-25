const db = require('../db')

const Cohort = db.define('cohort', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  startDate: {
    type: db.Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  endDate: {
    type: db.Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
      afterStartDate(value) {
        if (this.startDate >= value)
          throw new Error('endDate must be after startDate')
      }
    }
  }
})

module.exports = Cohort
