import React from 'react'
import {
  ButtonWrapper,
  ButtonBlockWithoutHover,
} from '../../styles/globals.styles'

type ButtonProps = {
  btnText?: string
  textColor?: string
  bgColor?: string
  wrapperMt?: string
  px?: string
  py?: string
  click?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const ButtonWithoutHoverEffect = (props: ButtonProps) => {
  return (
    <ButtonWrapper
      role="GeneralButton"
      className={`${props.wrapperMt}`}
      onClick={props.click}
    >
      <ButtonBlockWithoutHover
        role="ButtonBlock"
        className={`${props.textColor} ${props.bgColor} ${props.px} ${props.py}`}
      >
        {props.btnText}
      </ButtonBlockWithoutHover>
    </ButtonWrapper>
  )
}

export default ButtonWithoutHoverEffect
