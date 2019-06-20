const router = require('express').Router()
const {
  models: { StretchAnswer }
} = require('../db/index')

// GET, retrieves all stretch answers from the database
router.get('/', (req, res, next) => {
  StretchAnswer.getAllAnswersWithExtraFields()
    .then(stretchAnswers => res.json(stretchAnswers))
    .catch(next)
})

// GET all StrecthAnswers of students associated to adminId
router.get('/admin/:adminId', (req, res, next) => {
  StretchAnswer.getAnswersOfStudentsOfSingleAdmin(req.params.adminId)
    .then(stretchAnswers => res.json(stretchAnswers))
    .catch(next)
})

// GET all StrecthAnswers of studentId
router.get('/student/:studentId', (req, res, next) => {
  StretchAnswer.getAnswersOfCohortsOfStudent(req.params.studentId)
    .then(stretchAnswers => res.json(stretchAnswers))
    .catch(next)
})

// POST student StretchAnswer
router.post('/create', (req, res, next) => {
  StretchAnswer.create(req.body.newStretchAnswer)
    .then(stretchAnswer => stretchAnswer.addAssociations())
    .then(stretchAnswer => res.json(stretchAnswer))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  StretchAnswer.findByPk(req.params.id)
    .then(stretchAnswer => stretchAnswer.update(req.body))
    .then(stretchAnswer => stretchAnswer.addAssociations())
    .then(stretchAnswer => res.json(stretchAnswer))
    .catch(next)
})

module.exports = router
