const router = require('express').Router()

router.get('/giphy', (req, res, next) => {
  res.send({ GIPHY_API_KEY: process.env.GIPHY_API_KEY })
  next()
})

module.exports = router
