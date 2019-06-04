const models = require('../models')
const { User, Stretch, Category } = models

const getAllStretches = function(method = 'findAll') {
  return Stretch.findAll({
    include: [
      Category,
      { model: User, as: 'author', attributes: ['firstName', 'lastName'] }
    ]
  }).then(stretches => {
    return stretches.map(stretch => {
      const data = stretch.get()
      const { category, author, ...stretchFields } = data
      return {
        ...stretchFields,
        categoryName: category.name,
        authorName: `${author.firstName} ${author.lastName}`
      }
    })
  })
}

module.exports = { getAllStretches }
