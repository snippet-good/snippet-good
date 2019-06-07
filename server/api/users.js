const router = require('express').Router()
const { validationResult } = require('express-validator/check')
const {
  models: { User }
} = require('../db/index')

const loginValidations = require('../validations/users')

// GET, retrieves all users from the database
router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
})

// GET all students associated to adminId
router.get('/admin/:adminId', (req, res, next) => {
  User.getStudentsOfSingleAdmin(req.params.adminId)
    .then(users => res.json(users))
    .catch(next)
})

router.post('/', loginValidations, async (req, res, next) => {
  try {
    // ----------------------------------------------------------------------
    // Preliminary error handler for sign up page
    // This section checks if inputs are valid strings.
    const results = validationResult(req)

    if (!results.isEmpty())
      return res.status(400).json({ errors: results.mapped() })

    // ----------------------------------------------------------------------
    const fields = [
      'userName',
      'firstName',
      'lastName',
      'email',
      'password',
      'isAdmin'
    ]
    const userInformation = fields.reduce((obj, field) => {
      obj[field] = req.body[field]
      return obj
    }, {})

    const user = await User.create(userInformation)

    req.session.userId = user.id
    res.json(user)
    // ----------------------------------------------------------------------
  } catch (err) {
    // This is the secondary error handler for the sign up page.
    // The route will redirect here if the database cannot create a new user.

    // This error handler is specific to Sequelize.
    const field = Object.keys(err.fields)[0]
    const msg = err.message
    const errors = { [field]: { msg } }

    res.status(400).json({ errors })
    next(err)
  }
})

module.exports = router
