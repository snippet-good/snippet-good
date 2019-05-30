const getNumberOfStudentsPerCohorts = students => {
  if (!students.length) return {}
  return students.reduce((obj, student) => {
    student.cohortIds.forEach(cohortId => {
      obj[cohortId] = (obj[cohortId] || 0) + 1
    })
    return obj
  }, {})
}

const getNumberStretchesCompletedByGroup = stretchAnswers => {
  return stretchAnswers.reduce((obj, stretchAnswer) => {
    const { cohortId, stretchId } = stretchAnswer
    if (!obj[cohortId]) {
      obj[cohortId] = { [stretchId]: 1 }
    } else {
      obj[cohortId][stretchId] = (obj[cohortId][stretchId] || 0) + 1
    }
    return obj
  }, {})
}

export const getFilteredStretchesOfAdmin = (
  adminId,
  cohortStretches,
  stretches,
  students,
  stretchAnswers
) => {
  const numberOfStudentsPerCohorts = getNumberOfStudentsPerCohorts(students)
  const numberOfStretches = getNumberStretchesCompletedByGroup(stretchAnswers)
  console.log('-------------------------------')
  console.log(numberOfStretches)
  const stretchesTitlesMap = stretches.reduce((obj, value) => {
    obj[value.id] = {
      title: value.title,
      category: value.categoryName,
      difficulty: value.difficulty
    }
    return obj
  }, {})

  return cohortStretches
    .filter(cohortstretch => {
      return (
        ['open', 'scheduled'].includes(cohortstretch.status) &&
        cohortstretch.adminIds.includes(adminId)
      )
    })
    .map(cs => ({
      ...cs,
      ...stretchesTitlesMap[cs.stretchId],
      cohortSize: numberOfStudentsPerCohorts[cs.cohortId],
      completedStretches: numberOfStretches[cs.cohortId]
        ? numberOfStretches[cs.cohortId][cs.stretchId] || 0
        : 0
    }))
    .reduce(
      (obj, value) => {
        obj[value.status].push(value)
        return obj
      },
      { scheduled: [], open: [] }
    )
}
