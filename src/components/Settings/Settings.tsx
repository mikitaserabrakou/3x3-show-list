import React, { SyntheticEvent } from 'react'
import cn from 'classnames'

import Button from 'components/Button'
import styles from './Settings.module.scss'

interface ISettingsProps {
  onSaveClick: (event: SyntheticEvent) => void
  onResetClick: (event: SyntheticEvent) => void
}

const handleMouseDown = (event: SyntheticEvent) => {
  event.preventDefault()
  event.stopPropagation()
}

export function Settings({ onSaveClick, onResetClick }: ISettingsProps): JSX.Element {
  return (
    <div className={styles.settings}>
      <h1>Settings</h1>
      <div className={styles.buttons}>
        <Button variant="cancel" onClick={onResetClick}>
          Reset
        </Button>
        <Button onClick={onSaveClick}>Save</Button>
      </div>
    </div>
  )
}
