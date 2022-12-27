import { render, screen } from '@testing-library/react'
import { Logo } from '../Logo'

test('renders the Logo', () => {
  render(<Logo />)
  const linkElement = screen.getByRole(/logo/i)
  expect(linkElement).toBeInTheDocument()
})
