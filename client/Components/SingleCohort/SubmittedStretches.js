import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'


const SubmittedStretches = () => {
    //let studentId = ''
    let modalStatus = false

    const handleOpen = () => {
        modalStatus = true
        //studentId = id
    }

    const handleClose = () => {
        modalStatus = false
        //studentId = ''
    }

    console.log(stretchAnswers)
    studentStretches = stretchAnswers.filter(stretch => stretch.studentId === id)

    return (
        <div><Typography>
            <ul>

                {studentStretches.map(stretch => (<li><Link to={`/admin/singleStretch/${stretch.id}`}>
                    {stretch.title}
                </Link></li>))}
            </ul>
        </Typography></div>)
}

const mapStateToProps = state => {
    const { stretchAnswers } = state
    return {
        stretchAnswers
    }
}

export default connect(mapStateToProps)(SubmittedStretches)
