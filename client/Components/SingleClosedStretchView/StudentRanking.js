import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { updateStretchAnswerThunk } from '../../store/stretch-answers/actions'
import { useStyles } from './styles'

const StudentRanking = ({
  stretchAnswerId,
  answerRating,
  setAnswerRating,
  updateStretchAnswer
}) => {
  const { starColor } = useStyles()
  return (
    <div>
      {[1, 2, 3, 4, 5].map(el => {
        return (
          <i
            key={el}
            className={`fa${
              el <= answerRating ? 's' : 'r'
            } fa-star ${starColor}`}
            onClick={() => setAnswerRating(el)}
          />
        )
      })}
      <Button
        type="button"
        color="primary"
        size="small"
        onClick={() =>
          updateStretchAnswer(stretchAnswerId, { rating: answerRating })
        }
      >
        Submit rating
      </Button>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateStretchAnswer: (stretchAnswerId, updatedFields) =>
      dispatch(updateStretchAnswerThunk(stretchAnswerId, updatedFields))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(StudentRanking)
