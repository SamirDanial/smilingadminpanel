import React, { ReactNode } from 'react'
import { TextBoxLabel, BoxShadow } from '../../styles/globals.styles'
import { ChevronDownIcon } from '@heroicons/react/outline'

type Option = {
  name: string
  value: string
}

type SelectProp = {
  labelText?: string
  id?: string
  name?: string
  placeholder?: string
  value?: string | number | readonly string[] | undefined
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined
  onBlur?: React.FocusEventHandler<HTMLSelectElement> | undefined
  onFocus?: React.FocusEventHandler<HTMLSelectElement> | undefined
  focusValue?: string
  text?: string
  required?: boolean
  icon?: ReactNode
  error?: string
  touch?: boolean
  width?: string
  height?: string
  activeValue?: string
  options?: Option[]
}

const Select = (props: SelectProp) => {
  return (
    <div className="flex flex-col">
      <TextBoxLabel>
        {props.required ? props.labelText + '*' : props.labelText}
      </TextBoxLabel>
      <div className="relative">
        <select
          role="select"
          id={props.id}
          name={props.name}
          style={{
            boxShadow: props.name !== props.focusValue ? BoxShadow : '',
          }}
          className={`focus:outline-none focus:border-smilingFocus bg-smilingElementContrastDarkMode appearance-none ${
            props.width
          } ${props.height} ${
            props.focusValue === props.name && 'border-2 border-smilingFocus'
          }${props.width} ${props.height} rounded-[5px] pl-3 mt-[6px]`}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          onFocus={props.onFocus}
        >
          {/* {props.options?.map((option) => ( */}
          {props.options &&
            props.options.map((option) => (
              <option
                key={option.value}
                defaultValue={props.activeValue}
                value={option.value}
              >
                {option.name}
              </option>
            ))}
        </select>
        <ChevronDownIcon
          className="absolute right-[6px] top-[16px] text-smilingGrayWeak"
          width="18px"
          height="18px"
        />
      </div>
    </div>
  )
}

export default Select
