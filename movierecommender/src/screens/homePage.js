import {React, useEffect} from "react";
import MovieRow from "../components/movieRow";
import styles from '../styles/homePage.module.css';
import "../App.css";
import MovieBlock from "../components/movieBlock";
import PrettyButton from "../components/prettyButton";
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext";

function HomePage() {

    let navigate = useNavigate();

    function goToMoviePage() {
        
    }

    function goToFeedbackPage() {
        navigate('/feedback');
    }

    function goToEmotionPage() {
        navigate('/emotions');
    }

    const { token, isValid } = useAuth();

    useEffect(() => {
        if (!isValid ) {
            console.log(token);
            console.log('Invalid token');
            navigate('/login');
        }

        document.title = 'Movie Recommender';
        document.body.classList.add('BodyBackground');

        return () => {
            document.body.classList.remove('BodyBackground');
        };
    }, [isValid, token]);
    return (
        <div>
        <h1 className={styles.h1}>Welcome, {isValid ? (token.firstName) : ('')}</h1>
        <div className={styles.nextMovie}>
        <PrettyButton text='Find your next movie' fontSize='12px' color='#A7C7E7' onClick={goToEmotionPage}/>
        </div>
        <div className={styles.currentlyWatching}>
        <h5 className={styles.h5}>Currently watching...</h5>
        <MovieBlock />
        <PrettyButton text='Give feedback' fontSize='12px' color='#A7C7E7' onClick={goToFeedbackPage}/>
        </div>

        <MovieRow title="Favorites" />
        <MovieRow title="My list" />
        <MovieRow title="Watched before" />
        </div>
    );
    }

export default HomePage;