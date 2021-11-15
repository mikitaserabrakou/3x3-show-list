import React, { useEffect } from 'react'
import Button from '../buttons/Button/Button'
import './Modal.scss'

export default function Modal({ image, onClose }: any) {
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
          <Button type="cancel" handleClick={onClose}>
            Close{' '}
          </Button>
          <Button type="save" handleClick={handleClickSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
