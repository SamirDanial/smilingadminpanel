import React, { ReactNode } from 'react'
import {
  InputTextError,
  TextBoxLabel,
  BoxShadow,
  TextArea as TextAreaTool,
} from '../../styles/globals.styles'

type TextAreaProp = {
  labelText?: string
  id?: string
  name?: string
  placeholder?: string
  value?: string | number | readonly string[] | undefined
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement> | undefined
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement> | undefined
  focusValue?: string
  text?: string
  required?: boolean
  icon?: ReactNode
  error?: string
  touch?: boolean
  width?: string
  height?: string
}

const TextArea = (props: TextAreaProp) => {
  return (
    <React.Fragment>
      <TextBoxLabel>
        {props.required ? props.labelText + '*' : props.labelText}
      </TextBoxLabel>
      <TextAreaTool
        placeholder={props.placeholder}
        style={{ boxShadow: props.name !== props.focusValue ? BoxShadow : '' }}
        className={`focus:outline-none focus:border-smilingFocus ${
          props.focusValue === props.name && 'border-2 border-smilingFocus'
        } ${props.width} ${props.height}`}
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
      {props.error && props.touch && (
        <InputTextError>{props.error}</InputTextError>
      )}
    </React.Fragment>
  )
}

export default TextArea
