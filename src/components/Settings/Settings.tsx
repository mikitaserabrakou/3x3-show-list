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
  const onSubmit = (event: any) => {
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
      <div className={styles.options}>
        <form onSubmit={onSubmit} onReset={onFormReset}>
          <h2>Shadow</h2>
          <div>
            <input type="checkbox" name="shadow" defaultChecked={shadow.enabled} />
            <input type="text" name="offsetX" defaultValue={shadow.offsetX} />
            <input type="text" name="offsetY" defaultValue={shadow.offsetY} />
            <input type="text" name="blur" defaultValue={shadow.blur} />
          </div>
          <div>
            <h2>Border</h2>
            <input type="checkbox" name="border" defaultChecked={border.enabled} />
            <input type="text" name="borderRadius" defaultValue={border.borderRadius} />
          </div>
          <input type="submit" value="Save" />
          <input type="reset" />
        </form>
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
