import React, { Component } from 'react'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grow from '@material-ui/core/Grow'

import StretchTable from './StretchTable'
import StretchInfo from './StretchInfo'

import { ExistingStretchesStyles as styles } from '../styles'

class ExistingStretches extends Component {
  state = {
    selectedStretch: {}
  }

  setSelectedStretch = event => {
    console.log(event)
  }

  render() {
    return (
      <Grow in={true}>
        <Paper tabIndex="-1" style={styles.root}>
          <Grid container>
            {/* Left half of modal, renders all existing stretches */}
            <Grid item xs={6}>
              <StretchTable />
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    )
  }
}

const mapStateToProps = state => ({
  stretches: state.stretches,
  stretchAnswers: state.stretchAnswers
})

export default connect(mapStateToProps)(ExistingStretches)
