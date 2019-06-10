import moment from 'moment'

export const getStretchAnswerMetaData = (
  stretchAnswer,
  stretches,
  cohortStretches,
  cohorts,
  cohortUsers
) => {
  const { stretchId, body } = stretchAnswer
  const cohortUserId = stretchAnswer.cohortuserId
  const cohortId = cohortUsers.find(cu => cu.id === cohortUserId).cohortId

  const cohortName = cohorts.find(c => c.id === cohortId).name
  const stretch = stretches.find(s => s.id === stretchId)
  const { categoryName, difficulty, title, textPrompt } = stretch
  const selectedCohortStretches = cohortStretches
    .filter(cs => cs.stretchId === stretchId)
    .map(cs => {
      const { name } = cohorts.find(c => c.id === cs.cohortId)
      return { ...cs, cohortName: name }
    })

  const { scheduledDate } = selectedCohortStretches.find(
    cs => cs.cohortId === cohortId
  )
  const { isSolved, rating, timeToSolve } = stretchAnswer

  const stretchMetaData = {
    cohortName,
    categoryName: categoryName || 'N/A',
    difficulty: difficulty || 'N/A',
    title,
    scheduledDate: scheduledDate.slice(0, 10),
    isSolved:
      typeof isSolved === 'boolean'
        ? `${String(isSolved)[0].toUpperCase()}${String(isSolved).slice(1)}`
        : 'N/A',
    rating: rating || 'N/A',
    timeToSolve
  }

  const stretchCode = {
    textPrompt,
    studentAnswer: body,
    solutions: selectedCohortStretches
      .map(cs => ({
        solution: cs.solution,
        dropdownTitle:
          cs.cohortId === cohortId ? 'Cohort Solution' : cs.cohortName
      }))
      .sort((a, b) => {
        if (a.dropdownTitle === 'Cohort Solution') return -1
        return a.dropdownTitle - b.dropdownTitle
      })
  }

  return { stretchMetaData, stretchCode }
}

export const checkIfAllDataExists = (
  stretchAnswer,
  stretches,
  cohortStretches,
  cohorts,
  cohortUsers
) => {
  if (!stretchAnswer) return false
  const data = [stretches, cohortStretches, cohorts, cohortUsers]
  for (var i = 0; i < data.length; ++i) {
    if (!data[i].length) return false
  }
  return true
}

const parseTime = datetime => {
  const hour = datetime.hour()
  const suffix = hour <= 12 ? 'AM' : 'PM'
  return `${hour <= 12 ? hour : hour - 12}:${datetime.minute()} ${suffix}`
}

const compareTwoDates = (dateOne, dateTwo) => {
  return (
    dateOne.year() === dateTwo.year() &&
    dateOne.month() === dateTwo.month() &&
    dateOne.date() === dateTwo.date()
  )
}

const getDaySuffix = day => {
  const daysSuffix = [
    'th',
    'st',
    'nd',
    'rd',
    'th',
    'th',
    'th',
    'th',
    'th',
    'th'
  ]
  if (day >= 11 && day <= 13) return 'th'
  return daysSuffix[day % 10]
}

export const groupCommentsByDate = comments => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return comments.reduce((acc, comment) => {
    const localDateTime = moment.utc(comment.createdAt).local()
    comment.time = parseTime(localDateTime)
    const today = moment()
    let yesterday = moment().subtract(1, 'days')
    let elementOfDate = acc.find(a => compareTwoDates(a.date, localDateTime))
    if (elementOfDate) {
      elementOfDate.comments.push(comment)
    } else {
      acc.push({
        date: localDateTime,
        dateAsString: compareTwoDates(localDateTime, today)
          ? 'Today'
          : compareTwoDates(localDateTime, yesterday)
          ? 'Yesterday'
          : `${
              months[localDateTime.month()]
            } ${localDateTime.date()}${getDaySuffix(localDateTime.date())}${
              localDateTime.year() === today.year()
                ? ''
                : `, ${localDateTime.year()}`
            }`,
        comments: [comment]
      })
    }
    return acc
  }, [])
}
