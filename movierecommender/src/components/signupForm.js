import React from 'react';
import TransparentInput from './transparentInput';
import styles from '../styles/form.module.css';
import { useNavigate } from 'react-router-dom';
import PrettyButton from './prettyButton';

function SignupForm() {
    let navigate = useNavigate();

  function goToHome() {
    navigate('/home');
  }
    return (
    <>
    <form className={styles.form}>
        <TransparentInput name='name' placeholder='First name' />
        <TransparentInput name='username' placeholder='Username' />
        <TransparentInput name='email' placeholder='Email' />
        <TransparentInput name='password' type='password' placeholder='Password' />
        <TransparentInput name='repeatpassword' type='password' placeholder='Repeat password' />
        <PrettyButton text='Sign up' width='110px' height='40px' fontSize='12px' color='#A7C7E7' onClick={goToHome}/>
    </form>
    </>
    );
}

export default SignupForm;