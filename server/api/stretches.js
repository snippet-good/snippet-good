const router = require('express').Router()
const {
  models: { Stretch }
} = require('../db/index')

module.exports = router

router.get('/', (req, res, next) => {
  Stretch.findAll()
    .then(stretches => res.send(stretches))
    .catch(next)
})
