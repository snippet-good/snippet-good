import React from 'react'
import SubmittedStretches from './SubmittedStretches'

export const CohortStudents = ({ cohortStudents }) => {
    console.log(cohortStudents)
    return (<div>
        {cohortStudents.map(student => <SubmittedStretches student={student} />)}

    </div>)
}
