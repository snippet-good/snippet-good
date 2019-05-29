const router = require('express').Router()
const {
  models: { User }
} = require('../db/index')

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
})

module.exports = router
