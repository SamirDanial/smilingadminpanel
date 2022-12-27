import { render, screen, fireEvent } from '@testing-library/react'
import ButtonSmall from '../ButtonSmall'

type ButtonProps = {
  id?: string
  btnText?: string
  textColor?: string
  hoverTextColor?: string
  bgColor?: string
  borderColor?: string
  wrapperMt?: string
  px?: string
  py?: string
  click?: React.MouseEventHandler<HTMLDivElement> | undefined
  width?: string
  height?: string
  type?: 'button' | 'reset' | 'submit' | undefined
}

const MockButtonSmall = (props: ButtonProps) => (
  <ButtonSmall btnText={props.btnText} click={props.click} />
)

describe('ButtonSmall Testing Functionality', () => {
  it('check if button exist', async () => {
    render(<MockButtonSmall btnText="Test Button" />)

    const button = screen.getByText(/Test Button/i)

    expect(button).toBeInTheDocument()
  })

  it('check if button is clickable', async () => {
    const click = jest.fn()
    render(<MockButtonSmall btnText="Test Button" click={click} />)

    const button = screen.getByText(/Test Button/i)

    fireEvent.click(button)
    expect(click.mock.calls.length).toEqual(1)
  })
})
