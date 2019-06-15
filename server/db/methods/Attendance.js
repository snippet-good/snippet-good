const { Attendance } = require('../models')

const defaults = { cohortId: '*', createdAt: new Date() }

Attendance.findUsing = async function(params) {
  if (!Object.keys(params).includes('cohortId')) return

  const { cohortId, createdAt } = params

  const records = await Attendance.findAll({ where: { cohortId } })
  return records.map(record => record.id)
}
