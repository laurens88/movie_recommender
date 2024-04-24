import React, { useEffect} from "react";
import MovieRow from "../components/movieRow";
import styles from '../styles/homePage.module.css';
import "../App.css";
import MovieBlock from "../components/movieBlock";
import PrettyButton from "../components/prettyButton";
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext";
import axios from "axios";

function HomePage() {
    console.log('HomePage rendered');

    let navigate = useNavigate();
    const [favoriteMovies, setFavoriteMovies] = React.useState([]);
    const [watchedMovies, setWatchedMovies] = React.useState([]);
    const [currentlyWatching, setCurrentlyWatching] = React.useState([]);
    const [watchlist, setWatchlist] = React.useState([]);

    function goToMoviePage() {
        
    }

    function goToFeedbackPage() {
        navigate('/feedback');
    }

    function goToEmotionPage() {
        navigate('/emotions');
    }

    const { token, decodedToken, isValid } = useAuth();


    useEffect(() => {
        if (!isValid ) {
            console.log(token);
            console.log('Invalid token');
            navigate('/login');
        }

        axios.get('http://localhost:8080/api/users/favorites', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
                setFavoriteMovies(response.data);
            })
            .catch(error => {
                // console.log(response.data)
                console.error('Error fetching favorite movies:', error);
            });

        axios.get('http://localhost:8080/api/users/watched', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
                setWatchedMovies(response.data);
            })
            .catch(error => {
                // console.log(response.data)
                console.error('Error fetching watched movies:', error);
            });

        axios.get('http://localhost:8080/api/users/watchlist', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
                setWatchlist(response.data);
            })
            .catch(error => {
                // console.log(response.data)
                console.error('Error fetching watched movies:', error);
            });

        axios.get('http://localhost:8080/api/users/currentlywatching', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
                setCurrentlyWatching(response.data);
            })
            .catch(error => {
                // console.log(response.data)
                console.error('Error fetching watched movies:', error);
            });

        document.title = 'Movie Recommender';
        document.body.classList.add('BodyBackground');

        return () => {
            document.body.classList.remove('BodyBackground');
        };
    }, []);
    return (
        <div>
        <h1 className={styles.h1}>Welcome, {isValid ? (decodedToken.firstName) : ('')}</h1>
        <div className={styles.nextMovie}>
        <PrettyButton text='Find your next movie' fontSize='12px' color='#A7C7E7' onClick={goToEmotionPage}/>
        </div>

            {(currentlyWatching.length > 0) && (<div className={styles.currentlyWatching} >
        <h5 className={styles.h5}>Currently watching...</h5>
                    <MovieBlock key={currentlyWatching[0].id} movie={currentlyWatching[0]} />
        {/*<MovieBlock />*/}
        <PrettyButton text='Give feedback' fontSize='12px' color='#A7C7E7' onClick={goToFeedbackPage}/>
        </div>
            )}

            <MovieRow title="Favorites" movies={favoriteMovies} click={false}/>
            <MovieRow title="My list" movies={watchlist} click={false}/>
            <MovieRow title="Watched before" movies={watchedMovies} click={false} />
        </div>
    );
    }

export default HomePage;