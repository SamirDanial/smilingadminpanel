import { ButtonBlock, ButtonWrapper } from '../../styles/globals.styles'

type ButtonProps = {
  btnText?: string
  textColor?: string
  bgColor?: string
  wrapperMt?: string
  type?: 'button' | 'reset' | 'submit' | undefined
  px?: string
  py?: string
  click?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const Button = (props: ButtonProps) => {
  return (
    <ButtonWrapper
      role="GeneralButton"
      className={`${props.wrapperMt}`}
      onClick={props.click}
    >
      <ButtonBlock
        role="ButtonBlock"
        type={props.type}
        className={`${props.textColor} ${props.bgColor} ${props.px} ${props.py}`}
      >
        {props.btnText}
      </ButtonBlock>
    </ButtonWrapper>
  )
}

export default Button
