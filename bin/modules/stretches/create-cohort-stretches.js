const { models } = require('../../../server/db')
const { CohortStretch } = models
const getRandomIndex = require('../../misc/get-random-index')

/*
    This function creates cohort stretch instances using Sequelize's create() method.
    A cohort stretch is a derivative of an original stretch that is used for a particular cohort.

    @param {Array<object>} data.cohortStretches - Array of JS objects containing cohort stretch information
    @param {Array<object>} data.cohorts - Array of Sequelize objects containing cohort information
    @param {Array<object>} data.stretches - Array of Sequelize objects containing stretch information

    @return {Promise} - Returns Promise.all of Sequelize promises
*/

module.exports = function(data) {
  const { cohortStretches, cohorts, stretches } = data

  const createCohortStretch = attributes => {
    const cohortIndex = getRandomIndex(cohorts.length)
    const stretchIndex = getRandomIndex(stretches.length)

    return CohortStretch.create({
      ...attributes,
      cohortId: cohorts[cohortIndex].id,
      stretchId: stretches[stretchIndex].id
    })
  }

  return Promise.all(cohortStretches.map(cs => createCohortStretch(cs)))
}
