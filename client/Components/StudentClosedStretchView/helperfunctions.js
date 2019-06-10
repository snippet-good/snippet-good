import moment from 'moment'

export const getStretchAnswerMetaData = (
  stretchAnswer,
  stretches,
  cohortStretches
) => {
  const {
    cohortstretchId,
    body,
    rating,
    timeToSolve,
    cohortName,
    cohortId
  } = stretchAnswer
  const numberOfMiutes = Math.floor(timeToSolve / 60)
  const numberOfSeconds = timeToSolve - numberOfMiutes * 60
  const { stretchId, scheduledDate } = cohortStretches.find(
    cs => cs.id === cohortstretchId
  )
  const { categoryName, difficulty, title, textPrompt } = stretches.find(
    s => s.id === stretchId
  )

  const solutions = cohortStretches
    .filter(cs => cs.stretchId === stretchId)
    .map(cs => {
      return {
        solution: cs.solution,
        dropdownTitle:
          cs.cohortId === cohortId ? 'Cohort Solution' : cs.cohortName
      }
    })
    .sort((a, b) => {
      if (a.dropdownTitle === 'Cohort Solution') return -1
      return a.dropdownTitle - b.dropdownTitle
    })

  const stretchMetaData = {
    cohortName,
    categoryName: categoryName || 'N/A',
    difficulty: difficulty || 'N/A',
    title,
    scheduledDate: moment
      .utc(scheduledDate)
      .local()
      .format('LLLL'),
    rating: rating || 'N/A',
    timeToSolveString: `${
      numberOfMiutes > 0 ? `${numberOfMiutes} minutes, ` : ''
    }${numberOfSeconds} seconds`
  }

  const stretchCode = {
    textPrompt,
    studentAnswer: body,
    solutions
  }

  return { stretchMetaData, stretchCode }
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
