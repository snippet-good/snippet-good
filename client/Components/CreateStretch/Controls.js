import React, { useState } from 'react'
import Button from '@material-ui/core/Button'

import Modal from '@material-ui/core/Modal'

import ExistingStretches from './ExistingStretches/ExistingStretches'

import { ControlsStyles as styles } from './styles'

const Controls = props => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleModalOpen = () => setModalIsOpen(true)
  const handleModalClose = () => setModalIsOpen(false)

  return (
    <div style={styles.root}>
      <Button variant="outlined" onClick={handleModalOpen}>
        Existing Stretches
      </Button>

      <Modal open={modalIsOpen} onClose={handleModalClose}>
        <ExistingStretches />
      </Modal>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </div>
  )
}

export default Controls
