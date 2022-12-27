import { render, screen, fireEvent } from '@testing-library/react'
import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react'
import InputField from '../InputField'

type InputFieldProp = {
  labelText?: string
  id?: string
  name?: string
  placeholder?: string
  value?: string | number | readonly string[] | undefined
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined
  text?: string
  required?: boolean
  icon?: ReactNode
  error?: string
  touch?: boolean
  width?: string
  height?: string
}

const MockInputField = (props: InputFieldProp) => (
  <InputField
    placeholder={props.placeholder}
    error={props.error}
    touch={props.touch}
    onChange={props.onChange}
    onBlur={props.onBlur}
    required={props.required}
  />
)

describe('InputField2 Testing Functionality', () => {
  it('check if input is visible', async () => {
    render(<MockInputField placeholder="testing input" />)

    const inputElement = screen.getByPlaceholderText(/testing input/i)
    expect(inputElement).toBeVisible()
  })

  it('check if input accepts value', async () => {
    const changeValue = jest.fn()
    render(
      <MockInputField placeholder="testing input" onChange={changeValue} />,
    )

    const inputElement: HTMLInputElement =
      screen.getByPlaceholderText(/testing input/i)

    fireEvent.change(inputElement, { target: { value: 'testing data' } })
    expect(inputElement.value).toBe('testing data')
  })

  it('check if a required field does not have any value', async () => {
    const changeValue = jest.fn()
    const blur = jest.fn()
    render(
      <MockInputField
        placeholder="testing input"
        error="testing input is required"
        onChange={changeValue}
        onBlur={blur}
        required={true}
        touch={true}
      />,
    )

    const inputElement: HTMLInputElement =
      screen.getByPlaceholderText(/testing input/i)

    fireEvent.blur(inputElement)

    const errorText = await screen.findByText(/testing input is required/i)
    expect(errorText).toBeInTheDocument()
  })
})
