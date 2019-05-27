const router = require('express').Router()
const {
  models: { User }
} = require('../db/index')

module.exports = router

router.get('/:cohortId', (req, res, next) => {
  User.getStudentsByCohort(req.params.cohortId)
    .then(students => res.send(students))
    .catch(next)
})
