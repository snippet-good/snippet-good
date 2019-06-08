import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllCohortUsers } from '../../store/cohort-users/actions'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const SubmittedStretches = ({ student, stretchAnswers, stretches, cohortUsers }) => {

    const [studentsExpanded, toggleStudents] = useState(false)

    const handleClickStudents = () => toggleStudents(!studentsExpanded)

    const studentCohortUserId = cohortUsers.find(user => user.userId === student.id)

    const studentAnswers = stretchAnswers.filter(answer => answer.cohortuserId === studentCohortUserId.id)

    return (<div>
        <ListItem button onClick={handleClickStudents}>
            <ListItemText primary={student.firstName + '' + student.lastName} />
            {studentsExpanded ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={studentsExpanded} timeout="auto" unmountOnExit>
            <List component="div">
                {studentAnswers.map(answer => {
                    let stretchName = stretches.find(stretch => stretch.id === answer.stretchId)
                    return (
                        <Typography>
                            <Link to={`admin/stretchAnswer/${answer.id}`}><li>Submission for {stretchName.title}</li></Link>
                        </Typography>
                    )
                })}
            </List>
        </Collapse></div>)
}

const mapStateToProps = state => {
    const { stretchAnswers, cohortUsers, stretches } = state
    return {
        stretchAnswers, cohortUsers, stretches
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCohortUsers: () => dispatch(getAllCohortUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmittedStretches)
