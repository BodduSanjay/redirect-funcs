import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  onSubmitSuccess = jwtTokenVal => {
    Cookies.set('jwt_token', jwtTokenVal, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  loginSample = async () => {
    const response = await fetch('https://apis.ccbp.in/login')
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <h1>Please Login</h1>
        <button type="button" onClick={this.loginSample}>
          Login with Sample Creds
        </button>
      </div>
    )
  }
}

export default Login
