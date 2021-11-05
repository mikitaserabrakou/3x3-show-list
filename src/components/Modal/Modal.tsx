import React, { useEffect, useState } from 'react'
import './Modal.scss'

import { HexColorPicker } from 'react-colorful'
import useDebouncy from 'use-debouncy/lib/fn'

export default function Modal({ show, image, onClose, onCreateImage }: any) {
  const [color, setColor] = useState('')

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

  const handleChange = useDebouncy(newValue => {
    setColor(newValue)
    onCreateImage(newValue)
  }, 200)

  useEffect(() => {
    document.body.addEventListener('keydown', handleCloseOnEscapeKeyDown)
    return () => {
      document.body.removeEventListener('keydown', handleCloseOnEscapeKeyDown)
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
          <HexColorPicker color={color} onChange={handleChange} />
        </div>
        <div className="modal_footer">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" onClick={handleClickSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
