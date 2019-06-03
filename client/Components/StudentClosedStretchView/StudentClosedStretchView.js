import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import GeneralInfo from './GeneralInfo'
import CodeEditorsView from './CodeEditorsView'
import CommentsSection from './CommentSection'
import { GeneralInfoStyles as styles } from '../CreateStretch/styles'
import { getCommentsOfStretchAnswerThunk } from '../../store/comments/actions'
import {
  getStretchAnswerMetaData,
  checkIfAllDataExists
} from './helperfunctions'

const StudentClosedStretchView = ({
  stretchAnswerId,
  getCommentsOfStretchAnswer,
  stretchAnswer,
  allStretchAnswerRelatedData
}) => {
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
      <div>{textPrompt}</div>
      <CodeEditorsView {...{ studentAnswer, solutions }} />
      <CommentsSection stretchAnswerId={stretchAnswer.id} />
    </div>
  )
}

const mapStateToProps = (
  { stretchAnswers, stretches, cohortStretches, cohorts, cohortUsers },
  {
    match: {
      params: { stretchAnswerId }
    }
  }
) => {
  const stretchAnswer = stretchAnswers.find(sa => sa.id === stretchAnswerId)
  const data = [stretchAnswer, stretches, cohortStretches, cohorts, cohortUsers]
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
