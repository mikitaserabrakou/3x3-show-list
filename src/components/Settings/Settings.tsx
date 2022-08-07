import React, { SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'components/Button'
import { changeState, resetSettings } from 'store/settingsSlice'
import { RootState } from 'store/store'

import styles from './Settings.module.scss'

interface ISettingsProps {
  onSaveClick: (event: SyntheticEvent) => void
  onResetClick: (event: SyntheticEvent) => void
}

export function Settings({ onSaveClick, onResetClick }: ISettingsProps): JSX.Element {
  const { border, shadow } = useSelector((state: RootState) => state.settings)

  const dispatch = useDispatch()
  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const inputObject = Object.fromEntries(formData)
    dispatch(
      changeState({
        border: {
          enabled: inputObject.border === 'on',
          borderRadius: inputObject.borderRadius as string
        },
        shadow: {
          enabled: inputObject.shadow === 'on',
          offsetX: inputObject.offsetX as string,
          offsetY: inputObject.offsetY as string,
          blur: inputObject.blur as string
        }
      })
    )
  }

  const onFormReset = () => {
    dispatch(resetSettings())
  }

  return (
    <div className={styles.settings}>
      <h1>Settings</h1>
      <form className={styles.options} onSubmit={onSubmit} onReset={onFormReset}>
        <span>
          <label htmlFor="shadow">Shadow</label>
          <input id="shadow" type="checkbox" name="shadow" defaultChecked={shadow.enabled} />
        </span>
        <span>
          <label htmlFor="offset X">Offset X</label>
          <input id="offset X" type="text" name="offsetX" defaultValue={shadow.offsetX} />
        </span>
        <span>
          <label htmlFor="offset Y">Offset Y</label>
          <input id="offset Y" type="text" name="offsetY" defaultValue={shadow.offsetY} />
        </span>
        <span>
          <label htmlFor="blur">Blur</label>
          <input id="blur" type="text" name="blur" defaultValue={shadow.blur} />
        </span>
        <span>
          <label htmlFor="border">Border</label>
          <input id="border" type="checkbox" name="border" defaultChecked={border.enabled} />{' '}
        </span>
        <span>
          <label htmlFor="borderRadius">Radius</label>
          <input
            id="borderRadius"
            type="text"
            name="borderRadius"
            defaultValue={border.borderRadius}
          />
        </span>
        <span className={styles.controls}>
          <input type="reset" />
          <input type="submit" value="Apply" />
        </span>
      </form>
      <div className={styles.buttons}>
        <Button variant="cancel" onClick={onResetClick}>
          Reset
        </Button>
        <Button onClick={onSaveClick}>Save</Button>
      </div>
    </div>
  )
}
