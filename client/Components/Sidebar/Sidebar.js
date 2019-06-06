import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

const Sidebar = ({ cohorts, history }) => {
  const [cohortsExpanded, toggleCohorts] = useState(false)

  const handleClickCohorts = () => toggleCohorts(!cohortsExpanded)

  const { nested } = useStyles()

  return (
    <List>
      <ListItem button onClick={() => history.push('/admin/stretches')}>
        All Stretches
      </ListItem>
      <ListItem button onClick={handleClickCohorts}>
        <ListItemText primary="Cohorts" />
        {cohortsExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={cohortsExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {cohorts.map(cohort => {
            return (
              <ListItem
                key={cohort.id}
                button
                onClick={() => history.push(`/admin/cohort/${cohort.id}`)}
                className={nested}
              >
                <ListItemText primary={cohort.name} />
              </ListItem>
            )
          })}
        </List>
      </Collapse>
    </List>
  )
}

export default Sidebar
