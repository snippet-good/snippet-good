const { models } = require('../../../server/db')
const { Cohort } = models

/*
    This function creates cohort instances using Sequelize's create() method.

    @param {Array<object>} cohorts - Array of JS objects containing cohort information
    @return {Promise} - Returns Promise.all of Sequelize promises
*/

module.exports = function(cohorts) {
  return Promise.all(cohorts.map(c => Cohort.create(c)))
}
