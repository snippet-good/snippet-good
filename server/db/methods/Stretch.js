const models = require('../models')
const { User, Stretch, Category } = models

// These are the default parameters to be passed in to the below Sequelize model methods.
const defaults = {
  modelParams: {
    include: [
      Category,
      { model: User, as: 'author', attributes: ['firstName', 'lastName'] }
    ]
  }
}

Stretch.getAllStretches = async function() {
  const stretches = await Stretch.findAll(defaults.modelParams)
  return stretches.map(s => s.format())
}

Stretch.prototype.format = function() {
  const { category, author, ...stretchFields } = this.dataValues

  return {
    ...stretchFields,
    categoryName: category.name,
    authorName: `${author.firstName} ${author.lastName}`
  }
}

// This function is used to reformat the Sequelize model instances,
// particularly for creating and updating new instances.
Stretch.prototype.addAssociations = async function(format = true) {
  const stretch = await Stretch.findByPk(this.id, defaults.modelParams)
  return format ? stretch.format() : stretch
}
