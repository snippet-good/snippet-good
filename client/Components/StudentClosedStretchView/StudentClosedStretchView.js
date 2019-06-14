import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCommentsOfStretchAnswerThunk } from '../../store/comments/actions'
import { getStretchAnswerMetaData } from './helperfunctions'
import { checkIfAllDataExists } from '../../utilityfunctions'

import GeneralInfo from './GeneralInfo'
import CodeSection from './CodeSection'
import CommentsSection from './CommentSection'

import { GeneralInfoStyles as styles } from '../SingleStretch/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useStyles } from './styles'

const StudentClosedStretchView = ({
  stretchAnswerId,
  studentName,
  getCommentsOfStretchAnswer,
  stretchAnswer,
  allStretchAnswerRelatedData
}) => {
  const { textPromptSpacing, textPromptHeading } = useStyles()
  useEffect(() => {
    if (stretchAnswerId) {
      getCommentsOfStretchAnswer(stretchAnswerId)
    }
  }, [stretchAnswerId])
  if (!stretchAnswerId) {
    return <div>no stretch answer</div>
  }
  const { root } = styles
  const {
    stretchMetaData,
    stretchCode: { textPrompt, codePrompt, studentAnswer, solutions },
    relatedUsers
  } = allStretchAnswerRelatedData
  const { language } = stretchMetaData
  return (
    <div styles={root}>
      <GeneralInfo
        stretchMetaData={stretchMetaData}
        studentName={studentName}
      />
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" className={textPromptHeading}>
            Text Prompt
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" className={textPromptSpacing}>
            {textPrompt}{' '}
          </Typography>
        </Grid>
      </Grid>
      <CodeSection {...{ studentAnswer, codePrompt, solutions, language }} />
      <CommentsSection
        stretchAnswer={stretchAnswer}
        relatedUsers={relatedUsers}
        stretchMetaData={stretchMetaData}
      />
    </div>
  )
}

const mapStateToProps = (
  { stretchAnswers, stretches, cohortStretches, users, userDetails },
  {
    match: {
      params: { stretchAnswerId, studentId }
    }
  }
) => {
  let studentName = ''
  const stretchAnswer = stretchAnswers.find(sa => sa.id === stretchAnswerId)
  const data = [stretchAnswer, stretches, cohortStretches, userDetails]

  if ([undefined, true].includes(userDetails.isAdmin)) {
    if (!checkIfAllDataExists(users, ...data)) return {}
  } else if (!checkIfAllDataExists(...data)) {
    return {}
  }

  const allStretchAnswerRelatedData = getStretchAnswerMetaData(...data)
  if (studentId) {
    const student = users.find(u => u.id === studentId)
    studentName = `${student.firstName} ${student.lastName}`
  }

  return {
    stretchAnswerId,
    stretchAnswer,
    allStretchAnswerRelatedData,
    studentName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCommentsOfStretchAnswer: stretchAnswerId =>
      dispatch(getCommentsOfStretchAnswerThunk(stretchAnswerId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentClosedStretchView)
