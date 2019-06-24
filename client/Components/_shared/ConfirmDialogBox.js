import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

import GiphyView from './GiphyView'

const ConfirmDialogBox = ({
  text,
  open,
  setModalClosed,
  args,
  action,
  showNoButton,
  isGiphy
}) => {
  let [showGiphy, setShowGiphy] = useState(false)
  const handleClose = () => {
    setShowGiphy(true)
    setTimeout(() => {
      setShowGiphy(false)
      action(...args).then(() => setModalClosed())
    }, 3000)
  }
  return (
    <div>
      <Dialog open={open} onClose={setModalClosed}>
        <DialogContent>
          <DialogContentText component="div">
            {isGiphy && showGiphy ? <GiphyView /> : text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              if (isGiphy) {
                handleClose()
              } else {
                action(...args).then(() => setModalClosed())
              }
            }}
          >
            Yes
          </Button>
          {showNoButton && (
            <Button color="secondary" onClick={() => setModalClosed()}>
              No
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmDialogBox
