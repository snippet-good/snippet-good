export const GET_USER = 'GET_USER'
export const GET_COHORT = 'GET_COHORT'
export const GET_COHORTS = 'GET_COHORTS'
export const GET_STUDENTS = 'GET_STUDENTS'
export const GET_STRETCHES = 'GET_STRETCHES'

export const getUser = user => {
  return {
    type: GET_USER,
    user
  }
}

export const getCohort = cohort => {
  return {
    type: GET_COHORT,
    cohort
  }
}

export const getCohorts = cohorts => {
  return {
    type: GET_COHORTS,
    cohorts
  }
}

export const getStudents = students => {
  return {
    type: GET_STUDENTS,
    students
  }
}

export const getStretches = stretches => {
  return {
    type: GET_STRETCHES,
    stretches
  }
}
