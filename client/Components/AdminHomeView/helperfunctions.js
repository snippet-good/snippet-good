import { checkIfAllDataExists } from '../../utilityfunctions'
import moment from 'moment'

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
    const { cohortstretchId } = stretchAnswer
    obj[cohortstretchId] = (obj[cohortstretchId] || 0) + 1
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
  if (
    !checkIfAllDataExists(cohortStretches, stretches, students, stretchAnswers)
  ) {
    return { scheduled: [], open: [] }
  }

  const numberOfStudentsPerCohorts = getNumberOfStudentsPerCohorts(students)
  const numberOfStretches = getNumberStretchesCompletedByGroup(stretchAnswers)
  const stretchesTitlesMap = stretches.reduce((obj, value) => {
    obj[value.id] = {
      stretchId: value.id,
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

export const parseDateTime = datetime => {
  const localDateTime = moment.utc(datetime).local()
  const hour = localDateTime.hour()
  const suffix = hour <= 12 ? 'AM' : 'PM'
  return `Scheduled for ${
    hour <= 12 ? hour : hour - 12
  }:${localDateTime.minute()} ${suffix} on ${
    localDateTime.format('LL').split(',')[0]
  }`
}
