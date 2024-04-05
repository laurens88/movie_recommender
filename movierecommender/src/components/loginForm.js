import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/form.module.css';
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
      <TransparentInput name='username/email' placeholder='Username or Email' />
      <TransparentInput name='password' type='password' placeholder='Password' />
      <button className={styles.button} onClick={goToHome} type="submit">Login</button>
      <button className={styles.button} onClick={goToSignUp} type="button">Sign up</button>
    </form>
    </>
  );
}

export default LoginForm;