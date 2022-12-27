import { fireEvent, render, screen } from '@testing-library/react'
import { ChangeEventHandler, ReactElement } from 'react'
import ModeSwitcher from '../ModeSwitcher'

type ModeSwitcherProps = {
  themeChanger?: ChangeEventHandler<HTMLInputElement> | undefined
  leftIcon?: ReactElement
  rightIcon?: ReactElement
  leftColor?: string
  rightColor?: string
  distanceFromRight?: string
  distanseFromTop?: string
  darkMode?: boolean
}

const MockModeSwitcher = (props: ModeSwitcherProps) => (
  <ModeSwitcher themeChanger={props.themeChanger} />
)

describe('ModeSwitcher testing functionality', () => {
  test('render Mode Switcher', async () => {
    render(<MockModeSwitcher />)

    const switcher = screen.getByRole(/checbox/!)

    expect(switcher).toBeInTheDocument()
  })

  test('changing mode of ModeSwitch', async () => {
    const changeMode = jest.fn()
    render(<MockModeSwitcher themeChanger={changeMode} />)

    const switcher = screen.getByRole(/checbox/!)

    fireEvent.click(switcher)
    expect(changeMode.mock.calls.length).toEqual(1)
  })
})
