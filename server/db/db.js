const Sequelize = require('sequelize')

module.exports = new Sequelize(
  process.env.URL || 'postgres://localhost/snippet_db',
  {
    logging: false
  }
)
