const router = require('express').Router()
const { models } = require('../db')
const { Attendance } = models

// GET, retrieves attendance records for a particular cohort
// on a particular date from the database
router.get('/:cohortId/:date', (req, res, next) => {
  const { cohortId, date } = req.params
  console.log(cohortId)
  console.log(date)
  Attendance.findUsing({ cohortId, createdAt: date })
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router
