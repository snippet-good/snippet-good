const { models } = require('../../../server/db')
const { CohortUser } = models

/*
    This function creates associations betweeen cohorts and users

    @param {Array<object>} data.cohorts - Array of Sequelize objects containing cohort information
    @param {Array<object>} data.users - Array of Sequelize objects containing user information

    @return {Promise} - Returns Promise.all of Sequelize promises
*/

module.exports = function(data) {
  const { cohorts, users } = data

  return users.map(user => {
    const i = users.length % cohorts.length
    const obj = { userId: user.id, cohortId: cohorts[i].id }

    return CohortUser.create(obj)
  })
}
