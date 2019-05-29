const router = require('express').Router()
const {
  models: { Stretch, Category }
} = require('../db/index')

// GET, retrieves all stretches from the database
router.get('/', (req, res, next) => {
  Stretch.findAll({ include: [Category] })
    .then(stretches => res.send(stretches))
    .catch(next)
})

module.exports = router
