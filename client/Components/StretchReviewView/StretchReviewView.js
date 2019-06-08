import React, { Component } from 'react'
import { connect } from 'react-redux'
import GeneralInfo from '../SingleStretch/GeneralInfo'
import { AuxillaryComponents, codeEditorFunctions } from '../CodeEditor'
const { runCode, clearCodeResults } = codeEditorFunctions
const {
  ThemeSelector,
  RunCodeButton,
  ClearCodeResultsButton
} = AuxillaryComponents
import { checkIfAllDataExists } from '../../utilityfunctions'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import styles from './styles'

class StretchReviewView extends Component {
  constructor() {
    super()
    this.state = {
      editorTheme: 'monokai',
      code: '',
      codeResponse: '',
      codeError: ''
    }
    this.runCodeBinded = runCode.bind(this)
    this.clearCodeResultsBinded = clearCodeResults.bind(this)
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { attributes, currentCohortStretch } = this.props
    const { editorTheme, code, codeResponse, codeError } = this.state
    const { runCodeBinded, clearCodeResultsBinded, handleChange } = this
    if (!attributes) return <div>Data still loading</div>
    const { textPrompt, ...otherStretchFields } = attributes

    return (
      <div>
        <GeneralInfo attributes={otherStretchFields} />
        <Grid container>
          <Grid item xs={3}>
            <ThemeSelector {...{ editorTheme, handleChange }} />
          </Grid>
          <Grid item xs={4}>
            <RunCodeButton color="primary" runCode={runCodeBinded} code={5} />
          </Grid>
          <Grid item xs={4}>
            <ClearCodeResultsButton color="secondary" />
          </Grid>
        </Grid>

        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="subtitle2"
              style={styles.textPromptHeading}
              color="primary"
            >
              Text Prompt
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" style={styles.textPromptSpacing}>
              {textPrompt}{' '}
            </Typography>
          </Grid>
        </Grid>
      </div>
    )
  }
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

  return { attributes, currentCohortStretch }
}

export default connect(mapStateToProps)(StretchReviewView)
