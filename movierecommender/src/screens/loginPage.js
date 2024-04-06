import {React, useEffect} from "react";
import LoginForm from "../components/loginForm";
import styles from "../styles/loginPage.module.css";
import '../App.css';
import '../logo.svg';

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
      <img src="/logo.svg" style={{ width: '200px', height: '200px', paddingLeft: '43.5vw', paddingTop: '10vh'}}/>
      <h1 className={styles.h1}>Movie Recommender</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;