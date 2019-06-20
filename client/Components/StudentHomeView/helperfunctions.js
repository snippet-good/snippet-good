const getStretchAndFormat = (stretches, stretchId) => {
  const { id, ...otherStretchFields } = stretches.find(s => s.id === stretchId)
  return { stretchId: id, ...otherStretchFields }
}

const formatCohortStretch = (cohortStretch, stretches) => {
  const { id, stretchId, ...otherFields } = cohortStretch
  return {
    cohortStretchId: id,
    ...getStretchAndFormat(stretches, stretchId),
    ...otherFields
  }
}

export const getStretchAnswers = (
  studentStretchAnswers,
  stretches,
  cohortStretches
) => {
  return studentStretchAnswers.map(sa => {
    const { id, cohortstretchId, submittedOnTime } = sa
    const cohortStretch = cohortStretches.find(cs => cs.id === cohortstretchId)
    return {
      stretchAnswerId: id,
      submittedOnTime,
      ...formatCohortStretch(cohortStretch, stretches)
    }
  })
}

export const getOpenAndMissedStretches = (
  cohortStretchIdsOfAnswers,
  studentCohorts,
  stretches,
  cohortStretches
) => {
  return cohortStretches.reduce(
    (acc, cs) => {
      if (
        studentCohorts.includes(cs.cohortId) &&
        !cohortStretchIdsOfAnswers.includes(cs.id) &&
        cs.status === 'open'
      ) {
        acc.openStretches.push(formatCohortStretch(cs, stretches))
      }
      if (
        cs.status === 'closed' &&
        studentCohorts.includes(cs.cohortId) &&
        !cohortStretchIdsOfAnswers.includes(cs.id)
      ) {
        acc.missedStretches.push(formatCohortStretch(cs, stretches))
      }
      return acc
    },
    { openStretches: [], missedStretches: [] }
  )
}
