import React from 'react'
import SubmittedStretches from './SubmittedStretches'
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography'

export const CohortStudents = ({ cohortStudents }) => {
    let studentId = 0

    const handleClick = (id) => {
        studentId = id

    }
    return (<div><Typography component="div">
        <ul>
            {cohortStudents.map(student => (
                <li key={student.id}>
                    <button onClick={handleClick(student.id)}>
                        {
                            student.firstName + '' + student.lastName
                        }
                    </button>
                </li>
            ))}
        </ul>
    </Typography>
        <Modal open={true}> <SubmittedStretches studentId={studentId} /> </Modal>
    </div>)
}
