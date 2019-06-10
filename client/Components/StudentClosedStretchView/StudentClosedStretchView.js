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
  getCommentsOfStretchAnswer,
  stretchAnswer,
  allStretchAnswerRelatedData
}) => {
  const { textPromptSpacing, textPromptHeading } = useStyles()
  useEffect(() => {
    if (stretchAnswerId) {
      getCommentsOfStretchAnswer(stretchAnswerId)
    }
  }, [stretchAnswer])
  if (!allStretchAnswerRelatedData.stretchCode) {
    return <div>no stretch answer</div>
  }
  const { root } = styles
  const {
    stretchMetaData,
    stretchCode: { textPrompt, studentAnswer, solutions }
  } = allStretchAnswerRelatedData
  return (
    <div styles={root}>
      <GeneralInfo stretchMetaData={stretchMetaData} />
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
      <CodeSection {...{ studentAnswer, solutions }} />
      <CommentsSection stretchAnswerId={stretchAnswer.id} />
    </div>
  )
}

const mapStateToProps = (
  { stretchAnswers, stretches, cohortStretches },
  {
    match: {
      params: { stretchAnswerId }
    }
  }
) => {
  const stretchAnswer = stretchAnswers.find(sa => sa.id === stretchAnswerId)
  const data = [stretchAnswer, stretches, cohortStretches]
  const allStretchAnswerRelatedData = checkIfAllDataExists(...data)
    ? getStretchAnswerMetaData(...data)
    : {}
  return {
    stretchAnswerId,
    stretchAnswer,
    allStretchAnswerRelatedData
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
