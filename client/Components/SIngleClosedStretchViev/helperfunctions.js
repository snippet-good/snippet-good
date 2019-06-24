import moment from 'moment'

const generateListOfSolutions = (
  cohortStretches,
  stretchId,
  cohortId,
  authorSolution
) => {
  let solutions = cohortStretches
    .filter(cs => cs.stretchId === stretchId && cs.cohortSolution)
    .map(cs => cs.cohortSolution)
  let clickedCohortSolution = cohortStretches.find(
    cs => cs.cohortId === cohortId
  ).cohortSolution

  let otherSolutionNumber = 1
  solutions = [...solutions, authorSolution]
    .reduce((acc, value) => {
      if (!acc.includes(value)) acc.push(value)
      return acc
    }, [])
    .reduce((acc, solution) => {
      let dropdownTitle = ''
      if ([clickedCohortSolution, authorSolution].includes(solution)) {
        if (solution === clickedCohortSolution) {
          dropdownTitle = 'Cohort'
        }
        if (solution === authorSolution) {
          dropdownTitle = `${dropdownTitle}${
            dropdownTitle === 'Cohort' ? '/' : ''
          }Author`
        }
        dropdownTitle = `${dropdownTitle} Solution`
      } else {
        dropdownTitle = `Other Solution #${otherSolutionNumber}`
        ++otherSolutionNumber
      }
      acc.push({ solution, dropdownTitle })
      return acc
    }, [])

  return solutions.sort((a, b) => {
    if (a.dropdownTitle.startsWith('Cohort')) return -1
    return a.dropdownTitle - b.dropdownTitle
  })
}

export const getStretchAnswerMetaData = (
  stretchAnswer,
  stretches,
  cohortStretches,
  userDetails
) => {
  const {
    id,
    cohortstretchId,
    body,
    rating,
    timeToSolve,
    cohortName,
    cohortId,
    userId
  } = stretchAnswer
  const numberOfMiutes = Math.floor(timeToSolve / 60)
  const numberOfSeconds = timeToSolve - numberOfMiutes * 60
  const { stretchId, scheduledDate, adminIds } = cohortStretches.find(
    cs => cs.id === cohortstretchId
  )
  const {
    categoryName,
    difficulty,
    title,
    textPrompt,
    codePrompt,
    language,
    authorSolution
  } = stretches.find(s => s.id === stretchId)

  let solutions = generateListOfSolutions(
    cohortStretches,
    stretchId,
    cohortId,
    authorSolution
  )

  const stretchMetaData = {
    stretchAnswerId: id,
    language,
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
    codePrompt,
    studentAnswer: body,
    solutions
  }

  return {
    stretchMetaData,
    stretchCode,
    relatedUsers: [userId, ...adminIds].filter(u => u !== userDetails.id)
  }
}

const parseTime = datetime => {
  const hour = datetime.hour()
  const minute = datetime.minute()
  const suffix = hour <= 12 ? 'AM' : 'PM'
  return `${hour <= 12 ? hour : hour - 12}:${
    minute < 10 ? `0${minute}` : minute
  } ${suffix}`
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
