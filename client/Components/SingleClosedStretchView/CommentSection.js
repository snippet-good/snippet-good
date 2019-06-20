import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createCommentThunk } from '../../store/comments/actions'
import { groupCommentsByDate } from './helperfunctions'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import { useStyles } from './styles'

const CommentSection = ({
  userDetails,
  stretchAnswer: { id, userId },
  createComment,
  allComments,
  relatedUsers,
  stretchMetaData: { title, cohortName }
}) => {
  let [message, setMessage] = useState('')
  const {
    textColor,
    topDivider,
    addComment,
    timeClass,
    singleComment,
    inlineDivider,
    dateAsStringStyle
  } = useStyles()

  const sendMessage = () => {
    return createComment(
      {
        body: message,
        stretchanswerId: id,
        userId: userDetails.id
      },
      { relatedUsers, stretchTitle: title, cohortName, studentId: userId }
    ).then(() => setMessage(''))
  }
  return (
    <div>
      <Divider className={topDivider} />

      <Typography variant="h5" className={textColor}>
        Comment Section
      </Typography>
      <Grid container className={addComment}>
        {allComments.map(commentGroup => {
          const { date, comments, dateAsString } = commentGroup
          return (
            <Grid container key={date}>
              <Grid container>
                <Grid item xs={4}>
                  <Divider className={inlineDivider} />
                </Grid>
                <Grid item xs={1} className={dateAsStringStyle}>
                  <Typography variant="subtitle2">{dateAsString}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Divider className={inlineDivider} />
                </Grid>
              </Grid>
              {comments.map(comment => {
                return (
                  <Grid item xs={12} key={comment.id}>
                    <Grid container>
                      <span>
                        <Typography variant="subtitle2">
                          {comment.writerName}
                        </Typography>
                      </span>
                      <span>
                        <Typography variant="subtitle2" className={timeClass}>
                          {comment.time}
                        </Typography>
                      </span>
                    </Grid>
                    <Typography variant="body2" className={singleComment}>
                      {comment.body}
                    </Typography>
                  </Grid>
                )
              })}
            </Grid>
          )
        })}
      </Grid>
      <TextField
        placeholder="Comment on stretch"
        className={addComment}
        value={message}
        onChange={({ target }) => setMessage(target.value)}
        multiline={true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={sendMessage} edge="end">
                <AddIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </div>
  )
}

const mapStateToProps = ({ comments, userDetails }) => ({
  allComments: groupCommentsByDate(comments),
  userDetails
})

const mapDispatchToProps = dispatch => {
  return {
    createComment: (newComment, emitObject) =>
      dispatch(createCommentThunk(newComment, emitObject))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentSection)
