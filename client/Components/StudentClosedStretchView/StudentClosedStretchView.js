import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import { GeneralInfoStyles as styles } from '../CreateStretch/styles'

import { getCommentsOfStretchAnswerThunk } from '../../store/comments/actions'
import {
  getStretchAnswerMetaData,
  checkIfAllDataExists
} from './helperfunctions'

const StudentClosedStretchView = ({
  comments,
  stretchAnswerId,
  getCommentsOfStretchAnswer,
  stretchAnswer,
  stretchAnswerMetaData
}) => {
  useEffect(() => {
    if (stretchAnswerId) {
      getCommentsOfStretchAnswer(stretchAnswerId)
    }
  }, [stretchAnswer])

  console.log('STRETCH ANSWER', stretchAnswer)
  if (!stretchAnswer) {
    return <div>no stretch answer</div>
  }

  console.log(comments)
  const { root, info } = styles
  const { scheduledDate, cohortName } = stretchAnswerMetaData
  const selectedFields = [
    'title',
    'categoryName',
    'difficulty',
    'isSolved',
    'rating',
    'timeToSolve'
  ].reduce((acc, field) => {
    acc.push({ name: field, value: stretchAnswerMetaData[field] })
    return acc
  }, [])
  return (
    <div styles={root}>
      <div>
        Completed on {scheduledDate} in {cohortName}
      </div>
      <ExpansionPanel styles={info}>
        <ExpansionPanelSummary>
          <Grid container justify="center" alignItems="center" spacing={2}>
            {selectedFields.slice(0, 3).map(field => {
              return (
                <Grid item xs={4} key={field.name}>
                  <InputLabel shrink>{field.name}</InputLabel>
                  <Typography variant="subtitle2">{field.value}</Typography>
                </Grid>
              )
            })}
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {selectedFields.slice(3).map(field => {
            return (
              <Grid item xs={4} key={field.name}>
                <InputLabel shrink>{field.name}</InputLabel>
                <Typography variant="subtitle2">{field.value}</Typography>
              </Grid>
            )
          })}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

const mapStateToProps = (
  {
    comments,
    stretchAnswers,
    stretches,
    cohortStretches,
    cohorts,
    cohortUsers
  },
  {
    match: {
      params: { stretchAnswerId }
    }
  }
) => {
  const stretchAnswer = stretchAnswers.find(sa => sa.id === stretchAnswerId)
  const data = [stretchAnswer, stretches, cohortStretches, cohorts, cohortUsers]
  return {
    comments,
    stretchAnswerId,
    stretchAnswer,
    stretchAnswerMetaData: checkIfAllDataExists(...data)
      ? getStretchAnswerMetaData(...data)
      : {}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCommentsOfStretchAnswer: stretchAnswerId =>
      dispatch(getCommentsOfStretchAnswerThunk(stretchAnswerId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentClosedStretchView)
