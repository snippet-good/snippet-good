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

  const openStretches = cohortStretches
    .filter(cs => studentCohorts.includes(cs.cohortId) && cs.status === 'open')
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

  const submittedStretches = stretchAnswers.map(sa => {
    const { title } = stretches.find(s => s.id === sa.stretchId)
    return { ...sa, title }
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
      {status === 'open' ? (
        <StretchListView openStretches={openStretches} />
      ) : status === 'submitted' ? (
        <StretchListView submittedStretches={submittedStretches} />
      ) : (
        <div />
      )}
    </main>
  )
}

export default connect(mapStateToProps)(StudentHomeView)
