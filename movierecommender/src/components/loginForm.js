import {React, useEffect} from 'react';
import styles from '../styles/loginForm.module.css';

function LoginForm() {
  useEffect(() => {
    document.title = 'Login';
  }, []);  

  return (
    <form className={styles.loginForm}>
      <label>
        Username or Email:
        <input type="text" name="username/email" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;