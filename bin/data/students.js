const config = require('../seed.config').students

const createBlanks = () => {
  const result = []

  for (let i = 0; i < config.instances; ++i)
    result.push({
      userName: `student_${i}`,
      firstName: `Student_${i}`,
      lastName: `Student_${i}`,
      email: `student_${i}@email.com`,
      password: '1234',
      isAdmin: false
    })

  return result
}

module.exports = [...createBlanks()]
