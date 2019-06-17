const config = require('../seed.config').cohortStretches
const getRandomIndex = require('../misc/get-random-index')

const statuses = ['scheduled', 'open', 'closed']

const createBlank = function() {
  const result = []
  let status

  for (let i = 0; i < config.instances; ++i) {
    status = statuses[getRandomIndex(statuses.length)]
    result.push({ status, scheduledDate: new Date() })
  }

  return result
}

module.exports = [...createBlank()]
