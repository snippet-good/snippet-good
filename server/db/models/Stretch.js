const db = require('../db')
const CohortStretch = require('./CohortStretch')

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
  canBeCoded: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

Stretch.getStretchesByCohort = async function(cohortId) {
  const cohortStretches = await CohortStretch.findAll({
    where: {
      cohortId
    }
  })

  const stretchesByCohort = []
  for (let i = 0; i < cohortStretches.length; ++i) {
    let stretch = await Stretch.findOne({
      where: {
        id: cohortStretches[i].stretchId
      }
    })
    stretchesByCohort.push(stretch)
  }
  return stretchesByCohort
}

Stretch.getStretchesByCohortAndStatus = async function(cohortId, status) {
  const cohortStretches = await CohortStretch.findAll({
    where: {
      cohortId,
      status
    }
  })

  const stretchesByCohort = []
  for (let i = 0; i < cohortStretches.length; ++i) {
    let stretch = await Stretch.findOne({
      where: {
        id: cohortStretches[i].stretchId
      }
    })
    stretchesByCohort.push(stretch)
  }
  return stretchesByCohort
}

module.exports = Stretch
