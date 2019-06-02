export const getStretchAnswerMetaData = (
  stretchAnswer,
  stretches,
  cohortStretches,
  cohorts,
  cohortUsers
) => {
  const stretchId = stretchAnswer.stretchId
  const cohortUserId = stretchAnswer.cohortuserId
  const cohortId = cohortUsers.find(cu => cu.id === cohortUserId).cohortId

  const cohortName = cohorts.find(c => c.id === cohortId).name
  const stretch = stretches.find(s => s.id === stretchId)
  const { categoryName, difficulty, title, textPrompt, codePrompt } = stretch
  const cohortStretch = cohortStretches.find(
    cs => cs.cohortId === cohortId && cs.stretchId === stretchId
  )

  const { scheduledDate } = cohortStretch
  const { isSolved, rating, timeToSolve } = stretchAnswer

  const stretchMetaData = {
    cohortName,
    categoryName: categoryName || 'No category',
    difficulty: difficulty || 'No difficulty',
    title,
    scheduledDate: scheduledDate.slice(0, 10),
    isSolved: typeof isSolved === 'boolean' ? isSolved : 'N/A',
    rating: rating || 'N/A',
    timeToSolve
  }

  return { stretchMetaData }
}

export const checkIfAllDataExists = (
  stretchAnswer,
  stretches,
  cohortStretches,
  cohorts,
  cohortUsers
) => {
  console.log('stretches', stretches)
  if (!stretchAnswer) return false
  const data = [stretches, cohortStretches, cohorts, cohortUsers]
  console.log(data)
  for (var i = 0; i < data.length; ++i) {
    if (!data[i].length) return false
  }
  return true
}
