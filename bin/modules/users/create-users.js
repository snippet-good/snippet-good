const { models } = require('../../../server/db')
const { User } = models

/*
    This function creates user instances using Sequelize's create() method.

    @param {Array<object>} categories - Array of JS objects containing user information
    @return {Promise} - Returns Promise.all of Sequelize promises
*/

module.exports = function(users) {
  return Promise.all(users.map(u => User.create(u)))
}
