import { render, screen } from '@testing-library/react'
import Blobs from '../Blobs'

test('renders the Blobs', () => {
  render(<Blobs />)
  const linkElement = screen.getByRole(/GeneralBlobs/i)
  expect(linkElement).toBeInTheDocument()
})
