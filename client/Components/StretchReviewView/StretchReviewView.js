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

  const {
    textPrompt,
    codePrompt,
    authorSolution,
    ...otherStretchFields
  } = attributes
  const { language } = otherStretchFields

  const jsxBarriers = {
    string:
      "\n//Put component to render as first argument in ReactDOM.render\nReactDOM.render(\n\n,document.querySelector('#app'))",
    regExToCheck: {
      render: /ReactDOM.render\(/,
      querySelector: /,document.querySelector\('#app'\)\)/,
      string: /\/\/Put component to render as first argument in ReactDOM.render/
    }
  }

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
            outlinedCode={language === 'jsx' ? jsxBarriers.string : ''}
            solution={`${codePrompt}\n\n${currentCohortStretch.cohortSolution ||
              authorSolution}\n${language === 'jsx' ? jsxBarriers.string : ''}`}
            language={language}
            cohortStretchId={cohortStretchId}
            jsxBarriers={jsxBarriers}
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
