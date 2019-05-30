import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'

import Controls from './Controls'
import GeneralInfo from './GeneralInfo'

import CodeEditor from '../CodeEditor/CodeEditor'

class CreateStretch extends Component {
  state = {
    title: 'Untitled',
    category: 'None',
    scheduledDate: new Date(),
    textPrompt: '',
    codePrompt: '',
    canBeCoded: true,
    difficulty: 0
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state)
  }

  render() {
    const { state, handleChange, handleSubmit } = this

    return (
      <form onSubmit={handleSubmit}>
        <div style={styles.root}>
          <Grid container spacing={2} style={styles.sub}>
            {/* This section displays the button controls. */}
            <Grid item xs={12}>
              <Controls />
            </Grid>

            {/* This section displays the stretch details. */}
            <Grid item xs={12}>
              <GeneralInfo
                handleChange={handleChange}
                // This is given to the component for display purposes.

                title={state.title}
                category={state.category}
                scheduledDate={state.scheduledDate}
              />
            </Grid>

            {/* This section displays the embedded text editor. */}
            <Grid item xs={6}>
              Text editor
            </Grid>

            {/* This section displays the embedded code editor. */}
            <Grid item xs={6}>
              <CodeEditor style={styles.codeEditor} />
            </Grid>
          </Grid>
        </div>
      </form>
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  sub: {
    width: '80%'
  },
  codeEditor: {
    width: '95%'
  }
}

export default CreateStretch
