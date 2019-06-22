const { initDb } = require('../server/db/index')
const {
  internet: { userName, email },
  name: { firstName, lastName },
  lorem: { paragraph, words }
} = require('faker')
const {
  models: {
    User,
    Stretch,
    Comment,
    StretchAnswer,
    Category,
    Cohort,
    CohortStretch,
    CohortUser,
    Attendance
  }
} = require('../server/db/index')
const moment = require('moment')

const createSeedInstances = (model, data) => {
  return Promise.all(data.map(item => model.create(item)))
}

const getRandomArrayEntry = arr => {
  return arr[Math.round(Math.random() * (arr.length - 1))]
}

const createUserObjects = () => {
  let users = []
  for (let i = 0; i < 23; ++i) {
    let newUser = {
      userName: userName(),
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: '12345',
      isAdmin: i < 3
    }
    users.push(newUser)
  }
  return users
}

const createCohortObjects = () => {
  return [
    {
      name: '1901-FLEX',
      startDate: new Date(2019, 0, 1),
      endDate: new Date(2019, 5, 20)
    },
    {
      name: '1904-FLEX',
      startDate: new Date(2019, 4, 1),
      endDate: new Date(2019, 9, 20)
    },
    {
      name: '1809-IMM',
      startDate: new Date(2019, 0, 1),
      endDate: new Date(2019, 3, 1)
    }
  ]
}

const createCohortUserObjects = (cohorts, users) => {
  let instructors = users.filter(user => user.isAdmin).map(user => user.id)
  let students = users.filter(user => !user.isAdmin).map(user => user.id)
  let cohortUsers = []
  for (let k = 0; k < cohorts.length; ++k) {
    const cohortId = cohorts[k].id
    let cohortInstructorsIndex
    let studentsIndex
    if (k === 0) {
      cohortInstructorsIndex = [0, 1]
      studentsIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    } else if (k === 1) {
      cohortInstructorsIndex = [0, 2]
      studentsIndex = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    } else {
      cohortInstructorsIndex = [2, 1]
      studentsIndex = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
    }
    for (let c = 0; c < 2; ++c) {
      cohortUsers.push({
        cohortId,
        userId: instructors[cohortInstructorsIndex[c]]
      })
    }
    for (let s = 0; s < 10; ++s) {
      cohortUsers.push({ cohortId, userId: students[studentsIndex[s]] })
    }
  }
  return cohortUsers
}

const createStretchObjects = (userIds, categoryIds) => {
  let stretches = []
  for (let i = 0; i < 15; ++i) {
    let stretch = {
      title: words(),
      textPrompt: paragraph(),
      codePrompt: `${paragraph()}\n \n/*your code below --------------------------------------------------------------*/`,
      difficulty:
        Math.random() <= 0.7 ? getRandomArrayEntry([1, 2, 3, 4, 5]) : null,
      minutes: getRandomArrayEntry([1]),
      language: 'jsx',
      authorId: getRandomArrayEntry(userIds),
      categoryId: getRandomArrayEntry(categoryIds)
    }
    stretches.push(stretch)
  }
  return stretches
}

// eslint-disable-next-line complexity
const createCohortStretchObjects = (cohortIds, stretchIds) => {
  let cohortStretches = []

  for (let j = 0; j < cohortIds.length; ++j) {
    let stretchIdsTemp = [...stretchIds]
    for (let i = 0; i < 10; ++i) {
      const status = i < 2 ? 'scheduled' : i === 2 ? 'open' : 'closed'

      let dateOpen = new Date()
      let dateScheduled = new Date()
      dateScheduled.setDate(dateScheduled.getDate() + 10)
      let dateClosed = new Date()
      dateClosed.setDate(dateClosed.getDate() - 90)
      const scheduledDate =
        i < 2 ? dateScheduled : i === 2 ? dateOpen : dateClosed
      const startTimer = i < 2 ? null : i === 2 ? dateOpen : dateClosed

      let cohortStretch = {
        status,
        allowAnswersToBeRun: Math.random() <= 1,
        solution: paragraph(),
        cohortId: cohortIds[j],
        stretchId: getRandomArrayEntry(stretchIdsTemp),
        scheduledDate,
        startTimer
      }
      cohortStretches.push(cohortStretch)
      stretchIdsTemp = stretchIdsTemp.filter(
        s => s.id !== cohortStretch.stretchId
      )
    }
  }

  return cohortStretches
}

