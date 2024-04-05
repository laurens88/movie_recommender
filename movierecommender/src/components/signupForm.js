import React, { useEffect } from 'react';
import TransparentInput from './transparentInput';
import styles from '../styles/form.module.css';
import { useNavigate } from 'react-router-dom';

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
        <button className={styles.centerButton} onClick={goToHome} type="submit">Sign Up</button>
    </form>
    </>
    );
}

export default SignupForm;