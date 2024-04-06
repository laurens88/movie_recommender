import {React, useEffect} from 'react';
import '../App.css';

function CategoriesPage() {
    useEffect(() => {
        document.title = 'Categories';
        document.body.classList.add('BodyBackground');
    return () => {
      document.body.classList.remove('BodyBackground');
    };
    }, []);
    return (
        <div>
            <h1>Categories</h1>
        </div>
    );
}

export default CategoriesPage;