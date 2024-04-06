import {React, useEffect} from 'react';
import '../App.css';
import styles from '../styles/emotionsPage.module.css';


function EmotionsPage() {
  useEffect(() => {
    document.title = 'Feelings';
    document.body.classList.add('BodyBackground');
    return () => {
      document.body.classList.remove('BodyBackground');
    };
    }, []);
    return (
        <div>
            <h1 className={styles.h1}>How do you feel</h1>
        </div>
    );
}

export default EmotionsPage;