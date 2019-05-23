const { initDb } = require('../server/db/index')
const {
  internet: { userName, email, password },
  name: { firstName, lastName },
  lorem: { paragraph, words }
} = require('faker')
const {
  models: { User, Stretch, Comment, Snippet }
} = require('../server/db/index')

const createSeedInstances = (model, data) => {
  return Promise.all(data.map(item => model.create(item)))
}

const getRandomArrayEntry = arr => {
  return arr[Math.round(Math.random() * (arr.length - 1))]
}

const createUserObjects = () => {
  let users = []
  for (let i = 0; i < 10; ++i) {
    let newUser = {
      userName: userName(),
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      password: password(),
      isAdmin: Math.random() <= 0.5
    }
    users.push(newUser)
  }
  return users
}

const createStretchObjects = usersFirstNames => {
  let stretches = []
  for (let i = 0; i < 30; ++i) {
    let stretch = {
      title: words(),
      body: paragraph(),
      author: getRandomArrayEntry(usersFirstNames)
    }
    stretches.push(stretch)
  }
  return stretches
}

const createSnippetObjects = (stretchIds, userIds) => {
  let snippets = []
  for (let i = 0; i < 30; ++i) {
    let snippet = {
      body: paragraph(),
      isSolved: Math.random() <= 0.5,
      userId: getRandomArrayEntry(userIds),
      stretchId: Math.random() <= 0.7 ? getRandomArrayEntry(stretchIds) : null
    }
    snippets.push(snippet)
  }
  return snippets
}

const createCommentObjects = (snippetIds, userIds) => {
  let comments = []
  for (let i = 0; i < 99; ++i) {
    let comment = {
      body: paragraph(),
      userId: getRandomArrayEntry(userIds),
      snippetId: getRandomArrayEntry(snippetIds)
    }
    comments.push(comment)
  }
  return comments
}

const syncAndSeed = async () => {
  await initDb(true)
  const createdUsers = await createSeedInstances(User, createUserObjects())
  const createdStreches = await createSeedInstances(
    Stretch,
    createStretchObjects(createdUsers.map(user => user.firstName))
  )
  const userIds = createdUsers.map(user => user.id)
  const createdSnippets = await createSeedInstances(
    Snippet,
    createSnippetObjects(createdStreches.map(stretch => stretch.id), userIds)
  )
  await createSeedInstances(
    Comment,
    createCommentObjects(createdSnippets.map(snippet => snippet.id), userIds)
  )
  console.log('database successfully seeded!')
}

module.exports = syncAndSeed
