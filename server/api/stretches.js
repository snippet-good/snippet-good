const router = require('express').Router()
const {
  models: { Stretch }
} = require('../db/index')

// GET, retrieves all stretches from the database
router.get('/', (req, res, next) => {
  Stretch.getAllStretches()
    .then(stretches => res.json(stretches))
    .catch(next)
})

// POST, creates a new stretch in the database
router.post('/', (req, res, next) => {
  Stretch.create(req.body)
    .then(newStretch => res.json(newStretch))
    .catch(next)
})

module.exports = router
