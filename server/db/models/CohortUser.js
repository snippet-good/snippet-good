const db = require('../db')

const CohortUser = db.define('cohortuser', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true
  }
})

module.exports = CohortUser
