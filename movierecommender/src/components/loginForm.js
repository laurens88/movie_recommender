import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/form.module.css';
import TransparentInput from './transparentInput';
import PrettyButton from './prettyButton';
import axios from "axios";

function LoginForm() { 
  let navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/signin', {
        username,
        password,
      });
      console.log('Sign in successful:', response.data);
      localStorage.setItem('token', response.data.token);
        navigate('/home');
      // Handle successful sign-in (e.g., redirect user)
    } catch (error) {
      if (error.response) {
        console.error('Sign in failed:', error.response.data);
      } else {
        console.error('Error signing in:', error.message);
      }
      navigate('/login');
      // Handle sign-in error (e.g., display error message)
    }
  };

  function goToSignUp() {
    navigate('/signup');
  }

  function goToHome() {
    navigate('/home');
  }
  return (
    <div style={{}}>
    <form className={styles.form}>
      <TransparentInput name='username' placeholder='Username or Email' value={username} onChange={(e) => setUsername(e.target.value)} />
      <TransparentInput name='password' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '16px'}}>
      <PrettyButton text='Login' width='110px' height='40px' fontSize='12px' color='#A7C7E7' onClick={handleSignIn}/>
      <PrettyButton text='Sign up' width='110px' height='40px' fontSize='12px' color='#A7C7E7' onClick={goToSignUp}/>
      </div>
    </form>
    </div>
  );
}

export default LoginForm;