import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/form.module.css';
import TransparentInput from './transparentInput';
import PrettyButton from './prettyButton';

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
      <PrettyButton text='Login' width='110px' height='40px' fontSize='12px' color='#3742A2' onClick={goToHome}/>
      <PrettyButton text='Sign up' width='110px' height='40px' fontSize='12px' color='#3742A2' onClick={goToSignUp}/>
    </form>
    </>
  );
}

export default LoginForm;