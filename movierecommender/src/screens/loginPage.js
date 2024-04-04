import {React, useEffect} from "react";
import LoginForm from "../components/loginForm";
import styles from "../styles/loginPage.module.css";

function LoginPage() {
  useEffect(() => {
    document.title = 'Login';
  }, []); 
  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>Welcome</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;