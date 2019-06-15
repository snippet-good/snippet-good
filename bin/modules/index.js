module.exports = {
  // User-related seed modules
  createUsers: require('./users/create-users'),

  // Cohort-related seed modules
  createCohorts: require('./cohorts/create-cohorts'),
  createCohortUsers: require('./cohorts/create-cohort-users'),

  // Stretch-related seed modules
  createCategories: require('./stretches/create-categories'),
  createStretches: require('./stretches/create-stretches'),
  createCohortStretches: require('./stretches/create-cohort-stretches')
}
