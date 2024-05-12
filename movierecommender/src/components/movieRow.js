import React from "react";
import MovieBlock from "../components/movieBlock";
import styles from '../styles/movieRow.module.css';


function MovieRow(props) {
    console.log(props);
    const { title, movies, click, fave, list, watched } = props;

    return (
        <>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.row}>
                {movies.map(movie => <MovieBlock key={movie.id} movie={movie} clickable={click} fave={fave} list={list} watch={watched} />)}
            </div>
        </>
    );
}

export default MovieRow;