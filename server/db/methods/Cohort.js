const { Cohort, User, CohortUser, Attendance } = require('../models')

Cohort.getCohortsOfSingleAdmin = async function(adminId) {
  const cohorts = await Cohort.findAll({
    include: [
      { model: CohortUser, attributes: [], where: { userId: adminId } },

      {
        model: Attendance,
        order: [['createdAt', 'DESC']],
        include: [{ model: User, attributes: [], where: { isAdmin: false } }]
      }
    ]
  })

  return cohorts.map(cohort => cohort.formatAttendance())
}

/*
    This function is used to convert the 'attendances' array generated from Cohort.getCohortsOfSingleAdmin() into a hash map, whose keys are students' ids in the cohort and its value is an array of Sequelize Attendance objects.

    ex.
    {
      _cohort information_,

      attendanceRecords: {
        user1_id: [{}, {}, {}],
        user2_id: [{}, {}, {}]
      }
    }

*/
Cohort.prototype.formatAttendance = function() {
  if (!this.attendances) return this

  const { attendances, ...fields } = this.dataValues

  const attendanceRecords = {}
  attendances.forEach(record => {
    if (attendanceRecords[record.userId])
      attendanceRecords[record.userId].push(record)
    else attendanceRecords[record.userId] = [record]
  })

  return {
    ...fields,
    attendanceRecords
  }
}
