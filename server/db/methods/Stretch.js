const models = require('../models')
const { User, Stretch, Category } = models

const defaults = {
  modelParams: {
    include: [
      Category,
      { model: User, as: 'author', attributes: ['firstName', 'lastName'] }
    ]
  }
}

Stretch.getAllStretches = async function() {
  let stretches = await Stretch.findAll(defaults.modelParams)
  stretches = stretches.map(s => s.format())
  return stretches
}

Stretch.createWithAdditionalAttributes = async function(attributes) {
  let newStretch = await Stretch.create(attributes, { include: [Category] })
  console.log(newStretch.get())
  return newStretch
}

Stretch.prototype.format = function() {
  const { category, author, ...stretchFields } = this.dataValues

  return {
    ...stretchFields,
    categoryName: category.name,
    authorName: `${author.firstName} ${author.lastName}`
  }
}

// Leaving this here in case of future errors.

// const getAllStretches = function() {
//   return Stretch.findAll({
//     include: [
//       Category,
//       { model: User, as: 'author', attributes: ['firstName', 'lastName'] }
//     ]
//   }).then(stretches => {
//     return stretches.map(stretch => {
//       const data = stretch.get()
//       const { category, author, ...stretchFields } = data
//       return {
//         ...stretchFields,
//         categoryName: category.name,
//         authorName: `${author.firstName} ${author.lastName}`
//       }
//     })
//   })
// }

// module.exports = { getAllStretches }
