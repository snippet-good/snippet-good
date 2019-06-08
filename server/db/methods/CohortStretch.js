const models = require('../models')
const { User, Cohort, CohortStretch, CohortUser } = models

// These model includes are separated into their own variables for more readability.
const UserWithIncludes = {
  model: User,
  where: { isAdmin: true },
  attributes: []
}

const CohortUserWithIncludes = {
  model: CohortUser,
  include: [UserWithIncludes]
}

// These are the main parameters that are used in Sequelize models' find methods.
const defaults = {
  modelParams: {
    include: [
      { model: Cohort, attributes: ['name'], include: [CohortUserWithIncludes] }
    ]
  }
}

// This method returns all CohortStretches.
// The table is a join table between stretches, cohorts, and admins.
CohortStretch.getAllCohortStretches = async function() {
  const cohortStretches = await CohortStretch.findAll(defaults.modelParams)
  return cohortStretches.map(cs => cs.format())
}

// This method formats a single instance of CohortStretch.
CohortStretch.prototype.format = function() {
  const { cohort, ...remainingFields } = this.dataValues

  return {
    adminIds: cohort.cohortusers.map(cu => cu.id),
    cohortName: cohort.name,
    ...remainingFields
  }
}

CohortStretch.prototype.addAssociations = async function(format = true) {
  const cs = await CohortStretch.findByPk(this.id, defaults.modelParams)
  return format ? cs.format() : cs
}
