import {React, useEffect} from "react";
import MovieRow from "../components/movieRow";
import styles from '../styles/homePage.module.css';
import "../App.css";
import MovieBlock from "../components/movieBlock";
import PrettyButton from "../components/prettyButton";

function HomePage() {
    useEffect(() => {
        document.title = 'Movie Recommender';
        document.body.classList.add('BodyBackground');

        return () => {
            document.body.classList.remove('BodyBackground');
        };
    }, []);
    return (
        <div>
        <h1 className={styles.h1}>Welcome, </h1>
        <PrettyButton text='Find your next movie' width='110px' height='40px' fontSize='12px' color='#A7C7E7'/>
        <h5 className={styles.h5}>Currently watching...</h5>
        <MovieBlock />
        <h6 className={styles.h6}>Feedback?</h6>

        <MovieRow title="Favorites" />
        <MovieRow title="My list" />
        <MovieRow title="Watched before" />
        </div>
    );
    }

export default HomePage;