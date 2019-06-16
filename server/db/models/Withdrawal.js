const db = require('../db')

const Withdrawal = db.define('withdrawl', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true
  }
})

module.exports = Withdrawal
