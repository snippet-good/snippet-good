import axios from 'axios'
import '@babel/polyfill'

export const getAttendance = async (cohortId, date) => {
  const response = await axios.get(`/api/attendance/${cohortId}/${date}`)
  return response.data
}
