import { Outlet } from 'react-router-dom'
import Login from './pages/Login/Login'

const useAuth = (isAuth: boolean) => {
  const admin = { loggedIn: isAuth }
  return admin && admin.loggedIn
}

const ProtectedRoutes = (props: { isAuthen: boolean }) => {
  const isAuth = useAuth(props.isAuthen)
  return isAuth ? <Outlet /> : <Login />
}

export default ProtectedRoutes
