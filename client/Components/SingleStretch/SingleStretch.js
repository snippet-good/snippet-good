import React, { Component } from 'react'

import { connect } from 'react-redux'
import { createStretch, updateStretch } from '../../store/stretches/actions'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'

import Controls from './Controls'
import GeneralInfo from './GeneralInfo'
import CodeEditor from '../CodeEditor'

import { GeneralInfoStyles, SingleStretchStyles as styles } from './styles'

class SingleStretch extends Component {
  state = {
    mode: 'read',
    title: 'Untitled',
    categoryId: '',
    textPrompt: 'This is an example text prompt.',
    codePrompt: '// This is an example code prompt.',
    difficulty: 3,
    minutes: '',
    language: 'javascript',
    authorId: '',
    isLoaded: false
  }

  // This method changes the mode of the view. The valid modes are 'read', 'update', and 'create'.
  changeMode = mode => this.setState({ mode })

  setStretchDetails = () => {
    const { match, mode, stretches } = this.props

    let attributes = {}
    if (match.params.id && stretches.length)
      attributes = stretches.find(s => s.id === match.params.id)
    this.setState({ mode, ...attributes, initialCode: attributes.codePrompt })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleCodeChange = codePrompt => this.setState({ codePrompt })

  // This function is called when SingleStretch is in 'create' or 'update' mode.
  handleSubmit = event => {
    event.preventDefault()

    const data = Object.assign({}, this.state)
    delete data.mode

    if (this.state.mode === 'update') {
      this.props
        .updateStretch({ ...data, id: this.state.id })
        .then(updatedStretch => {
          const { title, categoryId, categoryName } = updatedStretch
          const { difficulty, textPrompt, codePrompt } = updatedStretch

          this.setState({
            mode: 'read',
            title,
            categoryId,
            categoryName,
            difficulty,
            textPrompt,
            codePrompt
          })
        })
    }

    if (this.state.mode === 'create') {
      this.props
        .createStretch({ ...data, authorId: this.props.userDetails.id })
        .then(() => this.props.history.push('/admin/stretches'))
    }
  }

  componentDidMount() {
    this.setStretchDetails()
  }

  componentDidUpdate(prevProps) {
    const { stretches } = this.props
    if (prevProps.stretches !== stretches && stretches.length) {
      this.setStretchDetails()
      this.setState({ isLoaded: true })
    }
  }

  displayTextWithLineBreak(text) {
    return text.split('\n')
  }

  render() {
    const { state } = this
    const { handleSubmit, changeMode } = this
    const { handleChange } = this
    const { mode, authorId, language } = state
    return (
      <form onSubmit={handleSubmit}>
        <div style={styles.root}>
          <Grid container spacing={2} style={styles.sub}>
            <Grid item xs={12}>
              <Controls
                mode={mode}
                changeMode={changeMode}
                authorId={authorId}
              />
            </Grid>

            <Grid item xs={12}>
              <GeneralInfo attributes={state} handleChange={handleChange} />
            </Grid>

            <Grid item xs={12} style={GeneralInfoStyles.root}>
              {mode === 'read' ? (
                <div>
                  <InputLabel shrink>Text Prompt</InputLabel>
                  <Typography variant="subtitle1">
                    {this.displayTextWithLineBreak(state.textPrompt).map(
                      line => (
                        <div key={line}>{line}</div>
                      )
                    )}
                  </Typography>
                </div>
              ) : (
                <TextField
                  id="standard-full-width"
                  name="textPrompt"
                  label="Text Prompt"
                  value={state.textPrompt}
                  placeholder="Enter your written prompt here."
                  helperText="This is to be substituted with a rich text editor."
                  fullWidth
                  multiline="true"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={handleChange}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <CodeEditor
                initialCode={state.initialCode}
                codeTargetName="codePrompt"
                handleCodeChange={handleChange}
                language={language}
                readOnly={mode === 'read'}
              />
            </Grid>
          </Grid>
        </div>
      </form>
    )
  }
}

SingleStretch.defaultProps = {
  mode: 'read',
  stretch: {}
}

const mapStateToProps = state => ({
  userDetails: state.userDetails,
  stretches: state.stretches,
  cohortStretches: state.cohortStretches
})

const mapDispatchToProps = dispatch => ({
  createStretch: newStretch => dispatch(createStretch(newStretch)),
  updateStretch: updatedStretch => dispatch(updateStretch(updatedStretch))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStretch)