// eslint-disable-next-line complexity
const createStretchAnswerObjects = (cohortStretchs, cohortUsers) => {
  let stretchAnswers = []
  let obj = {
    cs0: [0, 1, 2, 3, 4],
    cs1: [5, 6, 7, 8, 9],
    cs2: [0, 2, 4, 6, 8],
    cs3: [1, 3, 5, 7, 9],
    cs4: [0, 3, 5, 8, 9],
    cs5: [1, 2, 4, 5, 7],
    cs6: [3, 4, 6, 8, 9]
  }
  let studentsIndex
  const csClosed = cohortStretchs.filter(cs => cs.status === 'closed')
  for (let i = 0; i < csClosed.length; ++i) {
    const { cohortId } = csClosed[i]
    const students = cohortUsers
      .filter(cu => cu.cohortId === cohortId)
      .map(cu => cu.userId)
    studentsIndex = obj[`cs${i % 7}`]
    for (let j = 0; j < 5; ++j) {
      let stretchAnswer = {
        body: paragraph(),
        isSolved: Math.random() <= 0.5 ? Math.random() <= 0.5 : null,
        rating:
          Math.random() <= 0.5 ? getRandomArrayEntry([1, 2, 3, 4, 5]) : null,
        userId: students[studentsIndex[j]],
        cohortstretchId: csClosed[i].id,
        timeToSolve: getRandomArrayEntry([
          60 * 1,
          60 * 2,
          60 * 3,
          60 * 4,
          60 * 5
        ]),
        submittedOnTime: Math.random() <= 0.8
      }
      stretchAnswers.push(stretchAnswer)
    }
  }

  const csOpen = cohortStretchs.filter(cs => cs.status === 'open')
  for (let i = 0; i < csOpen.length; ++i) {
    const { cohortId } = csOpen[i]
    const students = cohortUsers
      .filter(cu => cu.cohortId === cohortId)
      .map(cu => cu.userId)
    if (i === 0) {
      studentsIndex = [0, 2]
    } else if (i === 1) {
      studentsIndex = [5]
    } else {
      studentsIndex = [7, 8]
    }
    for (let j = 0; j < studentsIndex.length; ++j) {
      let stretchAnswer = {
        body: paragraph(),
        isSolved: Math.random() <= 0.5 ? Math.random() <= 0.5 : null,
        rating:
          Math.random() <= 0.5 ? getRandomArrayEntry([1, 2, 3, 4, 5]) : null,
        userId: students[studentsIndex[j]],
        cohortstretchId: csOpen[i].id,
        timeToSolve: getRandomArrayEntry([1, 2, 3, 4, 5, 5, 7, 8, 9, 10]),
        submittedOnTime: true
      }
      stretchAnswers.push(stretchAnswer)
    }
  }

  return stretchAnswers
}

const createCommentObjects = (
  stretchAnswers,
  adminIds,
  cohortStretches,
  cohortUsers
) => {
  let comments = []

  for (let i = 0; i < stretchAnswers.length; ++i) {
    const { userId, id, cohortstretchId } = stretchAnswers[i]
    const { cohortId } = cohortStretches.find(cs => cs.id === cohortstretchId)
    const users = cohortUsers
      .filter(cu => adminIds.includes(cu.userId) && cu.cohortId === cohortId)
      .map(cu => cu.userId)

    for (let j = 0; j < 2; ++j) {
      let comment
      if (j === 0) {
        comment = {
          body: paragraph(),
          userId,
          stretchanswerId: id
        }
      } else {
        comment = {
          body: paragraph(),
          userId: getRandomArrayEntry(users),
          stretchanswerId: id
        }
      }
      comments.push(comment)
    }
  }

  return comments
}

const syncAndSeed = async () => {
  await initDb(true)
  const createdCategories = await createSeedInstances(Category, [
    { name: 'Algorithms' },
    { name: 'Express' },
    { name: 'Database' },
    { name: 'Vanilla JS' },
    { name: 'React' },
    { name: 'Redux' },
    { name: 'React-Router' }
  ])

  const createdUsers = await createSeedInstances(User, createUserObjects())
  const createdCohorts = await createSeedInstances(
    Cohort,
    createCohortObjects()
  )
  const createdCohortUsers = await createSeedInstances(
    CohortUser,
    createCohortUserObjects(createdCohorts, createdUsers)
  )

  const adminIds = createdUsers.filter(u => u.isAdmin).map(u => u.id)

  const cohortUsersStudents = createdCohortUsers.filter(
    cu => !adminIds.includes(cu.userId)
  )

  const createdStreches = await createSeedInstances(
    Stretch,
    createStretchObjects(adminIds, createdCategories.map(c => c.id))
  )

  const createdCohortStretches = await createSeedInstances(
    CohortStretch,
    createCohortStretchObjects(
      createdCohorts.map(c => c.id),
      createdStreches.map(s => s.id)
    )
  )

  const cohortStretchs = createdCohortStretches.filter(
    cs => cs.status !== 'scheduled'
  )
  const createdStretchAnswers = await createSeedInstances(
    StretchAnswer,
    createStretchAnswerObjects(cohortStretchs, cohortUsersStudents)
  )
  await createSeedInstances(
    Comment,
    createCommentObjects(
      createdStretchAnswers,
      adminIds,
      createdCohortStretches,
      createdCohortUsers
    )
  )

  console.log('database successfully seeded!')
}

module.exports = syncAndSeed
