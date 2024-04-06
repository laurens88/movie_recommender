import {React, useEffect, useState} from 'react';
import '../App.css';

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
            <h1>Feedback</h1>
        </div>
    );
}

export default FeedbackPage;