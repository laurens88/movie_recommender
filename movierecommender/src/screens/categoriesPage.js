import {React, useEffect} from 'react';
import '../App.css';
import styles from '../styles/categoriesPage.module.css';
import PrettyButton from '../components/prettyButton';
import { useAuth } from '../contexts/AuthContext';



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
            <h1 className={styles.h1}>Which if these categories do you like?</h1>
            <PrettyButton 
                text="Insightful"
                width='200px' 
                height='150px' 
                fontSize='25px' 
                color="#3742A2"
            />
            <PrettyButton 
                text="Informative"
                width='200px' 
                height='150px' 
                fontSize='25px' 
                color="#3742A2"
            />
            <PrettyButton 
                text="Sad"
                width='200px' 
                height='150px' 
                fontSize='25px' 
                color="#3742A2"
            />
            <PrettyButton 
                text="No preference"
                width='200px' 
                height='150px' 
                fontSize='25px' 
                color="#3742A2"
            />
            
        </div>
    );
}

export default CategoriesPage;