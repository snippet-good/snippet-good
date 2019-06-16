const { models } = require('../../../server/db')
const { Category } = models

/*
    This function creates category instances using Sequelize's create() method.

    @param {Array<object>} categories - Array of JS objects containing category information
    @return {Promise} - Returns Promise.all of Sequelize promises
*/

module.exports = function(categories) {
  return Promise.all(categories.map(c => Category.create(c)))
}
