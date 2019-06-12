const router = require('express').Router()
const {
  models: { Category }
} = require('../db/index')

// GET, retrieves all categories from the database
router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next)
})

module.exports = router
