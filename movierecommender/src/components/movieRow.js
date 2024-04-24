import React from "react";
import MovieBlock from "../components/movieBlock";
import styles from '../styles/movieRow.module.css';


function MovieRow(props) {
    const { title, movies } = props;

    return (
        <>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.row}>
                {movies.map(movie => <MovieBlock key={movie.id} movie={movie} />)}
            </div>
        </>
    );
}

// function MovieRow(props) {
//     return (
//         <>
//         <h2 className={styles.title}>{props.title}</h2>
//         <div className={styles.row}>
//         <MovieBlock />
//         <MovieBlock />
//         <MovieBlock />
//         <MovieBlock />
//         </div>
//         </>
//     );
//     }

export default MovieRow;