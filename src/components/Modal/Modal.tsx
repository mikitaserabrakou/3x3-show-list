import React, { useEffect } from 'react'

import Button from 'components/Button'
import './Modal.scss'

interface ModalProps {
  image: string
  onClose: () => void
}

export function Modal({ image, onClose }: ModalProps) {
  const handleClickSave = () => {
    const link = document.createElement('a')
    link.download = '3x3-show-list.png'
    link.href = image
    link.click()
  }

  const handleCloseOnEscapeKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose()
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', handleCloseOnEscapeKeyDown)
    return () => {
      document.body.removeEventListener('keydown', handleCloseOnEscapeKeyDown)
    }
  })

  return (
    <div className="modal">
      <div className="modal_content">
        <div className="modal_body">
          <img src={image} alt="" />
        </div>
        <div className="modal_footer">
          <Button className="btn--cancel" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleClickSave}>Save</Button>
        </div>
      </div>
    </div>
  )
}
