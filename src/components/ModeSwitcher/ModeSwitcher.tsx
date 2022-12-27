import { ChangeEventHandler, ReactElement } from 'react'
import { Span } from '../../styles/globals.styles'

type ModeSwitcherProps = {
  themeChanger?: ChangeEventHandler<HTMLInputElement> | undefined
  leftIcon?: ReactElement
  rightIcon?: ReactElement
  leftColor?: string
  rightColor?: string
  distanceFromRight?: string
  distanseFromTop?: string
  distanseFromBottom?: string
  distanseFromLeft?: string
  darkMode?: boolean
}

const ModeSwitcher = (props: ModeSwitcherProps) => {
  return (
    <label
      role="checbox"
      htmlFor="checkbox"
      className={`dark:${props.leftColor} ${props.rightColor}  w-14 h-7 rounded-full absolute ${props.distanceFromRight} ${props.distanseFromTop} ${props.distanseFromBottom} ${props.distanseFromLeft} transition-all duration-500 cursor-pointer border-2 box-content`}
    >
      {props.leftIcon}
      {props.rightIcon}
      <input
        role="switch"
        type="checkbox"
        onChange={props.themeChanger}
        id="checkbox"
        className="sr-only peer"
      />
      <Span />
    </label>
  )
}

export default ModeSwitcher
