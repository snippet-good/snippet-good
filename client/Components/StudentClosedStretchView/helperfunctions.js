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
    isSolved: typeof isSolved === 'boolean' ? isSolved : 'N/A',
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
