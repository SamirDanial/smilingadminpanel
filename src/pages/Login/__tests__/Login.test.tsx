import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from '../Login'
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

test('renders the Login', () => {
  render(
    <ApolloProvider client={client}>
      <Login />
    </ApolloProvider>,
  )
  const linkElement = screen.getByRole(/GeneralForm/i)
  expect(linkElement).toBeInTheDocument()
})
