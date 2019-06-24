import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createCohortStretch } from '../../store/cohort-stretches/actions'

import Grid from '@material-ui/core/Grid'
import DateAndTimePicker from '../_shared/DateAndTimePicker'
import CohortSelect from '../_shared/CohortSelect'
import CodeEditor, { AuxillaryComponents } from '../CodeEditor'
const { CommonCodeSection } = AuxillaryComponents
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { ControlStyles } from '../SingleStretch/styles'
import GeneralInfo from '../SingleStretch/GeneralInfo'

const CohortStretchCreation = ({
  stretch,
  userDetails,
  createCohortStretch,
  history
}) => {
  if (!stretch) return <div>Data still loading</div>

  let [scheduledDate, setScheduledDate] = useState(new Date())
  let [selectedCohortId, setSelectedCohortId] = useState('')
  let [allowAnswersToBeRun, setAllowAnswersToBeRun] = useState(false)
  let [alternateSolution, setAlternateSolution] = useState('')
  let [saveAlternateSolution, setSaveAlternateSolution] = useState(false)
  const { authorSolution, language } = stretch

  const scheduleStretch = () => {
    return createCohortStretch({
      status: 'scheduled',
      scheduledDate,
      allowAnswersToBeRun,
      stretchId: stretch.id,
      cohortId: selectedCohortId,
      cohortSolution: saveAlternateSolution ? alternateSolution : null
    }).then(() => history.push(`/admin/cohort/${selectedCohortId}`))
  }

  return (
    <Grid container>
      <Grid container style={{ ...ControlStyles.root, textAlign: 'right' }}>
        <Grid item xs={12}>
          <div>
            <Button
              variant="contained"
              onClick={scheduleStretch}
              color="primary"
            >
              Schedule
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <GeneralInfo attributes={{ ...stretch, mode: 'read' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption" style={{ color: 'red' }}>
          * any cohorts in red are ones you have already used stretch in
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <DateAndTimePicker
              name="scheduledDate"
              label="Scheduled Date"
              value={scheduledDate}
              handleChange={setScheduledDate}
            />
          </Grid>
          <Grid item xs={6}>
            <CohortSelect
              cohortId={selectedCohortId}
              handleChange={({ target: { value } }) =>
                setSelectedCohortId(value)
              }
              stretchId={stretch.id}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        style={{ borderBottom: '2px solid lightGrey', marginBottom: '15px' }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={allowAnswersToBeRun}
              onChange={({ target }) => setAllowAnswersToBeRun(target.checked)}
              color="primary"
            />
          }
          label="Check this box if you want to allow students to run code while completing the stretch"
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" style={{ fontSize: '1.2rem' }}>
          Author Solution
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CodeEditor
          readOnly={true}
          initialCode={authorSolution}
          language={language}
          editorTheme="monokai"
          editorId="authorSolution"
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={saveAlternateSolution}
              onChange={({ target }) =>
                setSaveAlternateSolution(target.checked)
              }
              color="primary"
            />
          }
          label="Check this box if you want to to use your solution below instead of author's solution"
        />
      </Grid>
      <Grid item xs={12}>
        <CommonCodeSection
          handleCodeChange={({ target: { value } }) =>
            setAlternateSolution(value)
          }
          codeTargetName="cohortStretchCreation"
          stretchId={stretch.id}
          fileName={`file-${userDetails.id}-${stretch.id}`}
          editorId="cohortSolution"
        />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (
  { stretches, userDetails },
  {
    match: {
      params: { stretchId }
    }
  }
) => ({ stretch: stretches.find(s => s.id === stretchId), userDetails })

const mapDispatchToProps = dispatch => ({
  createCohortStretch: data => dispatch(createCohortStretch(data))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CohortStretchCreation)
