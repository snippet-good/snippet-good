import React, { useState } from 'react'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'

const CodeInputSection = () => {
  let [currentTab, setTab] = useState(0)
  return (
    <Grid container>
      <Grid item xs={12}>
        <Tabs
          value={currentTab}
          onChange={(event, tab) => setTab(tab)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          style={{ marginBottom: '2em' }}
        >
          <Tab label="Code Prompt" />
          <Tab label="Solution" />
        </Tabs>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeInputSection)
