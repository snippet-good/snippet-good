import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import { chatInputStyles, root } from './styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import { connect } from 'react-redux'
import { createCommentThunk } from '../../store/comments/actions'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}))

const CommentSection = ({
  comments,
  userDetails,
  stretchAnswerId,
  createComment
}) => {
  let [message, setMessage] = useState('')
  const { margin } = useStyles()

  const sendMessage = () => {
    return createComment({
      body: message,
      stretchanswerId: stretchAnswerId,
      userId: userDetails.id
    }).then(() => {
      message = ''
    })
  }
  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      {comments.map(comment => {
        return (
          <Grid item xs={10} key={comment.id}>
            <Typography>{comment.body}</Typography>
          </Grid>
        )
      })}

      <Grid container style={root}>
        <Grid item xs={9}>
          <TextField
            id="outlined-full-width"
            placeholder="Comment on stretch"
            fullWidth
            variant="outlined"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
            inputProps={{
              borderRadius: '0px'
            }}
            multiline={true}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            type="button"
            variant="outlined"
            onClick={sendMessage}
            style={chatInputStyles}
          >
            +
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = ({ comments, userDetails }) => ({
  comments,
  userDetails
})

const mapDispatchToProps = dispatch => {
  return {
    createComment: newComment => dispatch(createCommentThunk(newComment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentSection)
