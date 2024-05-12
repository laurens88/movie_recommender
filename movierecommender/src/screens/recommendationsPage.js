import React, { useEffect } from "react";
import styles from "../styles/recommendationsPage.module.css";
import MovieRow from "../components/movieRow";
import PrettyButton from "../components/prettyButton";
import "../App.css";
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import {useAuth} from "../contexts/AuthContext";

function RecommendationsPage() {
    console.log('RecommendationsPage rendered');
    const location = useLocation();
    const prompt = location.state.prompt;
    const categories = location.state.categories;
    console.log('Props:', prompt, categories);
    let navigate = useNavigate();
    const [movies, setMovies] = React.useState([{}]);
    console.log('State:', movies);
    const [page, setPage] = React.useState(0);
    const [once, setOnce] = React.useState(false);
    const { token } = useAuth();
  useEffect(() => {
      if (!once) {
          setOnce(true);
          console.log("IN USE EFFECT")
          const data = {prompt: prompt, categories: categories};
          // console.log(data);
          axios.post('http://localhost:8080/api/movies/recommendations', data,{
              headers: {
                  'Authorization': `Bearer ${token}`
              },
          }).then(response => {
              console.log(response.data);
              // setMovies(response.data);
              // sort the movies by order of relevance
              const moviesOnly = response.data.sort((a, b) => a.order - b.order).map(item => item.movie);

              setMovies(moviesOnly);
          })
              .catch(error => {
                  console.error('Error fetching recommendations:', error);
              });
      }
    document.title = "Recommendations";
    document.body.classList.add("BodyBackground");
    return () => {
      document.body.classList.remove("BodyBackground");
    };
  }, []);
  return (
    <div>
      <h1 className={styles.h1}>Movies we believe you may like</h1>
      <div className={styles.movieRow}>
      <MovieRow movies={movies.slice(page*5, page*5+3)} click={true} fave={false} list={false} watched={false}/>
      <MovieRow movies={movies.slice(page*5+3, page*5+5)} click={true} fave={false} list={false} watched={false}/>
      </div>
      <div className={styles.buttonContainer}>
      <PrettyButton
        text="Back"
        width="200px"
        height="50px"
        fontSize="25px"
        color="#A7C7E7"
        onClick={() => {
          if (page > 0) {
            setPage(page - 1);
          }
        }}
        />
      <PrettyButton
        text="More"
        width="200px"
        height="50px"
        fontSize="25px"
        color="#A7C7E7"
        onClick={() => {
          if (page < Math.floor(movies.length / 5)) {
            setPage(page + 1);
          }
        }}
      />
      </div>
    </div>
  );
}

export default RecommendationsPage;
