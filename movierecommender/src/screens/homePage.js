import {React, useEffect} from "react";
import MovieRow from "../components/movieRow";
import styles from '../styles/homePage.module.css';
import "../App.css";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const { token, isValid } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {

        if (!isValid) {
            console.log(token);
            console.log('Invalid token');
            navigate('/login');
        }
        document.title = 'Movie Recommender';
        document.body.classList.add('BodyBackground');

        return () => {
            document.body.classList.remove('BodyBackground');
        };
    }, []);
    return (
        <div>
        <h1 className={styles.h1}>Welcome, {token.firstName}</h1>
        <button className={styles.button}>Find your next movie</button>
        <MovieRow title="Favorites" />
        <MovieRow title="My list" />
        <MovieRow title="Watched before" />
        </div>
    );
    }

export default HomePage;