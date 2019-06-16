const { Op } = require('sequelize')
const models = require('../models')
const { User, CohortUser } = models

User.getStudentsOfSingleAdmin = async function(adminId) {
  // Get all of the associated cohorts of user
  const user = await User.findByPk(adminId, { include: CohortUser })

  // This is an array of all cohorts by id for particular admin
  const cohortIds = user.cohortusers.map(cu => cu.cohortId)

  // Find all students that are associated to the admin's cohorts
  const students = User.findAll({
    where: { isAdmin: false },
    include: [
      {
        model: CohortUser,
        attributes: ['cohortId'],
        where: { cohortId: { [Op.in]: cohortIds } }
      }
    ]
  })

  return students.map(s => s.format())
}

User.prototype.format = function() {
  const { cohortusers, ...studentValues } = this.dataValues

  return {
    ...studentValues,
    cohortIds: cohortusers.map(cu => cu.cohortId)
  }
}

// const getStudentsOfSingleAdmin = function(adminId) {
//   return User.findOne({
//     where: { id: adminId },
//     include: CohortUser
//   })

//     .then(user => user.cohortusers.map(cu => cu.cohortId))
//     .then(cohortIds => {
//       return this.findAll({
//         where: { isAdmin: false },
//         include: [
//           {
//             model: CohortUser,
//             attributes: ['cohortId'],
//             where: { cohortId: { [Op.in]: cohortIds } }
//           }
//         ]
//       })
//     })
//     .then(students => {
//       return students.map(s => {
//         const values = s.get()
//         const { cohortusers, ...studentValues } = values
//         return {
//           ...studentValues,
//           cohortIds: cohortusers.map(cu => cu.cohortId)
//         }
//       })
//     })
// }

// module.exports = { getStudentsOfSingleAdmin }
