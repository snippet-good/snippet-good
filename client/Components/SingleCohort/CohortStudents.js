import React from 'react'
import SubmittedStretches from './SubmittedStretches'

export const CohortStudents = ({ cohortStudents }) => {
  return (
    <div>
      {cohortStudents.map(student => (
        <SubmittedStretches key={student.id} student={student} />
      ))}
    </div>
  )
}
