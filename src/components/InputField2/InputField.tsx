import React, {
  ChangeEventHandler,
  FocusEventHandler,
  ReactNode,
  useState,
} from 'react'
import { Calendar, utils } from '@hassanmojab/react-modern-calendar-datepicker'
import {
  InputText,
  InputTextError,
  TextBoxLabel,
  BoxShadow,
} from '../../styles/globals.styles'

type InputFieldProp = {
  labelText?: string
  id?: string
  name?: string
  type?: string
  placeholder?: string
  value?: string | number | readonly string[] | undefined
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined
  onFocus?: FocusEventHandler<HTMLInputElement> | undefined
  pickDate?: any
  dateNewValue?: any
  mode?: string
  focusValue?: string
  text?: string
  required?: boolean
  icon?: ReactNode
  error?: string
  touch?: boolean
  width?: string
  height?: string
  minDate?: string
  maxDate?: string
  alt?: string
}

const InputField = (props: InputFieldProp) => {
  const [calendar, setCalendar] = useState(false)
  const [selectedDay, setSelectedDay] = useState<any>(null)
  const [acceptableDate, setAcceptableDate] = useState('')

  React.useEffect(() => {
    if (selectedDay) {
      setAcceptableDate(
        selectedDay.year +
          '-' +
          (selectedDay.month < 10
            ? '0' + selectedDay.month
            : selectedDay.month) +
          '-' +
          (selectedDay.day < 10 ? '0' + selectedDay.day : selectedDay.day),
      )
      props.pickDate(acceptableDate)
    }
  }, [selectedDay, acceptableDate, props])

  React.useEffect(() => {
    setCalendar(false)
  }, [acceptableDate])

  React.useEffect(() => {
    if (props.mode === 'restart' && props.type === 'date') {
      setSelectedDay(null)
      setAcceptableDate('')
    }
    if (props.dateNewValue && props.mode === 'edit' && props.type === 'date') {
      setSelectedDay(props.dateNewValue)
      setAcceptableDate(
        props.dateNewValue.year +
          '-' +
          (props.dateNewValue.month < 10
            ? '0' + props.dateNewValue.month
            : props.dateNewValue.month) +
          '-' +
          props.dateNewValue.day,
      )
    }
  }, [props.dateNewValue, props.type, props.mode])

  return (
    <div>
      <TextBoxLabel>
        {props.required ? props.labelText + ' *' : props.labelText}
      </TextBoxLabel>
      <div
        onClick={() => {
          if (props.type === 'date') {
            setCalendar((preValue) => !preValue)
          }
        }}
      >
        <div className="relative">
          <InputText
            type={props.type || 'text'}
            alt={props.alt}
            placeholder={props.placeholder}
            style={{
              boxShadow:
                (!props.touch && props.name !== props.focusValue) ||
                (!props.value &&
                  !props.required &&
                  props.name !== props.focusValue)
                  ? BoxShadow
                  : '',
            }}
            className={`focus:outline-none focus:border-smilingFocus ${
              props.focusValue === props.name && 'border-2 border-smilingFocus'
            } ${props.width} ${props.height} ${
              props.required &&
              props.error &&
              props.touch &&
              'border-2 border-smilingError'
            } ${
              props.value &&
              !props.error &&
              props.touch &&
              'border-2 border-smilingSuccess'
            } `}
            name={props.name}
            id={props.id}
            value={props.type === 'date' ? acceptableDate : props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            min={props.minDate}
            max={props.maxDate}
            onFocus={props.onFocus}
            disabled={props.type === 'date'}
          />
          {props.icon && props.icon}
        </div>
      </div>
      {calendar && props.type === 'date' && (
        <div className="absolute z-20 mt-2">
          <Calendar
            value={selectedDay}
            onChange={setSelectedDay}
            minimumDate={utils('en').getToday()}
            colorPrimary="purple"
          />
        </div>
      )}
      {props.error && props.touch && (
        <InputTextError>{props.error}</InputTextError>
      )}
    </div>
  )
}

export default InputField
