const { check } = require('express-validator/check')

const requiredFields = ['email', 'password']

const checkRequiredFields = requiredFields.map(field =>
  check(field, 'This field cannot be blank.')
    .not()
    .isEmpty()
)

module.exports = [
  ...checkRequiredFields,

  // Checks if email input is in email format
  check('email', 'Please enter a valid email address.').isEmail()
]
