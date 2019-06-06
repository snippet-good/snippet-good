import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  },
  activeItemColor: {
    color: 'dodgerblue'
  }
}))

const Sidebar = ({ cohorts, history, location: { pathname } }) => {
  const [cohortsExpanded, toggleCohorts] = useState(false)

  const handleClickCohorts = () => toggleCohorts(!cohortsExpanded)

  const { nested, activeItemColor } = useStyles()

  return (
    <List>
      <ListItem button onClick={() => history.push('/admin/stretches')}>
        <ListItemText
          primary="All Stretches"
          className={pathname === '/admin/stretches' ? activeItemColor : ''}
        />
      </ListItem>
      <ListItem button onClick={handleClickCohorts}>
        <ListItemText primary="Cohorts" />
        {cohortsExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={cohortsExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {cohorts.map(cohort => {
            const routeToGoTo = `/admin/cohort/${cohort.id}`
            return (
              <ListItem
                key={cohort.id}
                button
                onClick={() => history.push(routeToGoTo)}
                className={nested}
              >
                <ListItemText
                  primary={cohort.name}
                  className={pathname === routeToGoTo ? activeItemColor : ''}
                />
              </ListItem>
            )
          })}
        </List>
      </Collapse>
    </List>
  )
}

const mapStateToProps = ({ cohorts }) => ({ cohorts })

export default connect(mapStateToProps)(Sidebar)
