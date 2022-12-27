import { useEffect } from 'react'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AdminRoutes from './adminRoutes'
import { useDispatch, useSelector } from 'react-redux'
import ApplicationWideMessage from './utils/ApplicationWideMessage/ApplicationWideMessage'
import { appWideActions } from './store/applicationWide.slice'
import { authActions } from './store/auth.slice'

import { LoginForm, NotFound, DashboardTemplate } from './pages'
import { IState } from './interfaces/state.interface'
import ApplicationWideDetail from './utils/ApplicationWideDetail/ApplicationWideDetail'

const client = new ApolloClient({
  link: createHttpLink({
    uri: `${process.env.REACT_APP_BACKEND}/graphql`,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
})

function App() {
  const appWideState = useSelector((state: IState) => state.appWide)
  const appWideDetailState = useSelector((state: IState) => state.appWideDetail)
  const isAuth = useSelector((state: IState) => state.auth.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const auth = localStorage.getItem('auth')?.toString()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const auth =
    localStorage &&
    localStorage.getItem('auth') !== null &&
    localStorage.getItem('auth') !== undefined
      ? localStorage.getItem('auth')?.toString()
      : ''

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      const darkTheme = window.matchMedia('(prefers-color-scheme: dark)')
      if (darkTheme.matches) {
        document.documentElement.classList.add('dark')
      }
    }
    if (localStorage.getItem('theme')) {
      if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.add('light')
      }
    }
  }, [])

  useEffect(() => {
    if (auth === 'authenticated') {
      dispatch(authActions.login())
    }
  }, [auth, dispatch, navigate])

  useEffect(() => {
    if (appWideState.show) {
      setTimeout(() => {
        dispatch(appWideActions.hideMessage())
      }, 3000)
    }
  }, [dispatch, appWideState.show])

  return (
    <div role="application">
      <ApolloProvider client={client}>
        {appWideState.show && (
          <ApplicationWideMessage
            fromTop={appWideState.fromTop}
            message={appWideState.message}
            textColor={appWideState.textColor}
            secondaryMessage={appWideState.secondaryMessage}
            status={appWideState.status}
          />
        )}
        {appWideDetailState && appWideDetailState.show && (
          <ApplicationWideDetail tableData={appWideDetailState.tableData} />
        )}
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route element={<AdminRoutes isAuthen={isAuth} />}>
            <Route path="/dashboard/*" element={<DashboardTemplate />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ApolloProvider>
    </div>
  )
}

export default App
