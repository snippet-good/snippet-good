import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'

import Controls from './Controls'
import GeneralInfo from './GeneralInfo'

import { SingleStretchStyles as styles } from './styles'

class SingleStretch extends Component {
  state = {
    mode: 'read',
    title: 'Untitled',
    categoryId: '',
    categoryName: 'No category',
    textPrompt: 'This is an example text prompt.',
    codePrompt: 'This is an example code prompt.',
    difficulty: 3
  }

  // This method changes the mode of the view. The valid modes are 'read', 'update', and 'create'.
  changeMode = mode => this.setState({ mode })

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
    console.log(this.state)
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state)
  }

  componentDidMount() {
    this.setState({ ...this.props.stretch })
  }

  render() {
    const { state, props } = this
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

export default SingleStretch
