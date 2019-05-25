const db = require('../db')

const User = db.define('user', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true
  },
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
      // msg will be thrown as an error.
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
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = User
