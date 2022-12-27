import React from 'react'
import { InputTextError } from '../../styles/globals.styles'

type FileProps = {
  id?: string
  name?: string
  ref?: React.LegacyRef<HTMLInputElement> | undefined
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined
  error?: string
  touch?: boolean
}

const File = (props: FileProps) => {
  return (
    <React.Fragment>
      <input
        type="file"
        id={props.id}
        name={props.name}
        ref={props.ref}
        className="hidden"
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {props.error && props.touch && (
        <InputTextError>{props.error}</InputTextError>
      )}
    </React.Fragment>
  )
}

export default File
