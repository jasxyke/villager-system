import React, { useState } from 'react'
import "./Login.css"
// import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // const navigate = useNavigate()

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')

    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <img src='/login/Logo.svg' alt='logo' className='logoClass' />
      </div>
      <br />
      <div className='inputParentContainer'>
        <img src='/login/User.svg' alt='logo' className='inputIconClass' />
        <span className='inputGap'></span>
        <div className={'inputContainer'}>
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={'inputBox'}
          />

        </div>
      </div>
      <div className='email-error'>  <label className="errorLabel">{emailError}</label></div>
      <br />
      <div className='inputParentContainer'>
        <img src='/login/Key.svg' alt='logo' className='inputIconClass' />
        <span className='inputGap'></span>
        <div className={'inputContainer'}>
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
      </div>
      <br />
      <div className='forgotPasswordClass'>Forgot Password?</div>
      <br />
      <div className={'inputContainer'}>
        <input className={'loginBtn'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default Login