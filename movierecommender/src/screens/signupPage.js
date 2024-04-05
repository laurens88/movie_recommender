import {React, useEffect} from "react";
import SignupForm from "../components/signupForm";
import styles from "../styles/signupPage.module.css";
import '../App.css';

function SignUpPage() {
    useEffect(() => {
        document.title = 'Sign Up';
        document.body.classList.add('BodyBackground');
        return () => {
            document.body.classList.remove('BodyBackground');
        };
    }, []);
  return (
    <div>
      <h1 className={styles.h1}>Create your account</h1>
      <SignupForm />
    </div>
  );
}

export default SignUpPage;