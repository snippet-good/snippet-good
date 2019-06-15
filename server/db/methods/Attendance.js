const Sequelize = require('sequelize')
const { Attendance } = require('../models')
const { Op } = Sequelize

//  ---------------------------------------------------------------------------
/*  This function queries the database for attendance records for a given cohort and date.

    @param {string} params.cohortId - The cohort id
    @param {string} params.createdAt - The date to be queried

    @return {Object} - A JS object where the keys are the user id's and the values are the particular Sequelize Attendance object that match the given criteria

    ex.
    {
      user1_id: {createdAt: '2019-01-01...', ...},
      user2_id: {createdAt: '2019-01-01...', ...},
      user3_id: {createdAt: '2019-01-01...', ...}
    }
*/

Attendance.findUsing = async function(params) {
  if (!Object.keys(params).includes('cohortId')) return

  const { cohortId, date } = params

  // These dates are used to create a Sequelize query where the instance to be found will be greater than the requested date and less than the day after.
  const requestedDate = new Date(date)
  const dayAfter = new Date(
    new Date(date).setTime(new Date(date).getTime() + 86400000)
  )
  const dateQuery = { [Op.gte]: requestedDate, [Op.lt]: dayAfter }

  const records = await Attendance.findAll({
    where: { cohortId, createdAt: dateQuery }
  })

  // Once the records are found, the array will be iterated to populate the hash map using the userId as the key and the Sequelize Attendance object corresponding to the userId as the value.

  // If a user has multiple entries of attendance objects, a warning will be logged.
  // A user should not have multiple entries based on the given query parameters.
  const map = {}

  records.forEach(record => {
    const { userId } = record
    if (map[userId]) {
      console.warn(`
        There are multiple attendance records for the following:\n
        cohortId: ${cohortId}\n
        userId: ${userId}\n
        requestedDate: ${requestedDate}\n\n
        Only the first, most recently created instance will be returned.
      `)
    } else map[userId] = record
  })

  return map
}

//  ---------------------------------------------------------------------------
