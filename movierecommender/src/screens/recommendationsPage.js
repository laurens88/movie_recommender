import { React, useEffect } from "react";
import styles from "../styles/recommendationsPage.module.css";
import MovieRow from "../components/movieRow";
import PrettyButton from "../components/prettyButton";
import "../App.css";
import { useNavigate } from 'react-router-dom';

function RecommendationsPage() {
  useEffect(() => {
    document.title = "Recommendations";
    document.body.classList.add("BodyBackground");
    return () => {
      document.body.classList.remove("BodyBackground");
    };
  }, []);
  return (
    <div>
      <h1 className={styles.h1}>Movies we believe you may like</h1>
      <MovieRow />
      <MovieRow />
      <div className={styles.buttonContainer}>
      <PrettyButton
        text="Back"
        width="200px"
        height="50px"
        fontSize="25px"
        color="#A7C7E7"
        />
      <PrettyButton
        text="More"
        width="200px"
        height="50px"
        fontSize="25px"
        color="#A7C7E7"
      />
      </div>
    </div>
  );
}

export default RecommendationsPage;
