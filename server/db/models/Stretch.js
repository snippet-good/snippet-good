const db = require('../db')

const Stretch = db.define('stretch', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  textPrompt: {
    type: db.Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  codePrompt: {
    type: db.Sequelize.TEXT
  },
  difficulty: {
    type: db.Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  minutes: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1
    }
  },
  authorSolution: {
    type: db.Sequelize.TEXT,
    defaultValue: `const solution = console.log('You did it!')`,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  language: {
    type: db.Sequelize.ENUM('javascript', 'jsx'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Stretch
