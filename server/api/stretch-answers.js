const router = require('express').Router()
const { models } = require('../db/index')
const { StretchAnswer, Attendance } = models

const isSameDay = require('../utils/is-same-day')

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
  const answer = req.body.newStretchAnswer
  const attendance = req.body.attendance

  const instances = [StretchAnswer.create(answer)]

  // Sparse validation to see if student submitted stretch on time
  const submittedOn = new Date(attendance.startDate)
  const now = new Date()
  const onTime = isSameDay(submittedOn, now)

  if (onTime) instances.push(Attendance.create(attendance))

  Promise.all(instances)
    .then(([stretchAnswer, attendance]) => {
      console.log(stretchAnswer.get())
      console.log(attendance.get())
      return stretchAnswer.addAssociations()
    })
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
