import { fireEvent, render, screen } from '@testing-library/react'
import RadioButton from '../RadioButton'

type RadioButtonProps = {
  id?: string
  name?: string
  checked?: boolean | undefined
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
  value?: string
  label?: string
}

const MockRadioButton = (props: RadioButtonProps) => (
  <RadioButton
    onChange={props.onChange}
    label={props.label}
    name={props.name}
    value={props.value}
  />
)

describe('RadioButton testing functionality', () => {
  it('check of radio button exist', async () => {
    render(<MockRadioButton label="Test" name="Test" value="Test" />)
    const radioButton = screen.getByRole('radio')
    expect(radioButton).toBeInTheDocument()
  })
  it('test clicking on radio button', async () => {
    const click = jest.fn()
    render(
      <MockRadioButton
        label="Test"
        name="Test"
        value="Test"
        onChange={click}
      />,
    )
    const radioButton = screen.getByRole('radio')

    fireEvent.click(radioButton)
    expect(click.mock.calls.length).toEqual(1)
  })
})
