import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import FlashMessage from '../FlashMessage'
import {
  checkIfUserLoggedInThunk,
  logoutUserThunk
} from '../../store/auth/actions'
import {
  loadAdminRelatedDataThunk,
  loadStudentRelatedDataThunk
} from '../../store/shared-actions'
//import {getAllCohortUsers} from '../../store/cohort-users/actions'

import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import useStyles from './styles'

const FrameworkHOC = (MainComponent, Sidebar) => {
  const Framework = props => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const {
      userDetails,
      history,
      loadAdminRelatedData,
      loadStudentRelatedData,
      logoutUser
    } = props
    useEffect(() => {
      if (userDetails.id && userDetails.isAdmin) {
        loadAdminRelatedData(userDetails.id)
      }
      if (userDetails.id && !userDetails.isAdmin) {
        loadStudentRelatedData(userDetails.id)
      }
    }, [userDetails])

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={`${classes.appBar} ${
            open ? `${classes.appBarShift}` : ''
          }`}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              className={`${classes.menuButton} ${
                open ? `${classes.hide}` : ''
              }`}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              onClick={() =>
                history.push(`/${userDetails.isAdmin ? 'admin' : 'student'}`)
              }
            >
              Modern Stretches
            </Typography>

            <section className={classes.rightToolbar}>
              <Button color="inherit" onClick={() => logoutUser(history)}>
                Logout
              </Button>
            </section>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Sidebar {...props} />
        </Drawer>
        <main
          className={`${classes.content} ${
            open ? `${classes.contentShift}` : ''
          }`}
        >
          <div className={classes.drawerHeader} />
          <FlashMessage history={history} />
          <MainComponent />
        </main>
      </div>
    )
  }

  const mapStateToProps = ({ userDetails }) => ({
    userDetails
  })

  const mapDispatchToProps = dispatch => {
    return {
      checkIfUserLoggedIn: history =>
        dispatch(checkIfUserLoggedInThunk(history)),
      logoutUser: history => dispatch(logoutUserThunk(history)),
      loadAdminRelatedData: adminId =>
        dispatch(loadAdminRelatedDataThunk(adminId)),
      loadStudentRelatedData: adminId =>
        dispatch(loadStudentRelatedDataThunk(adminId))
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Framework)
}

export default FrameworkHOC
