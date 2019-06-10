import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const SubmittedStretches = ({
  student,
  stretchAnswers,
  stretches,
  cohortStretches,
  match: {
    params: { id }
  }
}) => {
  const [studentsExpanded, toggleStudents] = useState(false)

  const handleClickStudents = () => toggleStudents(!studentsExpanded)

  const selectedStretchCohortIds = cohortStretches
    .filter(sc => sc.cohortId === id)
    .map(sc => sc.id)

  const studentAnswers = stretchAnswers.filter(
    answer =>
      answer.userId === student.id &&
      selectedStretchCohortIds.includes(answer.cohortstretchId)
  )

  return (
    <div>
      <ListItem button onClick={handleClickStudents}>
        <ListItemText primary={student.firstName + ' ' + student.lastName} />
        {studentsExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={studentsExpanded} timeout="auto" unmountOnExit>
        <List component="div">
          {studentAnswers.map(answer => {
            let cohortStretch = cohortStretches.find(
              cs => cs.id === answer.cohortstretchId
            )

            let stretchName = stretches.find(
              s => s.id === cohortStretch.stretchId
            )
            return (
              <Typography key={answer.id}>
                <Link to={`admin/stretchAnswer/${answer.id}`}>
                  <li>Submission for {stretchName.title}</li>
                </Link>
              </Typography>
            )
          })}
        </List>
      </Collapse>
    </div>
  )
}

const mapStateToProps = state => {
  const { stretchAnswers, stretches, cohortStretches } = state
  return {
    stretchAnswers,
    stretches,
    cohortStretches
  }
}

export default withRouter(connect(mapStateToProps)(SubmittedStretches))
