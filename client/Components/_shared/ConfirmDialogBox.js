import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const ConfirmDialogBox = ({ text, open, setModalClosed, args, action }) => {
  return (
    <Dialog open={open} onClose={setModalClosed}>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => action(...args).then(() => setModalClosed())}
        >
          Yes
        </Button>
        <Button color="secondary" onClick={() => setModalClosed()}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialogBox
