import React from 'react'
import SubmittedStretches from './SubmittedStretches'

const CohortStudents = ({ cohortStudents }) => {
  return (
    <div>
      {cohortStudents.map(student => (
        <SubmittedStretches key={student.id} student={student} />
      ))}
    </div>
  )
}

export default CohortStudents
