import React from 'react'
import { connect } from 'react-redux'
import { deleteFlashMessage } from '../../store/flash-message/actions'
import Button from '@material-ui/core/Button'

const FlashMessage = ({ flashMessages, history, deleteFlashMessage }) => {
  if (!flashMessages.length) return <div />
  return (
    <div>
      <ul>
        {flashMessages.map(message => {
          const { body, link, linkLabel, id } = message
          return (
            <li key={id}>
              {' '}
              {body}
              <Button
                color="primary"
                size="small"
                onClick={() => {
                  history.push(link)
                  deleteFlashMessage(id)
                }}
              >
                {linkLabel}
              </Button>
              <Button
                color="secondary"
                size="small"
                onClick={() => {
                  deleteFlashMessage(id)
                }}
              >
                Dismiss Message
              </Button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ flashMessages }) => ({ flashMessages })

const mapDispatchToProps = dispatch => {
  return {
    deleteFlashMessage: id => dispatch(deleteFlashMessage(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashMessage)
