const config = require('../../seed.config').attendance
const { models } = require('../../../server/db')
const { Attendance } = models

/*
    This function creates an attendance record for a user in a cohort.

    @param {Array<object>} data.users - Array of Sequelize objects containing user information
    @param {Array<object>} data.cohorts - Array of Sequelize objects containing cohort information

    @return {Promise} - Returns Promise.all of Sequelize promises
*/

module.exports = function(data) {
  const { cohortUsers } = data

  const now = new Date()
  const day = 1000 * 60 * 60 * 24
  const result = []

  const createAttendance = attributes => {
    for (let i = 0; i < config.instances; ++i) {
      result.push(
        Attendance.create({
          userId: attributes.userId,
          cohortId: attributes.cohortId,
          createdAt: new Date(now.getTime() - day * i)
        })
      )
    }

    return result
  }

  cohortUsers.forEach(cu => createAttendance(cu))

  return Promise.all(result)
}
