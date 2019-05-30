import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStretch } from '../../store/stretches/actions'

import Grid from '@material-ui/core/Grid'

import Controls from './Controls'
import GeneralInfo from './GeneralInfo'

import CodeEditor from '../CodeEditor/CodeEditor'

// Notes:
// - Need to connect state.userDetails to obtain authorId

class CreateStretch extends Component {
  state = {
    title: 'Untitled',
    category: 'None',
    scheduledDate: new Date(),
    textPrompt: 'This is an example text prompt.',
    codePrompt: 'This is an example code prompt.',
    canBeCoded: true,
    difficulty: 3
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state)
    this.props.createStretch({ ...this.state, authorId: 1, categoryId: 1 })
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

const mapDispatchToProps = dispatch => ({
  createStretch: details => dispatch(createStretch(details))
})

export default connect(
  null,
  mapDispatchToProps
)(CreateStretch)
