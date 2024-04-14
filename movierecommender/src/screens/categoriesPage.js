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
            <h3 className={styles.h3}>Select at least one</h3>
            <Grid container spacing={4}>
            <Grid item xs={4}>
            <Tooltip title="Movies such as: " placement='bottom'>
            <PrettyButton
                text="Uplifting"
                width='200px' 
                height='150px' 
                fontSize='25px' 
                color="#A7C7E7"
            />
            </Tooltip>
            </Grid>

            <Grid item xs={4}>
            <PrettyButton 
                text="Inspiring"
                width='200px' 
                height='150px' 
                fontSize='25px' 
                color="#A7C7E7"
            />
            </Grid>

            <Grid item xs={4}>
            <PrettyButton 
                text="Hopeful"
                width='200px' 
                height='150px' 
                fontSize='25px' 
                color="#A7C7E7"
            />
            </Grid>

            <Grid item xs={4}>
            <PrettyButton 
                text="Sad"
                width='200px' 
                height='150px' 
                fontSize='25px' 
                color="#A7C7E7"
            />
            </Grid>

            <Grid item xs={4}>
            <PrettyButton 
                text="Informative"
                width='200px' 
                height='150px' 
                fontSize='25px' 
                color="#A7C7E7"
            />
            </Grid>

            <Grid item xs={4}>
            <PrettyButton 
                text="No preference"
                width='200px' 
                height='150px' 
                fontSize='25px' 
                color="#3742A2"
            />
            </Grid>
            </Grid>
            
        </div>
    );
}

export default CategoriesPage;