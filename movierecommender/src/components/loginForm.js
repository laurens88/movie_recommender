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
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/signin', {
        username,
        password,
      });
      console.log('Sign in successful:', response.data);
      localStorage.setItem('token', response.data.token);
      // I need here a popup that say please wait while we are redirecting you to the home page

      navigate('/home');
      // Handle successful sign-in (e.g., redirect user)
    } catch (error) {
      if (error.response) {
        console.error('Sign in failed:', error.response.data);
        setErrorMessage("Invalid username or password. Please try again.")
      } else {
        console.error('Error signing in:', error.message);
        setErrorMessage("There was an error signing in. Please try again.")
      }
      // navigate('/login');
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

        <TransparentInput name='username/email' placeholder='Username or Email' value={username}
                          onChange={(e) => setUsername(e.target.value)}/>
        <TransparentInput name='password' type='password' placeholder='Password' value={password}
                          onChange={(e) => setPassword(e.target.value)}/>
        <div style={{display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '16px'}}>
          <PrettyButton text='Login' width='110px' height='40px' fontSize='12px' color='#A7C7E7'
                        onClick={handleSignIn}/>
          <PrettyButton text='Sign up' width='110px' height='40px' fontSize='12px' color='#A7C7E7'
                        onClick={goToSignUp}/>
        </div>
        <div>
          {isLoading && <div>Please wait while we are redirecting you to the home page...</div>}
          {/* rest of the JSX */}
        </div>
        <div>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;