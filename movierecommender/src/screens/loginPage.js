import {React, useEffect} from "react";
import LoginForm from "../components/loginForm";
import styles from "../styles/loginPage.module.css";
import '../App.css';
import '../logo.svg';
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const { token, isValid } = useAuth();
    let navigate = useNavigate();


  useEffect(() => {
if (isValid && token) {
      console.log(token);
      console.log('Valid token');
      navigate('/home');
    }
    document.title = 'Login';
    document.body.classList.add('BodyBackground');
    return () => {
      document.body.classList.remove('BodyBackground');
    };
  }, [isValid, token]);
  return (
    <div>
      <div className={styles.logoContainer}>
      <img src='../logo.svg' alt="Logo" />
      </div>
      <h1 className={styles.h1}>Movie Recommender</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;