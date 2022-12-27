import { render, screen } from '@testing-library/react'
import Landing from '../Landing'
import { useSelector, useDispatch } from 'react-redux'
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}))

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}))

const client = new ApolloClient({
  link: createHttpLink({
    uri: `${process.env.REACT_APP_BACKEND}/graphql`,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
})

test('renders the Landing', () => {
  render(
    <ApolloProvider client={client}>
      <Landing />
    </ApolloProvider>,
  )
  const linkElement = screen.getByRole(/landing/i)
  expect(linkElement).toBeInTheDocument()
})
