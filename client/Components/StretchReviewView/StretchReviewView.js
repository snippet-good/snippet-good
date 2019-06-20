import React from 'react'
import { connect } from 'react-redux'
import GeneralInfo from '../SingleStretch/GeneralInfo'
import CodeSection from './CodeSection'
import { checkIfAllDataExists } from '../../utilityfunctions'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { textPromptStyles } from './styles'

const StretchReviewView = ({
  attributes,
  currentCohortStretch,
  cohortStretchId
}) => {
  if (!attributes) return <div>Data still loading</div>
  const { textPrompt, codePrompt, ...otherStretchFields } = attributes

  return (
    <div>
      <GeneralInfo attributes={otherStretchFields} />
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            style={textPromptStyles.heading}
            color="primary"
          >
            Text Prompt
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" style={textPromptStyles.spacing}>
            {textPrompt}{' '}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CodeSection
            solution={`${codePrompt}\n\n${currentCohortStretch.solution}`}
            language={otherStretchFields.language}
            cohortStretchId={cohortStretchId}
          />
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (
  { cohortStretches, stretches },
  {
    match: {
      params: { cohortStretchId }
    }
  }
) => {
  if (!checkIfAllDataExists(cohortStretches, stretches)) return {}

  const currentCohortStretch = cohortStretches.find(
    cs => cs.id === cohortStretchId
  )
  if (!currentCohortStretch) return {}
  const selectedStretch = stretches.find(
    stretch => stretch.id === currentCohortStretch.stretchId
  )
  if (!selectedStretch) return {}

  const attributes = { mode: 'read', ...selectedStretch }

  return { attributes, currentCohortStretch, cohortStretchId }
}

export default connect(mapStateToProps)(StretchReviewView)
