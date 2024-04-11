import {React, useEffect} from 'react';
import '../App.css';
import styles from '../styles/emotionsPage.module.css';
import TransparentInput from '../components/transparentInput';


function EmotionsPage() {
  useEffect(() => {
    document.title = 'Feelings';
    document.body.classList.add('BodyBackground');
    return () => {
      document.body.classList.remove('BodyBackground');
    };
    }, []);
    return (
        <div className={styles.inputField}>
            <h1 className={styles.h1}>Tell us how you're feeling</h1>
            <TransparentInput className={styles.inputField} placeholder="I'm feeling..." />
        </div>
    );
}

export default EmotionsPage;