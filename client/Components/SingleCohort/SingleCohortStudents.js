import React from 'react'
import { connect } from 'react-redux'

const SingleCohortStudents = ({ students }) => {
    console.log(students)
    return (<Typography>
        <ul> here
            {/* {students.map(student => (
                <li key={student.id}>
                    {student.firstName + '' + student.lastName}
                </li>
            ))} */}
        </ul>
    </Typography>)
}

export default connect(null, null)(SingleCohortStudents)
