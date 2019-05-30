const router = require('express').Router()
const {
  models: { User }
} = require('../db/index')

// GET, retrieves all users from the database
router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
})

// GET all students associated to adminId
router.get('/admin/:adminId', (req, res, next) => {
  User.getStudentsOfSingleAdmin(req.params.adminId)
    .then(users => res.json(users))
    .catch(next)
})

module.exports = router
