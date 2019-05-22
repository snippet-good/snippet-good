const db = require('../db')

const User = db.define('user', {
  userName: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  firstName: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  lastName: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    isEmail: true,
    validate: {
      isEmpty: false
    },
    unique: {
      // If a user tries to sign up with an email that is already registered,
      // msg will be thrown as an error.
      args: true,
      msg: 'There is already an account registered to this email.',
    },
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  isAdmin: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false,
    validate: {
      isEmpty: false
    }
  }
})

module.exports = User
