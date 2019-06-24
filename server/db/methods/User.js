const { Op } = require('sequelize')
const models = require('../models')
const { User, CohortUser } = models

const bcrypt = require('bcrypt')

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

// This method is used to authenticate a user using bcrypt.
User.prototype.authenticate = function(password) {
  return bcrypt.compare(password, this.password)
}

// This method is used to format the array of cohortUser objects into an array of cohort id's.
User.prototype.format = function() {
  if (!this.dataValues.cohortusers) return { ...this.dataValues, cohortIds: [] }
  const { cohortusers, ...studentValues } = this.dataValues

  return {
    ...studentValues,
    cohortIds: cohortusers.map(cu => cu.cohortId)
  }
}
