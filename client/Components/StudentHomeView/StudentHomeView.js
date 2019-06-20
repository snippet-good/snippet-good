import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import StretchListView from './StretchListView'
import { checkIfAllDataExists } from '../../utilityfunctions'

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
  const cohortStretchIds = stretchAnswers
    .filter(sa => sa.userId === userDetails.id)
    .map(sa => sa.cohortstretchId)

  const openStretches = cohortStretches
    .filter(
      cs =>
        studentCohorts.includes(cs.cohortId) &&
        !cohortStretchIds.includes(cs.id) &&
        cs.status === 'open'
    )
    .map(cs => {
      const stretch = stretches.find(s => s.id === cs.stretchId)
      const { id, ...stretchFields } = stretch
      const { allowAnswersToBeRun } = cs
      return {
        ...stretchFields,
        stretchId: id,
        cohortStretchId: cs.id,
        allowAnswersToBeRun
      }
    })

  const submittedStretches = stretchAnswers
    .filter(sa => sa.userId === userDetails.id)
    .map(sa => {
      const { title, id } = stretches.find(s => s.id === sa.stretchId)
      return { ...sa, title, stretchId: id }
    })

  return {
    openStretches,
    submittedStretches,
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

const StudentHomeView = ({
  openStretches,
  submittedStretches,
  match: {
    params: { status }
  }
}) => {
  const classes = useStyles()
  return (
    <main className={classes.content}>
      {status === 'open' && <StretchListView openStretches={openStretches} />}
      {status === 'submitted' && (
        <StretchListView submittedStretches={submittedStretches} />
      )}
    </main>
  )
}

export default connect(mapStateToProps)(StudentHomeView)
