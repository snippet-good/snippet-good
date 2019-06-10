import React from 'react'
import SubmittedStretches from './SubmittedStretches'

export const CohortStudents = ({ cohortStudents }) => {
<<<<<<< HEAD

    return (<div>
        {cohortStudents.map(student => <SubmittedStretches student={student} />)}

    </div>)
=======
  console.log(cohortStudents)
  return (
    <div>
      {cohortStudents.map(student => (
        <SubmittedStretches key={student.id} student={student} />
      ))}
    </div>
  )
>>>>>>> upstream/develop
}
