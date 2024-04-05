import React from "react";
import MovieBlock from "../components/movieBlock";
import styles from '../styles/movieRow.module.css';

function MovieRow(props) {
    return (
        <>
        <h2 className={styles.title}>{props.title}</h2>
        <div className={styles.row}>
        <MovieBlock />
        <MovieBlock />
        <MovieBlock />
        <MovieBlock />
        </div>
        </>
    );
    }

export default MovieRow;