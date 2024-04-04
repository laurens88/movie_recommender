import {React, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/loginForm.module.css';
import TransparentInput from './transparentInput';

function LoginForm() { 
  let navigate = useNavigate();

  function goToSignUp() {
    navigate('/signup');
  }

  function goToHome() {
    navigate('/home');
  }
  return (
    <>
    <form className={styles.form}>
      <label>
        {/* <input className={styles.transparent_input} type="text" name="username/email" placeholder='Username or Email' /> */}
        <TransparentInput name='username/email' placeholder='Username or Email' />
      </label>
      <label>
        <TransparentInput name='password' type='password' placeholder='Password' />
      </label>
      <button className={styles.buttons} onClick={goToHome} type="submit">Login</button>
      <button className={styles.buttons} onClick={goToSignUp} type="button">Sign up</button>
    </form>
    
    </>
  );
}

export default LoginForm;