const router = require('express').Router()
const {
  models: { Stretch, Category, User }
} = require('../db/index')

// GET, retrieves all stretches from the database
router.get('/', (req, res, next) => {
  Stretch.findAll({
    include: [
      Category,
      { model: User, as: 'author', attributes: ['firstName', 'lastName'] }
    ]
  })
    .then(stretches => {
      return stretches.map(stretch => {
        const data = stretch.get()
        const { category, author, ...stretchFields } = data
        return {
          ...stretchFields,
          categoryName: category.name,
          autherName: `${author.firstName} ${author.lastName}`
        }
      })
    })
    .then(stretches => res.json(stretches))
    .catch(next)
})

module.exports = router
