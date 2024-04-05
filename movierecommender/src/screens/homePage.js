import {React, useEffect} from "react";
import MovieRow from "../components/movieRow";
import styles from '../styles/homePage.module.css';
import "../App.css";

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
        <button className={styles.button}>Find your next movie</button>
        <MovieRow title="Favorites" />
        <MovieRow title="My list" />
        <MovieRow title="Watched before" />
        </div>
    );
    }

export default HomePage;