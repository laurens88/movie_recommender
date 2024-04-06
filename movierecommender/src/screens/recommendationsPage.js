import {React, useEffect} from 'react';
import '../App.css';

function RecommendationsPage() {
    useEffect(() => {
        document.title = 'Recommendations';
        document.body.classList.add('BodyBackground');
    return () => {
      document.body.classList.remove('BodyBackground');
    };
    }, []);
    return (
        <div>
            <h1>Movies we believe you may like</h1>
        </div>
    );
}

export default RecommendationsPage;