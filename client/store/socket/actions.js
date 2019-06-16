// --------------------------------------------------
// Action types

export const JOIN_COHORT_STRETCH_ROOM = 'JOIN_COHORT_STRETCH_ROOM'

// --------------------------------------------------
// Action creators

const joinCohortStretchRoom = cohortStretchId => ({
  type: JOIN_COHORT_STRETCH_ROOM,
  cohortStretchId
})

// --------------------------------------------------
// thunks

export const joinCohortStretchRoomThunk = cohortStretchId => dispatch => {
  return dispatch(joinCohortStretchRoom(cohortStretchId))
}
