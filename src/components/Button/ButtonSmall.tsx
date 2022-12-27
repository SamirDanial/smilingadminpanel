import React from 'react'
import { ButtonWrapper, ButtonBlockSmall } from '../../styles/globals.styles'

type ButtonProps = {
  id?: string
  btnText?: string
  textColor?: string
  hoverTextColor?: string
  bgColor?: string
  borderColor?: string
  hoverBorder?: string
  hoverBg?: string
  wrapperMt?: string
  px?: string
  py?: string
  click?: React.MouseEventHandler<HTMLDivElement> | undefined
  width?: string
  height?: string
  type?: 'button' | 'reset' | 'submit' | undefined
  borderInDarkMode?: string
}

const ButtonSmall = (props: ButtonProps) => {
  return (
    <ButtonWrapper
      role="GeneralButton"
      className={`${props.wrapperMt}`}
      onClick={props.click}
    >
      <ButtonBlockSmall
        role="ButtonBlock"
        type={props.type}
        className={`${props.textColor} ${props.borderInDarkMode} ${props.hoverBorder} ${props.hoverBg} ${props.bgColor} ${props.hoverTextColor} ${props.borderColor} ${props.px} ${props.py} ${props.width} ${props.height}`}
      >
        {props.btnText}
      </ButtonBlockSmall>
    </ButtonWrapper>
  )
}

export default ButtonSmall
