import { fireEvent, render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import Select from '../Select'

type Option = {
  name: string
  value: string
}

type SelectProp = {
  labelText?: string
  id?: string
  name?: string
  placeholder?: string
  value?: string | number | readonly string[] | undefined
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined
  onBlur?: React.FocusEventHandler<HTMLSelectElement> | undefined
  text?: string
  required?: boolean
  icon?: ReactNode
  error?: string
  touch?: boolean
  width?: string
  height?: string
  activeValue?: string
  options?: Option[]
}

const MockSelect = (props: SelectProp) => (
  <Select
    labelText={props.labelText}
    onChange={props.onChange}
    onBlur={props.onBlur}
    options={props.options}
  />
)

describe('Select testing functionality', () => {
  it('check if select is exist in the dom', async () => {
    render(
      <MockSelect
        options={[
          { name: 'test1', value: 'test1' },
          { name: 'test2', value: 'test2' },
        ]}
      />,
    )

    const selectElement = screen.getByRole(/select/i)
    expect(selectElement).toBeInTheDocument()
  })

  it('testing selection an item', async () => {
    const selectFn = jest.fn()
    render(
      <MockSelect
        onChange={selectFn}
        options={[
          { name: 'test1', value: 'test1' },
          { name: 'test2', value: 'test2' },
        ]}
      />,
    )

    const selectElement = screen.getByRole(/select/i)
    fireEvent.change(selectElement)

    expect(selectFn.mock.calls.length).toEqual(1)
  })
})
