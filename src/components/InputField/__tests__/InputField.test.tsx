import { render, screen, fireEvent } from '@testing-library/react'
import { ChangeEventHandler, ReactNode } from 'react'
import InputField from '../InputField'

type InputFieldProp = {
  type?: string
  id?: string
  placeholder?: string
  value?: string
  inputChange?: ChangeEventHandler<HTMLInputElement> | undefined
  text?: string
  required?: boolean
  icon?: ReactNode
}

const MockInputField = (props: InputFieldProp) => (
  <InputField
    placeholder={props.placeholder}
    inputChange={props.inputChange}
    required={props.required}
    text={props.text}
    value={props.value}
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
      <MockInputField placeholder="testing input" inputChange={changeValue} />,
    )

    const inputElement: HTMLInputElement =
      screen.getByPlaceholderText(/testing input/i)

    fireEvent.change(inputElement, { target: { value: 'testing data' } })
    expect(inputElement.value).toBe('testing data')
  })
})
