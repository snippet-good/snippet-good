const router = require('express').Router()
const {
  models: { User }
} = require('../db/index')

module.exports = router

router.post('/', (req, res, next) => {
  const { email, password } = req.body
  User.findOne({ where: { email, password } })
    .then(user => {
      if (!user) {
        let error = new Error('incorrect credentials')
        error.status = 401
        throw error
      }
      req.session.userId = user.id
      res.json(user)
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  if (!req.session.userId) {
    let error = new Error('user not logged in on page load')
    error.status = 404
    return next(error)
  }

  User.findbyPk(req.session.userId)
    .then(user => res.json(user))
    .catch(next)
})

router.delete('/', (req, res, next) => {
  req.session.destroy(() => res.sendStatus(204))
})
