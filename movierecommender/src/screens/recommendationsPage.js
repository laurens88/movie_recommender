import React, { useEffect } from "react";
import styles from "../styles/recommendationsPage.module.css";
import MovieRow from "../components/movieRow";
import PrettyButton from "../components/prettyButton";
import "../App.css";
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import {useAuth} from "../contexts/AuthContext";

function RecommendationsPage() {
    const location = useLocation();
    const prompt = location.state.prompt;
    const categories = location.state.categories;
    let navigate = useNavigate();
    const [movies, setMovies] = React.useState([{}]);
    const { token } = useAuth();
  useEffect(() => {
      const data = {prompt: prompt, categories: categories};
      console.log(data);
      axios.get('http://localhost:8080/api/movies/recommendations', {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }).then(response => {
          console.log(response.data);
          setMovies(response.data);
          // sort the movies by order of relevance
          const moviesOnly = response.data.sort((a, b) => a.order - b.order).map(item => item.movie);

            setMovies(moviesOnly);
      })
          .catch(error => {
              console.error('Error fetching recommendations:', error);
          });

    document.title = "Recommendations";
    document.body.classList.add("BodyBackground");
    return () => {
      document.body.classList.remove("BodyBackground");
    };
  }, []);
  return (
    <div>
      <h1 className={styles.h1}>Movies we believe you may like</h1>
      <MovieRow movies={movies.slice(0,3)} click={true}/>
      <MovieRow movies={movies.slice(3,5)} click={true}/>
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
