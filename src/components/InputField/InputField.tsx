import { ChangeEventHandler, ReactNode } from 'react'

import { Input, Label } from '../../styles/globals.styles'

type InputFieldProp = {
  type?: string
  id?: string
  placeholder?: string
  value?: string
  inputChange?: ChangeEventHandler<HTMLInputElement> | undefined
  text?: string
  required?: boolean
  icon?: ReactNode
}

const InputField = (props: InputFieldProp) => {
  return (
    <div role="GeneralInput">
      <Label htmlFor={props.id}>
        {`${props.text} ${props.required === true ? '*' : ''}`}
      </Label>
      {props.icon}
      <Input
        type={props.type}
        value={props.value}
        onChange={props.inputChange}
        id={props.id}
        required={props.required}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default InputField
