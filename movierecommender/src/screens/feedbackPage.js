import {React, useEffect, useState} from 'react';
import '../App.css';
import styles from '../styles/feedbackPage.module.css';

function FeedbackPage() {
    useEffect(() => {
        document.title = 'Feedback';
        document.body.classList.add('BodyBackground');
    return () => {
      document.body.classList.remove('BodyBackground');
    };
    }, []);
    return (
        <div>
            <h1 className={styles.h1}>Now that you've seen the movie...</h1>
            <slider />
        </div>
    );
}

export default FeedbackPage;