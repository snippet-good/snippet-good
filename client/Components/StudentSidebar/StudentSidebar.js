import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(() => ({
  activeItemColor: {
    color: 'dodgerblue'
  }
}))

const StudentSidebar = ({ setStretchesView, stretchesView }) => {
  const { activeItemColor } = useStyles()

  return (
    <Fragment>
      <List>
        {['Open Stretches', 'Submitted Stretches'].map(text => (
          <ListItem button key={text} onClick={() => setStretchesView(text)}>
            <ListItemText
              primary={text}
              className={stretchesView === text ? activeItemColor : ''}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Account Information', 'Logout'].map(text => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Fragment>
  )
}

export default StudentSidebar
