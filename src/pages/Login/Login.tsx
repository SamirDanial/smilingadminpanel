import { FormAndBlobsWrapper } from './components/styles/Login.styles'
import Blobs from './components/Blobs/Blobs'
import LoginFrom from './components/LoginForm/LoginForm'

const Login = () => {
  return (
    <FormAndBlobsWrapper role="GeneralForm">
      <LoginFrom />
      <Blobs />
    </FormAndBlobsWrapper>
  )
}

export default Login
