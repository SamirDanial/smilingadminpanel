import { render, screen } from '@testing-library/react'
import Template from '../Template'
import { Provider } from 'react-redux'
import store from '../../../../../store/configureStore'
import { BrowserRouter as Router } from 'react-router-dom'

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'

const client = new ApolloClient({
  link: createHttpLink({
    uri: `${process.env.REACT_APP_BACKEND}/graphql`,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
})

test('renders the Template', () => {
  render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <Template />
        </Router>
      </Provider>
    </ApolloProvider>,
  )
  const linkElement = screen.getByRole(/template/i)
  expect(linkElement).toBeInTheDocument()
})
