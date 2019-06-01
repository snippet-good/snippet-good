import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },

  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

const Sidebar = ({ cohorts, history }) => {
  const [stretchesExpanded, toggleStretches] = useState(false)

  const [cohortsExpanded, toggleCohorts] = useState(false)

  const handleClickStretches = () => toggleStretches(!stretchesExpanded)
  const handleClickCohorts = () => toggleCohorts(!cohortsExpanded)

  const { drawer, nested } = useStyles()

  return (
    <Drawer variant="permanent" className={drawer} anchor="left">
      <ListItem button onClick={handleClickStretches}>
        <ListItemText primary="Stretches" />
        {stretchesExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={stretchesExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {['All', 'Scheduled', 'Open', 'Closed'].map((el, index) => {
            return (
              <ListItem
                key={index}
                button
                onClick={() =>
                  history.push(`/admin/stretches/${el === 'All' ? '' : el}`)
                }
                className={nested}
              >
                <ListItemText primary={el} />
              </ListItem>
            )
          })}
        </List>
      </Collapse>

      <Divider />

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
    </Drawer>
  )
}

export default Sidebar
