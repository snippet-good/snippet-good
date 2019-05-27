const db = require('../db')
const CohortUser = require('./CohortUser')

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

User.getStudentsByCohort = async function(cohortId) {
  const cohortStudents = await CohortUser.findAll({
    where: {
      cohortId
    }
  })
  const studentsByCohort = []
  for (let i = 0; i < cohortStudents.length; ++i) {
    let student = await User.findOne({
      where: {
        isAdmin: false,
        id: cohortStudents[i].userId
      }
    })
    if (student !== null) {
      studentsByCohort.push(student)
    }
  }
  return studentsByCohort
}

module.exports = User
