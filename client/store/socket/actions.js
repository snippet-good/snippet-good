import axios from 'axios'

// --------------------------------------------------
// Action types

export const JOIN_COHORT_STRETCH_ROOM = 'JOIN_COHORT_STRETCH_ROOM'
export const JOIN_COHORT_STRETCH_ROOM_ADMIN = 'JOIN_COHORT_STRETCH_ROOM_ADMIN'

// --------------------------------------------------
// Action creators

const joinCohortStretchRoom = cohortStretchId => ({
  type: JOIN_COHORT_STRETCH_ROOM,
  cohortStretchId
})

export const joinCohortStretchRoomAdmin = cohortStretch => ({
  type: JOIN_COHORT_STRETCH_ROOM_ADMIN,
  cohortStretch
})

// --------------------------------------------------
// thunks

export const joinCohortStretchRoomThunk = cohortStretchId => dispatch => {
  return dispatch(joinCohortStretchRoom(cohortStretchId))
}
