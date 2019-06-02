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

// PUT, updates an existing stretch
router.put('/:id', (req, res, next) => {
  Stretch.findByPk(req.params.id)
    .then(stretch => stretch.update(req.body))
    .then(stretch => res.json(stretch))
    .catch(next)
})

module.exports = router
