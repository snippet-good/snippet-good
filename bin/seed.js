const { initDb } = require('../server/db/index')
const {
  internet: { userName, email, password },
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
    CohortUser
  }
} = require('../server/db/index')

const createSeedInstances = (model, data) => {
  return Promise.all(data.map(item => model.create(item)))
}

const getRandomArrayEntry = arr => {
  return arr[Math.round(Math.random() * (arr.length - 1))]
}

const createUserObjects = () => {
  let users = []
  for (let i = 0; i < 9; ++i) {
    let newUser = {
      userName: userName(),
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: password(),
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
      studentsIndex = [0, 1, 2, 3]
    } else if (k === 1) {
      cohortInstructorsIndex = [0, 2]
      studentsIndex = [4, 5, 0, 1]
    } else {
      cohortInstructorsIndex = [2, 1]
      studentsIndex = [2, 3, 4, 5]
    }
    for (let c = 0; c < 2; ++c) {
      cohortUsers.push({
        cohortId,
        userId: instructors[cohortInstructorsIndex[c]]
      })
    }
    for (let s = 0; s < 4; ++s) {
      cohortUsers.push({ cohortId, userId: students[studentsIndex[s]] })
    }
  }
  return cohortUsers
}

const createStretchObjects = (userIds, categoryIds) => {
  let stretches = []
  for (let i = 0; i < 6; ++i) {
    let stretch = {
      title: words(),
      textPrompt: paragraph(),
      codePrompt: paragraph(),
      difficulty:
        Math.random() <= 0.7 ? getRandomArrayEntry([1, 2, 3, 4, 5]) : null,
      minutes: getRandomArrayEntry([1]),
      authorId: getRandomArrayEntry(userIds),
      categoryId: getRandomArrayEntry(categoryIds)
    }
    stretches.push(stretch)
  }
  return stretches
}

const createCohortStretchObjects = (cohortIds, stretchIds) => {
  let cohortStretches = []
  for (let j = 0; j < cohortIds.length; ++j) {
    let stretchIdsTemp = [...stretchIds]
    for (let i = 0; i < 4; ++i) {
      const status = i === 0 ? 'scheduled' : i === 1 ? 'open' : 'closed'
      let cohortStretch = {
        status,
        allowAnswersToBeRun: Math.random() <= 0.5,
        solution: paragraph(),
        cohortId: cohortIds[j],
        stretchId: getRandomArrayEntry(stretchIdsTemp),
        scheduledDate: new Date(
          2019,
          getRandomArrayEntry([8, 9, 10, 11]),
          getRandomArrayEntry(
            Array(31)
              .fill(0)
              .map((el, indx) => indx + 1)
          ),
          6,
          40
        )
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
  let obj = {}
  let studentsIndex
  const csClosed = cohortStretchs.filter(cs => cs.status === 'closed')

  for (let i = 0; i < csClosed.length; ++i) {
    const { cohortId } = csClosed[i]
    const students = cohortUsers
      .filter(cu => cu.cohortId === cohortId)
      .map(cu => cu.userId)

    if (!obj[cohortId]) {
      studentsIndex = [0, 1, 2]
      obj[cohortId] = true
    } else {
      studentsIndex = [3, 0, 1]
    }
    for (let j = 0; j < 3; ++j) {
      let stretchAnswer = {
        body: paragraph(),
        isSolved: Math.random() <= 0.5 ? Math.random() <= 0.5 : null,
        rating:
          Math.random() <= 0.5 ? getRandomArrayEntry([1, 2, 3, 4, 5]) : null,
        userId: students[studentsIndex[j]],
        cohortstretchId: csClosed[i].id,
        timeToSolve: getRandomArrayEntry([(60 * 1), (60 * 2), (60 * 3), (60 * 4), (60 * 5)])
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
      studentsIndex = [1]
    } else {
      studentsIndex = [3, 1]
    }
    for (let j = 0; j < studentsIndex.length; ++j) {
      let stretchAnswer = {
        body: paragraph(),
        isSolved: Math.random() <= 0.5 ? Math.random() <= 0.5 : null,
        rating:
          Math.random() <= 0.5 ? getRandomArrayEntry([1, 2, 3, 4, 5]) : null,
        userId: students[studentsIndex[j]],
        cohortstretchId: csOpen[i].id,
        timeToSolve: getRandomArrayEntry([1, 2, 3, 4, 5, 5, 7, 8, 9, 10])
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
  /*const cohortUsersAdmin = createdCohortUsers
    .filter(cu => adminIds.includes(cu.userId))
    .map(cu => cu.id)*/
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
