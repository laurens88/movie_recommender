import React from "react";
import styles from '../styles/movieBlock.module.css';

function MovieBlock(props) {
    const {movie} = props;

    return (
        <div key={movie.id} className={styles.movieBlock}>
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