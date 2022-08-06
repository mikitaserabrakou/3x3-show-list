import React, { SyntheticEvent } from 'react'
import { useDispatch } from 'react-redux'

import Button from 'components/Button'
import { changeState } from 'store/settingsSlice'
import styles from './Settings.module.scss'

interface ISettingsProps {
  onSaveClick: (event: SyntheticEvent) => void
  onResetClick: (event: SyntheticEvent) => void
}

export function Settings({ onSaveClick, onResetClick }: ISettingsProps): JSX.Element {
  const dispatch = useDispatch()
  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const enabled = formData.get('enabled') === 'on'
    const number = formData.get('number') as string
    const inputObject = Object.fromEntries(formData)
    dispatch(
      changeState({
        border: { enabled, borderRadius: number }
      })
    )
    console.log(enabled, number)
  }
  return (
    <div className={styles.settings}>
      <h1>Settings</h1>
      <div className={styles.options}>
        <div>
          <h2>Shadow</h2>
          <div>
            <input type="checkbox" />
            <input type="number" />
          </div>
        </div>
        <div>
          <h2>Border</h2>
          <form onSubmit={onSubmit}>
            <input type="checkbox" name="enabled" />
            <input type="number" name="number" />
            <button type="submit">Apply</button>
          </form>
        </div>
        <Button onClick={onSaveClick}>Save</Button>
        <Button onClick={onSaveClick}>Save</Button>
      </div>
      <div className={styles.buttons}>
        <Button type="cancel" onClick={onResetClick}>
          Reset
        </Button>
        <Button onClick={onSaveClick}>Save</Button>
      </div>
    </div>
  )
}
