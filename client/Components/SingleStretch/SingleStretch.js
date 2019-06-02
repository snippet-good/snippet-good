import React, { Component } from 'react'

import { connect } from 'react-redux'
import { createStretch, updateStretch } from '../../store/stretches/actions'

import Grid from '@material-ui/core/Grid'

import Controls from './Controls'
import GeneralInfo from './GeneralInfo'

import { SingleStretchStyles as styles } from './styles'

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
      console.log('Updated stretch:', this.state)
    }

    if (this.state.mode === 'create') {
      this.create(data)
    }
  }

  componentDidMount() {
    this.setState({ mode: this.props.mode, ...this.props.stretch })
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

            <Grid item xs={12}>
              text
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

const mapDispatchToProps = dispatch => ({
  createStretch: newStretch => dispatch(createStretch(newStretch)),
  updateStretch: updatedStretch => dispatch(updateStretch(updatedStretch))
})

export default connect(
  null,
  mapDispatchToProps
)(SingleStretch)
