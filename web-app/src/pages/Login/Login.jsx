import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const onButtonClick = () => {
    setEmailError('');
    setPasswordError('');

    if (email === '') {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    onLogin(true);
    navigate('/homepage');
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <img src='/Logo.svg' alt='logo' className={styles.logoClass} />
      </div>
      <br />
      <div className={styles.inputParentContainer}>
        <img src='/User.svg' alt='user icon' className={styles.inputIconClass} />
        <span className={styles.inputGap}></span>
        <div className={styles.inputContainer}>
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={styles.inputBox}
          />
        </div>
      </div>
      <div className={styles.emailError}>
        <label className={styles.errorLabel}>{emailError}</label>
      </div>
      <br />
      <div className={styles.inputParentContainer}>
        <img src='/Key.svg' alt='key icon' className={styles.inputIconClass} />
        <span className={styles.inputGap}></span>
        <div className={styles.inputContainer}>
          <input
            type='password'
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={styles.inputBox}
          />
          <label className={styles.errorLabel}>{passwordError}</label>
        </div>
      </div>
      <br />
      <div className={styles.forgotPasswordClass}>Forgot Password?</div>
      <br />
      <div className={styles.inputContainer}>
        <input className={styles.loginBtn} type="button" onClick={onButtonClick} value='Log in' />
      </div>
    </div>
  );
};

export default Login;
