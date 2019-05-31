export const getCohortStudents = (cohortId, students) => {
  return students.filter(student => student.cohortIds.includes(cohortId))
}
