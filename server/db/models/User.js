const db = require('../db')

const User = db.define('user', {
  userName: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  firstName: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    isEmail: true,
    validate: {
      notEmpty: true
    },
    unique: {
      // If a user tries to sign up with an email that is already registered,
      // msg will be thrown as an erro.
      args: true,
      msg: 'There is already an account registered to this email.'
    }
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isAdmin: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = User
