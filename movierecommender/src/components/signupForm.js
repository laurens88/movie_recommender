import React from 'react';
import TransparentInput from './transparentInput';
import styles from '../styles/form.module.css';
import { useNavigate } from 'react-router-dom';
import PrettyButton from './prettyButton';
import axios from "axios";

function SignupForm() {
    let navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleSignUp = async () => {
        console.log('Signing up...');
        console.log(password);
        console.log(repeatPassword);
        if (password !== repeatPassword) {
            setErrorMessage('Passwords do not match');
            console.log(name);
            console.log(username);
            console.log(email);
            console.log(password);
            console.log(repeatPassword);
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/users', {
                username,
                password,
                email,
                firstName: name,
            });
            console.log('Sign up successful:', response.data);
            navigate('/login');
            // Handle successful sign-in (e.g., redirect user)
        } catch (error) {
            if (error.response) {
                console.error('Sign in failed:', error.response.data);
            } else {
                console.error('Error signing in:', error.message);
            }
            navigate('/signup');
            // Handle sign-in error (e.g., display error message)
        }
    };

  function goToHome() {
    navigate('/home');
  }
    return (
        <>
            <form className={styles.form}>
                <TransparentInput name='name' placeholder='First name' value={name}
                                  onChange={(e) => setName(e.target.value)}/>
                <TransparentInput name='username' placeholder='Username' value={username}
                                  onChange={(e) => setUsername(e.target.value)}/>
                <TransparentInput name='email' placeholder='Email' value={email}
                                  onChange={(e) => setEmail(e.target.value)}/>
                <TransparentInput name='password' type='password' placeholder='Password' value={password}
                                  onChange={(e) => setPassword(e.target.value)}/>
                <TransparentInput name='repeatpassword' type='password' placeholder='Repeat password'
                                  value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
                {errorMessage && <p>{errorMessage}</p>}
                <PrettyButton text='Sign up' width='110px' height='40px' fontSize='12px' color='#3742A2'
                              onClick={handleSignUp}/>

            </form>
        </>
    );
}

export default SignupForm;