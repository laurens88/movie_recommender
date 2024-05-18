import React, { useEffect} from "react";
import MovieRow from "../components/movieRow";
import styles from '../styles/homePage.module.css';
import "../App.css";
import MovieBlock from "../components/movieBlock";
import PrettyButton from "../components/prettyButton";
import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext";
import axios from "axios";
import {CategoriesContext} from "../contexts/CategoriesContext";

function HomePage() {
    console.log('HomePage rendered');
    let location = useLocation();

    let navigate = useNavigate();
    const [favoriteMovies, setFavoriteMovies] = React.useState([]);
    const [reloadMovies, setReloadMovies] = React.useState(false);
    const triggerReloadMovies = () => setReloadMovies(!reloadMovies);

    const [watchedMovies, setWatchedMovies] = React.useState([]);
    const [currentlyWatching, setCurrentlyWatching] = React.useState([]);
    const [watchlist, setWatchlist] = React.useState([]);

    const { token, decodedToken, isValid, signOut } = useAuth();
    let storedToken = null;
    const { categories } = React.useContext(CategoriesContext);

    // let categories = [];
    //
    // if(location.state) {
    //     categories = location.state.categories;
    //     categories = categories.join(', ');
    // }

    const handleSignOut = () => {
        signOut();
        navigate('/login');
    };

    function goToFeedbackPage() {
        navigate('/feedback', { state: { movieID: currentlyWatching[0].id, categories: categories}});
    }

    function goToEmotionPage() {
        navigate('/emotions');
    }


    useEffect(() => {
        storedToken = localStorage.getItem('token');

        if (!isValid && storedToken !== null) {
            window.location.reload();
        } else if (!isValid) {
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
                console.error('Error fetching watched movies:', error);
            });

        document.title = 'Movie Recommender';
        document.body.classList.add('BodyBackground');

        return () => {
            document.body.classList.remove('BodyBackground');
        };
    }, [reloadMovies, storedToken, token, isValid, decodedToken]);
    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.h1}>Welcome, {isValid ? (decodedToken.firstName) : ('')}</h1>
                <PrettyButton className={styles.signOutButton} text='Sign Out' fontSize='12px' color='#A7C7E7'
                              onClick={handleSignOut}/>
            </div>
            <div className={styles.nextMovie}>
                <PrettyButton text='Find your next movie' fontSize='12px' color='#A7C7E7' onClick={goToEmotionPage}/>
            </div>

            {(currentlyWatching.length > 0) && (<div className={styles.currentlyWatching}>
                    <h5 className={styles.h5}>Currently watching...</h5>
                    <MovieBlock triggerReloadMovies={triggerReloadMovies} key={currentlyWatching[0].id}
                                movie={currentlyWatching[0]}/>
        <PrettyButton text='Give feedback' fontSize='12px' color='#A7C7E7' onClick={goToFeedbackPage}/>
        </div>
            )}

            <MovieRow title="Favorites" triggerReloadMovies={triggerReloadMovies} movies={favoriteMovies} click={false} fave={true} list={false} watched={false}/>
            <MovieRow title="My list" triggerReloadMovies={triggerReloadMovies} movies={watchlist} click={false} fave={false} list={true} watched={false}/>
            <MovieRow title="Watched before" triggerReloadMovies={triggerReloadMovies} movies={watchedMovies} click={false} fave={false} list={false} watched={true}/>
        </div>
    );
    }

export default HomePage;