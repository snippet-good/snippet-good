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
  for (let i = 0; i < 51; ++i) {
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
    const instructor = getRandomArrayEntry(instructors)
    cohortUsers.push({ cohortId, userId: instructor })
    for (let j = 0; j < 17; ++j) {
      const studentId = getRandomArrayEntry(students)
      cohortUsers.push({ cohortId, userId: studentId })
      students = students.filter(s => s.id !== studentId)
    }

    instructors = instructors.filter(id => id !== instructor.id)
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
    let cohortId = getRandomArrayEntry(cohortIds)
    const stretchIdsBad = cohortStretches
      .filter(cs => cs.cohortId === cohortId)
      .map(cs => cs.stretchId)

    let cohortStretch = {
      status: getRandomArrayEntry(['closed', 'open', 'scheduled']),
      allowAnswersToBeRun: Math.random() <= 0.3,
      solution: paragraph(),
      minutes: getRandomArrayEntry([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      cohortId,
      stretchId: getRandomArrayEntry(
        stretchIds.filter(s => !stretchIdsBad.includes(s))
      ),
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
  }
  return cohortStretches
}

const createStretchAnswerObjects = (stretchIds, cohortUserIds) => {
  let stretchAnswers = []
  for (let i = 0; i < 150; ++i) {
    const stretchId = getRandomArrayEntry(stretchIds)
    const cohortUserIdsSubset = cohortUserIds.filter(
      cu =>
        !stretchAnswers
          .filter(s => s.stretchId === stretchId)
          .map(s => s.cohortUserId)
          .includes(cu)
    )
    let stretchAnswer = {
      body: paragraph(),
      isSolved: Math.random() <= 0.5 ? Math.random() <= 0.5 : null,
      rating:
        Math.random() <= 0.5 ? getRandomArrayEntry([1, 2, 3, 4, 5]) : null,
      cohortuserId: getRandomArrayEntry(cohortUserIdsSubset),
      stretchId,
      timeToSolve: getRandomArrayEntry([1, 2, 3, 4, 5, 5, 7, 8, 9, 10])
    }
    stretchAnswers.push(stretchAnswer)
  }
  return stretchAnswers
}

const createCommentObjects = (stretchanswerIds, adminIds) => {
  let comments = []
  for (let i = 0; i < 60; ++i) {
    let comment = {
      body: paragraph(),
      userId: getRandomArrayEntry(adminIds),
      stretchanswerId: getRandomArrayEntry(stretchanswerIds)
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

  const createdCohortStretches = await createSeedInstances(
    CohortStretch,
    createCohortStretchObjects(
      createdCohorts.map(c => c.id),
      createdStreches.map(s => s.id)
    )
  )

  const cohortStretchIds = createdCohortStretches
    .filter(cs => cs.status === 'closed')
    .map(cs => cs.stretchId)
  const createdStretchAnswers = await createSeedInstances(
    StretchAnswer,
    createStretchAnswerObjects(
      createdStreches
        .map(stretch => stretch.id)
        .filter(id => cohortStretchIds.includes(id)),
      cohortUsersStudents
    )
  )
  await createSeedInstances(
    Comment,
    createCommentObjects(createdStretchAnswers.map(s => s.id), adminIds)
  )
  console.log('database successfully seeded!')
}

module.exports = syncAndSeed
