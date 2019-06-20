import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import StretchListView from './StretchListView'
import OpenStretchCards from './OpenStretchCards'
import { checkIfAllDataExists } from '../../utilityfunctions'
import { getOpenAndMissedStretches, getStretchAnswers } from './helperfunctions'

const mapStateToProps = ({
  userDetails,
  cohortUsers,
  stretches,
  cohortStretches,
  stretchAnswers
}) => {
  if (
    !checkIfAllDataExists(
      userDetails,
      cohortUsers,
      stretches,
      cohortStretches,
      stretchAnswers
    )
  )
    return { userDetails }
  const studentCohorts = cohortUsers.map(cu => cu.cohortId)
  const studentStretchAnswers = stretchAnswers.filter(
    sa => sa.userId === userDetails.id
  )
  const cohortStretchIdsOfAnswers = studentStretchAnswers.map(
    sa => sa.cohortstretchId
  )
  const { openStretches, missedStretches } = getOpenAndMissedStretches(
    cohortStretchIdsOfAnswers,
    studentCohorts,
    stretches,
    cohortStretches
  )
  const submittedStretches = getStretchAnswers(
    studentStretchAnswers,
    stretches,
    cohortStretches
  )

  return {
    openStretches,
    submittedStretches,
    missedStretches,
    userDetails
  }
}

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}))

// eslint-disable-next-line complexity
const StudentHomeView = ({
  openStretches,
  submittedStretches,
  missedStretches,
  match: {
    params: { status }
  }
}) => {
  const classes = useStyles()
  return (
    <main className={classes.content}>
      {status === undefined && (
        <OpenStretchCards stretches={openStretches || []} />
      )}
      {status === 'open' && (
        <StretchListView stretches={openStretches || []} status={status} />
      )}
      {status === 'submitted' && (
        <StretchListView stretches={submittedStretches || []} status={status} />
      )}
      {status === 'missed' && (
        <StretchListView stretches={missedStretches || []} status={status} />
      )}
    </main>
  )
}

export default connect(mapStateToProps)(StudentHomeView)
