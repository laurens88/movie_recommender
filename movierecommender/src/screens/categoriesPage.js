import {React, useEffect} from 'react';
import '../App.css';
import styles from '../styles/categoriesPage.module.css';
import PrettyButton from '../components/prettyButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';

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
            <h2 className={styles.h2}>Select at least one</h2>
            <Grid container spacing={4} justifyContent="center">
            <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
            <Tooltip title="Movies such as: " placement='bottom'>
            <PrettyButton
                text="Uplifting"
                width='min(30vw, 200px)'
                height='min(25vw, 150px)'
                fontSize='min(4vw, 25px)' 
                color="#A7C7E7"
            />
            </Tooltip>
            </Grid>

            <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
            <PrettyButton 
                text="Inspiring"
                width='min(30vw, 200px)'
                height='min(25vw, 150px)'
                fontSize='min(4vw, 25px)' 
                color="#A7C7E7"
            />
            </Grid>

            <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
            <PrettyButton 
                text="Hopeful"
                width='min(30vw, 200px)'
                height='min(25vw, 150px)'
                fontSize='min(4vw, 25px)' 
                color="#A7C7E7"
            />
            </Grid>

            <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
            <PrettyButton 
                text="Sad"
                width='min(30vw, 200px)'
                height='min(25vw, 150px)'
                fontSize='min(4vw, 25px)' 
                color="#A7C7E7"
            />
            </Grid>

            <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
            <PrettyButton 
                text="Informative"
                width='min(30vw, 200px)'
                height='min(25vw, 150px)'
                fontSize='min(4vw, 25px)' 
                color="#A7C7E7"
            />
            </Grid>

            <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
            <PrettyButton 
                text="Character growth"
                width='min(30vw, 200px)'
                height='min(25vw, 150px)'
                fontSize='min(4vw, 25px)' 
                color="#A7C7E7"
            />
            </Grid>
            </Grid>

            <div className={styles.buttonContainer}>
            <PrettyButton text='No preference' width='min(30vw, 200px)' height='min(25vw, 75px)' fontSize='min(4vw, 25px)' color='#3742A2' link='/emotions'/>
            <PrettyButton text='Next' width='min(30vw, 200px)' height='min(25vw, 75px)' fontSize='min(4vw, 25px)' color='#A7C7E7' link='/emotions'/>
            </div>
        </div>
    );
}

export default CategoriesPage;