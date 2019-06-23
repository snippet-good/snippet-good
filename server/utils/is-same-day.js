/**
 * Compares two Date objects to see if they are the same dd/mm/yyyy.
 *
 * @param {Date} d1 - First date
 * @param {Date} d2 - Second date
 *
 * @return {boolean} - If `true`, the two dates are the same day
 */

const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

module.exports = isSameDay
