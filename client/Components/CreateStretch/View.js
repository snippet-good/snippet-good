import React, { useState } from 'react'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

import Controls from './Controls'
import GeneralInfo from './GeneralInfo'

const CreateStretch = props => {
  const { categories, stretches, stretchAnswers } = props
  console.log(categories)

  return (
    <form>
      <div style={styles.root}>
        <Grid container spacing={2} style={styles.sub}>
          <Grid item xs={12}>
            <Controls />
          </Grid>

          <Grid item xs={12}>
            <GeneralInfo categories={categories} />
          </Grid>
        </Grid>
      </div>
    </form>
  )
}

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  sub: {
    width: '80%'
  }
}

const mapStateToProps = ({ categories, stretches, stretchAnswers }) => ({
  categories,
  stretches,
  stretchAnswers
})

export default connect(mapStateToProps)(CreateStretch)
