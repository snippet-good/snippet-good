const db = require('../db')

const Withdrawl = db.define('withdrawl', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true
  }
})

module.exports = Withdrawl
