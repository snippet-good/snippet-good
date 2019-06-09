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

import { SingleStretchStyles as styles } from './styles'
import { GeneralInfoStyles } from './styles'

// Notes:
// - Need to work on componentDidUpdate()

class SingleStretch extends Component {
  state = {
    mode: 'read',
    title: 'Untitled',
    categoryId: '',
    textPrompt: 'This is an example text prompt.',
    codePrompt: 'This is an example code prompt.',
    difficulty: 3
  }

  // This method changes the mode of the view. The valid modes are 'read', 'update', and 'create'.
  changeMode = mode => this.setState({ mode })

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  // This function is called when SingleStretch is in 'create' or 'update' mode.
  handleSubmit = event => {
    event.preventDefault()

    const data = Object.assign({}, this.state)
    delete data.mode

    if (this.state.mode === 'update') {
      this.props
        .updateStretch({ ...data, id: this.state.id })
        .then(() => this.setState({ mode: 'read' }))
    }

    if (this.state.mode === 'create') {
      this.props.createStretch({ ...data, authorId: this.props.userDetails.id })
      // Redirect to somewhere
    }
  }

  componentDidMount() {
    const { mode, attributes } = this.props

    this.setState({ mode, ...attributes, initialCode: attributes.codePrompt })
  }

  componentDidUpdate(prevProps) {
    const { attributes } = this.props
    if (prevProps.attributes !== attributes && Object.keys(attributes).length) {
      this.setState({ ...attributes, initialCode: attributes.codePrompt })
    }
  }

  render() {
    const { state } = this
    const { handleSubmit, handleChange, changeMode } = this
    const { mode } = state
    return (
      <form onSubmit={handleSubmit}>
        <div style={styles.root}>
          <Grid container spacing={2} style={styles.sub}>
            <Grid item xs={12}>
              <Controls mode={mode} changeMode={changeMode} />
            </Grid>

            <Grid item xs={12}>
              <GeneralInfo attributes={state} handleChange={handleChange} />
            </Grid>

            <Grid item xs={12} style={GeneralInfoStyles.root}>
              {mode === 'read' ? (
                <div>
                  <InputLabel shrink>Text Prompt</InputLabel>
                  <Typography variant="subtitle1">
                    {state.textPrompt}
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

const mapStateToProps = ({ userDetails, stretches }, { match: { params } }) => {
  let attributes = {}
  if (params.id && stretches.length)
    attributes = stretches.find(s => s.id === params.id)
  return { userDetails, attributes }
}

const mapDispatchToProps = dispatch => ({
  createStretch: newStretch => dispatch(createStretch(newStretch)),
  updateStretch: updatedStretch => dispatch(updateStretch(updatedStretch))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStretch)
