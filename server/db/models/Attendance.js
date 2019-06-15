const db = require('../db')

const Attendance = db.define('attendance', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true
  },
  isPresent: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  isExcused: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})

module.exports = Attendance
