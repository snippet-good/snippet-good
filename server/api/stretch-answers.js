const router = require('express').Router()
const {
  models: { StretchAnswer }
} = require('../db/index')

// GET, retrieves all stretch answers from the database
router.get('/', (req, res, next) => {
  StretchAnswer.findAll()
    .then(stretchAnswers => res.json(stretchAnswers))
    .catch(next)
})

// GET all StrecthAnswers of students associated to adminId
router.get('/admin/:adminId', (req, res, next) => {
  StretchAnswer.getAnswersOfStudentsOfSingleAdmin(req.params.adminId)
    .then(stretchAnswers => res.json(stretchAnswers))
    .catch(next)
})

module.exports = router
