const { check } = require('express-validator/check')

const requiredFields = [
  'userName',
  'firstName',
  'lastName',
  'email',
  'confirmEmail',
  'password',
  'confirmPassword'
]

const checkRequiredFields = requiredFields.map(field =>
  check(field, 'This field cannot be blank.')
    .not()
    .isEmpty()
)

module.exports = [
  ...checkRequiredFields,

  // Checks if email input is in email format
  check('email', 'Please enter a valid email address.').isEmail(),
  check('confirmEmail', 'Please enter a valid email address.').isEmail(),

  // Checks if email and confirmEmail are the same
  check('email', 'Email addresses do not match.').custom(
    (val, { req }) => val === req.body.confirmEmail
  ),
  check('confirmEmail', 'Email addresses do not match.').custom(
    (val, { req }) => val === req.body.email
  ),

  // Checks if password and confirmPassword are the same
  check('password', 'Passwords do not match.').custom(
    (val, { req }) => val === req.body.confirmPassword
  ),
  check('confirmPassword', 'Passwords do not match.').custom(
    (val, { req }) => val === req.body.password
  )
]
