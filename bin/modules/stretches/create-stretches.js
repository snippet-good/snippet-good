const { models } = require('../../../server/db')
const { Stretch } = models
const getRandomIndex = require('../../misc/get-random-index')

/*
    This function creates stretch instances using Sequelize's create() method.

    @param {Array<object>} data.stretches - Array of JS objects containing stretch information
    @param {Array<object>} data.categories - Array of Sequelize objects containing category information
    @param {Array<object>} data.admins - Array of Sequelize objects containing user information (specifically users that are admins)

    @return {Promise} - Returns Promise.all of Sequelize promises
*/

module.exports = function(data) {
  const { stretches, categories, admins } = data

  // This functions helps with creating category and user associations to the stretch.
  const createStretch = attributes => {
    const categoryIndex = getRandomIndex(categories.length)
    const authorIndex = getRandomIndex(admins.length)

    return Stretch.create({
      ...attributes,
      categoryId: categories[categoryIndex].id,
      authorId: admins[authorIndex].id
    })
  }

  return Promise.all(stretches.map(s => createStretch(s)))
}
