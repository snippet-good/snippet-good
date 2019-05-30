export const getFilteredStretchesOfAdmin = (
  adminId,
  cohortStretches,
  stretches
) => {
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
    .map(cs => ({ ...cs, ...stretchesTitlesMap[cs.stretchId] }))
    .reduce(
      (obj, value) => {
        obj[value.status].push(value)
        return obj
      },
      { scheduled: [], open: [] }
    )
}
