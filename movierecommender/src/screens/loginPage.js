import {React, useEffect} from "react";
import LoginForm from "../components/loginForm";
import styles from "../styles/loginPage.module.css";
import '../App.css';

function LoginPage() {
  useEffect(() => {
    document.title = 'Login';
    document.body.classList.add('BodyBackground');
    return () => {
      document.body.classList.remove('BodyBackground');
    };
  }, []); 
  return (
    <div>
      <h1 className={styles.h1}>Welcome</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;