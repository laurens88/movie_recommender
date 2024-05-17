import React, { useState, useEffect } from "react";
import styles from "../styles/movieBlock.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import favoritesIcon from "../favorites.svg";
import favoritesIconActive from "../favoritesActive.svg";
import watchlistIcon from "../mylist.svg";
import watchlistIconActive from "../mylistActive.svg";
import watchedBeforeIcon from "../watchedbefore.svg";
import watchedBeforeIconActive from "../watchedbeforeActive.svg";

function MovieBlock(props) {
  const navigate = useNavigate();
  const { triggerReloadMovies, movie, clickable, fave, list, watch } = props;
  const { token } = useAuth();

  const [favorite, setFavorite] = useState(false);
  const [clickedFavorite, setClickedFavorite] = useState(false);
  const [watchlist, setWatchlist] = useState(false);
  const [clickedWatchlist, setClickedWatchlist] = useState(false);
  const [watched, setWatched] = useState(false);
  const [clickedWatched, setClickedWatched] = useState(false);
  const [isHoveredFavorite, setIsHoveredFavorite] = useState(false);
  const [isHoveredWatchlist, setIsHoveredWatchlist] = useState(false);
  const [isHoveredWatched, setIsHoveredWatched] = useState(false);

  useEffect(() => {
    setFavorite(fave);
    setWatchlist(list);
    setWatched(watch);
  }, [fave, list, watch]);

  const toggleFavorite = (event) => {
    event.stopPropagation();
    let tmp = !favorite;
    setFavorite(tmp);
    setClickedFavorite(true);
    if (tmp) {
      axios
        .post(
          `http://localhost:8080/api/users/favorites/${movie.id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          setClickedFavorite(false);
          if (triggerReloadMovies) triggerReloadMovies();
        })
        .catch((error) => {
          console.error("Error adding movie to favorites:", error);
          setClickedFavorite(false);
        });
    } else {
      axios
        .delete(`http://localhost:8080/api/users/favorites/${movie.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (triggerReloadMovies) triggerReloadMovies();
        })
        .catch((error) => {
          console.error("Error removing movie from favorites:", error);
        });
    }
  };

  const toggleWatchlist = (event) => {
    event.stopPropagation();
    let tmp = !watchlist;
    setWatchlist(tmp);
    setClickedWatchlist(true);
    if (tmp) {
      axios
        .post(
          `http://localhost:8080/api/users/watchlist/${movie.id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          setClickedWatchlist(false);
          if (triggerReloadMovies) triggerReloadMovies();
        })
        .catch((error) => {
          console.error("Error adding movie to watchlist:", error);
          setClickedWatchlist(false);
        });
    } else {
      axios
        .delete(`http://localhost:8080/api/users/watchlist/${movie.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setClickedWatchlist(false);
          if (triggerReloadMovies) triggerReloadMovies();
        })
        .catch((error) => {
          console.error("Error removing movie from watchlist:", error);
          setClickedWatchlist(false);
        });
    }
  };

  const toggleWatched = (event) => {
    event.stopPropagation();
    let tmp = !watched;
    setWatched(tmp);
    setClickedWatched(true);
    if (tmp) {
      axios
        .post(
          `http://localhost:8080/api/users/watched/${movie.id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          setClickedWatched(false);
          if (triggerReloadMovies) triggerReloadMovies();
        })
        .catch((error) => {
          console.error("Error adding movie to watched:", error);
          setClickedWatched(false);
        });
    } else {
      axios
        .delete(`http://localhost:8080/api/users/watched/${movie.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setClickedWatched(false);
          if (triggerReloadMovies) triggerReloadMovies();
        })
        .catch((error) => {
          console.error("Error removing movie from watched:", error);
          setClickedWatched(false);
        });
    }
  };

  const handleClick = () => {
    if (clickable && !clickedFavorite && !clickedWatchlist && !clickedWatched) {
      axios
        .delete(`http://localhost:8080/api/users/currentlywatching`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          axios
            .post(
              `http://localhost:8080/api/users/currentlywatching/${movie.id}`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => {
              navigate("/home");
            })
            .catch((error) => {
              console.error("Error adding movie to currently watching:", error);
            });
        })
        .catch((error) => {
          console.error("Error removing movie from currently watching:", error);
        });
    }
  };

  return (
    <div key={movie.id} className={styles.movieBlock} onClick={handleClick}>
      <img src={movie.poster_url} alt={movie.title} />
      <div className={styles.movieDetails}>
        <div className={styles.buttons}>
          <div
            className={styles.buttonWrapper}
            onMouseEnter={() => setIsHoveredFavorite(true)}
            onMouseLeave={() => setIsHoveredFavorite(false)}
          >
            <button
              className={styles.button}
              onClick={(event) => toggleFavorite(event)}
            >
              <img src={favorite ? favoritesIconActive : favoritesIcon} />
            </button>
            {isHoveredFavorite && (
              <div className={styles.hoverText}>Favorite</div>
            )}
          </div>
          <div
            className={styles.buttonWrapper}
            onMouseEnter={() => setIsHoveredWatchlist(true)}
            onMouseLeave={() => setIsHoveredWatchlist(false)}
          >
            <button
              className={styles.button}
              onClick={(event) => toggleWatchlist(event)}
            >
              <img src={watchlist ? watchlistIconActive : watchlistIcon} />
            </button>
            {isHoveredWatchlist && (
              <div className={styles.hoverText}>My list</div>
            )}
          </div>
          <div
            className={styles.buttonWrapper}
            onMouseEnter={() => setIsHoveredWatched(true)}
            onMouseLeave={() => setIsHoveredWatched(false)}
          >
            <button
              className={styles.button}
              onClick={(event) => toggleWatched(event)}
            >
              <img
                src={watched ? watchedBeforeIconActive : watchedBeforeIcon}
              />
            </button>
            {isHoveredWatched && (
              <div className={styles.hoverText}>Already seen</div>
            )}
          </div>
        </div>
        <h3>
          {movie.title} ({movie.yearReleased})
        </h3>
        <p>{movie.synopsis}</p>
      </div>
    </div>
  );
}

export default MovieBlock;
