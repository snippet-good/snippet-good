import React from 'react'
import Grid from '@material-ui/core/Grid'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import { GeneralInfoStyles as styles } from '../CreateStretch/styles'

const GeneralInfo = ({ stretchMetaData }) => {
  const { info } = styles
  const { scheduledDate, cohortName } = stretchMetaData
  const selectedFields = [
    { field: 'Title', dbColumn: 'title' },
    { field: 'Category', dbColumn: 'categoryName' },
    { field: 'Difficulty (out of 5)', dbColumn: 'difficulty' },
    { field: 'Correct', dbColumn: 'isSolved' },
    { field: 'Rating (out of 5)', dbColumn: 'rating' },
    { field: 'Time Took To Complete', dbColumn: 'timeToSolve' }
  ].reduce((acc, field) => {
    acc.push({ name: field.field, value: stretchMetaData[field.dbColumn] })
    return acc
  }, [])
  return (
    <div>
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

export default GeneralInfo
