import { render, screen, fireEvent } from '@testing-library/react'
import ButtonWithoutHoverEffect from '../ButtonWithoutHoverEffect'

type ButtonProps = {
  btnText?: string
  textColor?: string
  bgColor?: string
  wrapperMt?: string
  px?: string
  py?: string
  click?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const MockButtonWithoutHoverEffect = (props: ButtonProps) => (
  <ButtonWithoutHoverEffect btnText={props.btnText} click={props.click} />
)

describe('Button Testing Functionality', () => {
  it('check if button exist', async () => {
    render(<MockButtonWithoutHoverEffect btnText="Test Button" />)

    const button = screen.getByText(/Test Button/i)

    expect(button).toBeInTheDocument()
  })

  it('check if button is clickable', async () => {
    const click = jest.fn()
    render(<MockButtonWithoutHoverEffect btnText="Test Button" click={click} />)

    const button = screen.getByText(/Test Button/i)

    fireEvent.click(button)
    expect(click.mock.calls.length).toEqual(1)
  })
})
