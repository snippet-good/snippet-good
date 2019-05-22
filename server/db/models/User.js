const db = require('../db')

const User = db.define('user', {
  userName: {
    type: db.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  firstName: {
    type: db.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  lastName: {
    type: db.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  email: {
    type: STRING,
    allowNull: false,
    notEmpty: true,
    isEmail: true,
    unique: {
      // If a user tries to sign up with an email that is already registered,
      // msg will be thrown as an error.
      args: true,
      msg: 'There is already an account registered to this email.',
    },
  },
  password: {
    type: db.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  isAdmin: {
    type: db.BOOLEAN,
    defaultValue: false,
    validate: {
      isEmpty: false
    }
  }
})

module.exports = User
