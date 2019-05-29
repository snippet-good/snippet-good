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
  for (let i = 0; i < 50; ++i) {
    let newUser = {
      userName: userName(),
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: password(),
      isAdmin: Math.random() <= 0.2
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
  const instructors = users.filter(user => user.isAdmin).map(user => user.id)
  const students = users.filter(user => !user.isAdmin).map(user => user.id)
  let cohortUsers = []
  for (let i = 0; i < cohorts.length; ++i) {
    const cohortId = cohorts[i].id
    cohortUsers.push({ cohortId, userId: getRandomArrayEntry(instructors) })
    for (let j = 0; j < 10; ++j) {
      let studentsTemp = [...students]
      const studentId = getRandomArrayEntry(studentsTemp)
      cohortUsers.push({ cohortId, userId: studentId })
      studentsTemp = studentsTemp.filter(s => s.id !== studentId)
    }
  }
  return cohortUsers
}

const createStretchObjects = (userIds, categoryIds) => {
  let stretches = []
  for (let i = 0; i < 30; ++i) {
    let stretch = {
      title: words(),
      textPrompt: paragraph(),
      codePrompt: paragraph(),
      difficulty:
        Math.random() <= 0.7 ? getRandomArrayEntry([1, 2, 3, 4, 5]) : null,
      canBeCoded: Math.random() <= 0.7,
      authorId: getRandomArrayEntry(userIds),
      categoryId: getRandomArrayEntry(categoryIds)
    }
    stretches.push(stretch)
  }
  return stretches
}

const createCohortStretchObjects = (cohortIds, stretchIds) => {
  let cohortStretches = []
  for (let i = 0; i < 100; ++i) {
    let statuses = ['open', 'closed']
    let cohortId = getRandomArrayEntry(cohortIds)
    if (
      !cohortStretches.some(
        c => c.cohortId === cohortId && c.status === 'scheduled'
      )
    ) {
      statuses.push('scheduled')
    }

    let cohortStretch = {
      status: getRandomArrayEntry(statuses),
      allowAnswersToBeRun: Math.random() <= 0.3,
      solution: Math.random() <= 0.7 ? paragraph() : null,
      minutes: getRandomArrayEntry([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      cohortId,
      stretchId: getRandomArrayEntry(stretchIds)
    }
    cohortStretches.push(cohortStretch)
  }
  return cohortStretches
}

const createStretchAnswerObjects = (stretchIds, cohortUserIds) => {
  let stretchAnswers = []
  for (let i = 0; i < 150; ++i) {
    let stretchAnswer = {
      body: paragraph(),
      isSolved: Math.random() <= 0.5 ? Math.random() <= 0.5 : null,
      rating:
        Math.random() <= 0.5 ? getRandomArrayEntry([1, 2, 3, 4, 5]) : null,
      cohortuserId: getRandomArrayEntry(cohortUserIds),
      stretchId: getRandomArrayEntry(stretchIds)
    }
    stretchAnswers.push(stretchAnswer)
  }
  return stretchAnswers
}

const createCommentObjects = (stretchIds, userIds) => {
  let comments = []
  for (let i = 0; i < 60; ++i) {
    let comment = {
      body: paragraph(),
      cohortuserId: getRandomArrayEntry(userIds),
      stretchId: getRandomArrayEntry(stretchIds)
    }
    comments.push(comment)
  }
  return comments
}

const syncAndSeed = async () => {
  await initDb(true)
  const createdCategories = await createSeedInstances(Category, [
    { name: 'Algorithms' },
    { name: 'Express' },
    { name: 'database' },
    { name: 'Vanilla JS' },
    { name: 'React' },
    { name: 'Redux' },
    { name: 'React-ROouter' }
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
  const cohortUsersAdmin = createdCohortUsers
    .filter(cu => adminIds.includes(cu.userId))
    .map(cu => cu.id)
  const cohortUsersStudents = createdCohortUsers
    .filter(cu => !adminIds.includes(cu.userId))
    .map(cu => cu.id)

  const createdStreches = await createSeedInstances(
    Stretch,
    createStretchObjects(
      createdUsers.map(user => user.id),
      createdCategories.map(c => c.id)
    )
  )

  await createSeedInstances(
    CohortStretch,
    createCohortStretchObjects(
      createdCohorts.map(c => c.id),
      createdStreches.map(s => s.id)
    )
  )

  await createSeedInstances(
    StretchAnswer,
    createStretchAnswerObjects(
      createdStreches.map(stretch => stretch.id),
      cohortUsersStudents
    )
  )
  await createSeedInstances(
    Comment,
    createCommentObjects(createdStreches.map(s => s.id), cohortUsersAdmin)
  )
  console.log('database successfully seeded!')
}

module.exports = syncAndSeed
