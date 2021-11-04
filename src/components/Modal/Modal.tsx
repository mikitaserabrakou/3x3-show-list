import React from 'react'
import './Modal.scss'

export default function Modal({ show, image, onClose, onClick }: any) {
  if (!show) return null

  const onClickSave = () => {
    const link = document.createElement('a')
    link.download = '3x3-show-list.png'
    link.href = image
    link.click()
  }

  return (
    <div className="modal">
      <div className="modal_content">
        <div className="modal_header">
          <h4 className="modal_title">Save 3x3 as image</h4>
        </div>
        <div className="modal_body">
          <img src={image} alt="" />
        </div>
        <div className="modal_footer>">
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
