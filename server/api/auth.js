const router = require('express').Router()
const { validationResult } = require('express-validator/check')
const {
  models: { User, CohortUser }
} = require('../db/index')

const loginValidations = require('../validations/login')

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
    const user = await User.scope('withPassword').findOne({
      where: { email },
      include: CohortUser
    })
    const errors = {}

    if (!user) {
      errors.email = { msg: 'There is no user associated to this email.' }
    } else if (user) {
      const authenticated = await user.authenticate(password)
      if (!authenticated) errors.password = { msg: 'Incorrect password' }
    }

    if (Object.keys(errors).length) return res.status(400).json({ errors })

    req.session.userId = user.id
    res.json(user.format())
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

  User.findByPk(req.session.userId, { include: CohortUser })
    .then(user => {
      if (!user) throw new Error('user not logged in on page load')
      res.json(user.format())
    })
    .catch(next)
})

router.delete('/', (req, res, next) => {
  req.session.destroy(() => res.sendStatus(204))
})

module.exports = router
