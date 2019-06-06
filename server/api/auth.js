const router = require('express').Router()
const { validationResult } = require('express-validator/check')
const {
  models: { User }
} = require('../db/index')

const loginValidations = require('../validations/auth/login')

// POST, authenticates user
router.post('/', loginValidations, async (req, res, next) => {
  try {
    // ----------------------------------------------------------------------
    // Preliminary error handler for login
    // This section checks if inputs are valid strings.
    const results = validationResult(req)

    if (!results.isEmpty())
      return res.status(400).json({ errors: results.mapped() })

    // ----------------------------------------------------------------------
    // Secondary error handler for login
    // This section checks if inputs match database records.
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    const errors = {}

    if (!user)
      errors.email = { msg: 'There is no user associated to this email.' }
    else if (password !== user.password)
      errors.password = { msg: 'Incorrect password' }

    if (Object.keys(errors).length) return res.status(400).json({ errors })

    req.session.userId = user.id
    res.json(user)
    // ----------------------------------------------------------------------
  } catch (err) {
    next(err)
  }
})

router.get('/', (req, res, next) => {
  if (!req.session.userId) {
    let error = new Error('user not logged in on page load')
    error.status = 404
    return next(error)
  }

  User.findByPk(req.session.userId)
    .then(user => res.json(user))
    .catch(next)
})

router.delete('/', (req, res, next) => {
  req.session.destroy(() => res.sendStatus(204))
})

module.exports = router
