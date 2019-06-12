import React from 'react'
import { connect } from 'react-redux'
import { deleteFlashMessage } from '../../store/flash-message/actions'
import Button from '@material-ui/core/Button'

const FlashMessage = ({ flashMessages, history, deleteFlashMessage }) => {
  const { message, link } = flashMessages
  if (!message) return <div />
  return (
    <div>
      {flashMessages.message}

      <Button
        color="primary"
        size="small"
        onClick={() => {
          history.push(link)
          deleteFlashMessage()
        }}
      >
        Click here to go to it
      </Button>
      <Button
        color="secondary"
        size="small"
        onClick={() => {
          deleteFlashMessage()
        }}
      >
        Dismiss Message
      </Button>
    </div>
  )
}

const mapStateToProps = ({ flashMessages }) => ({ flashMessages })

const mapDispatchToProps = dispatch => {
  return {
    deleteFlashMessage: () => dispatch(deleteFlashMessage())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashMessage)
