import React from "react";
import styles from '../styles/movieBlock.module.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../contexts/AuthContext";

function MovieBlock(props) {
    const navigate = useNavigate();
    const {movie, clickable} = props;
    const { token } = useAuth();

    const handleClick = () => {
        console.log('Movie clicked:', movie.title);
        console.log('clickable:', clickable)
        if (clickable) {
            // remove the movie from currently watching
            axios.delete(`http://localhost:8080/api/users/currentlywatching`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(r => {
                console.log('Removed movie from currently watching');
            }).catch(e => {
                console.error('Error removing movie from currently watching:', e);
            });

            // add movie to currently watching
            axios.post(`http://localhost:8080/api/users/currentlywatching/${movie.id}`, {},  {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(response => {})
                .catch(error => {
                    console.error('Error adding movie to currently watching:', error);
                });

            navigate('/home');

    }};

    return (
        <div key={movie.id} className={styles.movieBlock} onClick={handleClick}>
            <img src={movie.poster_url} alt={movie.title}/>
            <div className={styles.movieDetails}>
                <h3>{movie.title} ({movie.yearReleased})</h3>
                <p>{movie.synopsis}</p>
                {/* Display other movie details as needed */}
            </div>
            {/*<h3>{movie.title}</h3>*/}
            {/* Display other movie details as needed */}
        </div>
    );
}

export default MovieBlock;