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
    <div style={{}}>
    <form className={styles.form}>
      <TransparentInput name='username/email' placeholder='Username or Email' />
      <TransparentInput name='password' type='password' placeholder='Password' />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '16px'}}>
      <PrettyButton text='Login' width='110px' height='40px' fontSize='12px' color='#A7C7E7' onClick={goToHome}/>
      <PrettyButton text='Sign up' width='110px' height='40px' fontSize='12px' color='#A7C7E7' onClick={goToSignUp}/>
      </div>
    </form>
    </div>
  );
}

export default LoginForm;