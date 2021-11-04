import { cleanup } from '@testing-library/react'
import React, { useEffect } from 'react'
import './Modal.scss'

export default function Modal({ show, image, onClose, onClick }: any) {
  const onClickSave = () => {
    const link = document.createElement('a')
    link.download = '3x3-show-list.png'
    link.href = image
    link.click()
  }

  const closeOnEscapeKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose()
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
    }
  })
  if (!show) return null
  return (
    <div className="modal">
      <div className="modal_content">
        <div className="modal_header">
          <h4 className="modal_title">Save 3x3 as image</h4>
        </div>
        <div className="modal_body">
          <img src={image} alt="" />
        </div>
        <div className="modal_footer">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" onClick={onClickSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
