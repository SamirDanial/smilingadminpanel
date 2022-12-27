import { fireEvent, render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import TextArea from '../TextArea'

type TextAreaProp = {
  labelText?: string
  id?: string
  name?: string
  placeholder?: string
  value?: string | number | readonly string[] | undefined
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement> | undefined
  text?: string
  required?: boolean
  icon?: ReactNode
  error?: string
  touch?: boolean
  width?: string
  height?: string
}

const MockTextArea = (props: TextAreaProp) => (
  <TextArea
    labelText={props.labelText}
    placeholder={props.placeholder}
    onChange={props.onChange}
    onBlur={props.onBlur}
  />
)

describe('TextArea testing functionality', () => {
  it('check if textarea exist in the dom', async () => {
    render(<MockTextArea placeholder="Text Area test" />)

    const textAreaElement = screen.getByPlaceholderText('Text Area test')
    expect(textAreaElement).toBeInTheDocument()
  })

  it('check if textarea accept value', async () => {
    const change = jest.fn()
    render(<MockTextArea placeholder="Text Area test" onChange={change} />)

    const textAreaElement: HTMLTextAreaElement =
      screen.getByPlaceholderText('Text Area test')

    fireEvent.change(textAreaElement, { target: { value: 'abcd' } })

    expect(textAreaElement.value).toBe('abcd')
  })
})
