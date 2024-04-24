import React, { useEffect, useState} from 'react';
import '../App.css';
import styles from '../styles/categoriesPage.module.css';
import PrettyButton from '../components/prettyButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

// Inside your component

function CategoriesPage() {
    let navigate = useNavigate();
    const location = useLocation();
    const prompt = location.state.prompt;
    const [selectedCategories, setSelectedCategories] = useState([]);

    function goToRecommendationsPage() {
        // console.log(selectedCategories)
        navigate('/recommendations', {state: {prompt: prompt, categories: selectedCategories}});
    }

    useEffect(() => {
        document.title = 'Categories';
        document.body.classList.add('BodyBackground');
    return () => {
      document.body.classList.remove('BodyBackground');
    };
    }, []);
    return (
        <div>
            <h1 className={styles.h1}>Which of these categories do you like?</h1>
            <h2 className={styles.h2}>Select at least one</h2>
            <Grid container spacing={2} justifyContent="center">
            <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
            <Tooltip title="Movies such as: " placement='bottom'>
            <PrettyButton
                text="Uplifting"
                width='min(30vw, 200px)'
                height='min(25vw, 150px)'
                fontSize='min(4vw, 25px)'
                onClick={() => setSelectedCategories([...selectedCategories, 'Uplifting'])}
            />
            </Tooltip>
            </Grid>

            <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
            <PrettyButton 
                text="Inspiring"
                width='min(30vw, 200px)'
                height='min(25vw, 150px)'
                fontSize='min(4vw, 25px)'
                onClick={() => setSelectedCategories([...selectedCategories, 'Inspiring'])}
            />
            </Grid>

            <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
            <PrettyButton 
                text="Hopeful"
                width='min(30vw, 200px)'
                height='min(25vw, 150px)'
                fontSize='min(4vw, 25px)'
                onClick={() => setSelectedCategories([...selectedCategories, 'Hopeful'])}
            />
            </Grid>

            <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
            <PrettyButton 
                text="Sad"
                width='min(30vw, 200px)'
                height='min(25vw, 150px)'
                fontSize='min(4vw, 25px)'
                onClick={() => setSelectedCategories([...selectedCategories, 'Sad'])}
            />
            </Grid>

            <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
            <PrettyButton 
                text="Informative"
                width='min(30vw, 200px)'
                height='min(25vw, 150px)'
                fontSize='min(4vw, 25px)'
                onClick={() => setSelectedCategories([...selectedCategories, 'Informative'])}
            />
            </Grid>

            <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
            <PrettyButton 
                text="Character growth"
                width='min(30vw, 200px)'
                height='min(25vw, 150px)'
                fontSize='min(4vw, 25px)'
                onClick={() => setSelectedCategories([...selectedCategories, 'Character growth'])}
            />
            </Grid>
            </Grid>

            <div className={styles.buttonContainer}>
            <PrettyButton text='No preference' width='min(30vw, 200px)' height='min(25vw, 75px)' fontSize='min(4vw, 25px)' color='#3742A2'  onClick={() => setSelectedCategories([])}/>
            <PrettyButton text='Next' width='min(30vw, 200px)' height='min(25vw, 75px)' fontSize='min(4vw, 25px)' onClick={goToRecommendationsPage}/>
            </div>
        </div>
    );
}

export default CategoriesPage;