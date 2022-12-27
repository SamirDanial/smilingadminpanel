import React from 'react'
import { RadioBtn, RadioLabel } from '../../styles/globals.styles'

type RadioButtonProps = {
  id?: string
  name?: string
  checked?: boolean | undefined
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
  value?: string
  label?: string
}

const RadioButton = (props: RadioButtonProps) => {
  return (
    <div>
      <RadioBtn
        role="radio"
        id={props.id}
        type="radio"
        className="accent-smilingRed"
        name={props.name}
        checked={props.checked}
        onChange={props.onChange}
        value={props.value}
      />
      <RadioLabel htmlFor={props.id}>{props.label}</RadioLabel>
    </div>
  )
}

export default RadioButton
