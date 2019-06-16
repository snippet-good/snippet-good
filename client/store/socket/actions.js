// --------------------------------------------------
// Action types

export const JOIN_COHORT_STRETCH_ROOM = 'JOIN_COHORT_STRETCH_ROOM'
export const SEND_CLOSED_STRETCH = 'SEND_CLOSED_STRETCH'

// --------------------------------------------------
// Action creators

const joinCohortStretchRoom = cohortStretchId => ({
  type: JOIN_COHORT_STRETCH_ROOM,
  cohortStretchId
})

export const sendClosedStretch = cohortStretch => ({
  type: SEND_CLOSED_STRETCH,
  cohortStretch
})

// --------------------------------------------------
// thunks

export const joinCohortStretchRoomThunk = cohortStretchId => dispatch => {
  return dispatch(joinCohortStretchRoom(cohortStretchId))
}
