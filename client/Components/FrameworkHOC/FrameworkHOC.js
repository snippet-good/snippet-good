import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getCohortsOfAdminThunk } from '../../store/cohorts/actions'
import { getStretchAnswersOfSingleAdminThunk } from '../../store/stretch-answers/actions'
import { getUsersOfSingleAdminThunk } from '../../store/users/actions'
import {
  checkIfUserLoggedInThunk,
  logoutUserThunk
} from '../../store/auth/actions'
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
      checkIfUserLoggedIn,
      logoutUser
    } = props
    useEffect(() => {
      if (!userDetails.id) {
        checkIfUserLoggedIn(history)
      }
    })
    useEffect(() => {
      if (userDetails.id) {
        loadAdminRelatedData(userDetails.id)
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
            <Button color="inherit" onClick={() => logoutUser(history)}>
              Logout
            </Button>
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
          <MainComponent />
        </main>
      </div>
    )
  }

  const mapStateToProps = ({ userDetails }) => ({ userDetails })

  const mapDispatchToProps = dispatch => {
    return {
      checkIfUserLoggedIn: history =>
        dispatch(checkIfUserLoggedInThunk(history)),
      logoutUser: history => dispatch(logoutUserThunk(history)),
      loadAdminRelatedData: adminId => {
        return Promise.all([
          dispatch(getCohortsOfAdminThunk(adminId)),
          dispatch(getStretchAnswersOfSingleAdminThunk(adminId)),
          dispatch(getUsersOfSingleAdminThunk(adminId))
        ])
      }
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Framework)
}

export default FrameworkHOC
