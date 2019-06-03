const router = require('express').Router()
const {
  models: { Comment }
} = require('../db/index')

// GET, retrieves all comments associated to stretchAnswerId
router.get('/stretchAnswer/:stretchAnswerId', (req, res, next) => {
  Comment.getCommentsOfStretchAnswer(req.params.stretchAnswerId)
    .then(comments => res.json(comments))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Comment.createNewComment(req.body)
    .then(comment => res.json(comment))
    .catch(next)
})

module.exports = router
