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
  // setFavorite(fave);

  const [watchlist, setWatchlist] = useState(false);
  const [clickedWatchlist, setClickedWatchlist] = useState(false);
    // setWatchlist(list);
  const [watched, setWatched] = useState(false);
    const [clickedWatched, setClickedWatched] = useState(false);


    useEffect(() => {
        setFavorite(fave);
        setWatchlist(list);
        setWatched(watch);
    }, [fave, list, watch]);

  const toggleFavorite = (event) => {
        event.stopPropagation();
        console.log(favorite);
        let tmp = !favorite;
    setFavorite(!favorite);
    // if
    // console.log(favorite);
    setClickedFavorite(true);
    if (tmp) {
        axios.post(
            `http://localhost:8080/api/users/favorites/${movie.id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => {
            console.log("Added movie to favorites");
            setClickedFavorite(false);
            if (triggerReloadMovies !== undefined) {
                triggerReloadMovies();
            }

        })
        .catch((error) => {
            console.error("Error adding movie to favorites:", error);
            setClickedFavorite(false);
        });
    }
    else {
        axios.delete(`http://localhost:8080/api/users/favorites/${movie.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log("Removed movie from favorites");
            if (triggerReloadMovies !== undefined) {
                triggerReloadMovies();
            }
        })
        .catch((error) => {
            console.error("Error removing movie from favorites:", error);
        });
    }
  };

  const toggleWatchlist = (event) => {
        event.stopPropagation();
      setClickedWatchlist(true);
      let tmp = !watchlist;
    setWatchlist(!watchlist);
    if (tmp) {
        axios.post(
            `http://localhost:8080/api/users/watchlist/${movie.id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => {
            console.log("Added movie to watchlist");
            setClickedWatchlist(false);
            if (triggerReloadMovies !== undefined) {
                triggerReloadMovies();
            }
        })
        .catch((error) => {
            console.error("Error adding movie to watchlist:", error);
            setClickedWatchlist(false);
        });
    } else {
        axios.delete(`http://localhost:8080/api/users/watchlist/${movie.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log("Removed movie from watchlist");
            setClickedWatchlist(false);
            if (triggerReloadMovies !== undefined) {
                triggerReloadMovies();
            }
        })
        .catch((error) => {
            console.error("Error removing movie from watchlist:", error);
            setClickedWatchlist(false);
        });
    }
  };

  const toggleWatched = (event) => {
      event.stopPropagation();
    setWatched(!watched);
      let tmp = !watched;
    setClickedWatched(true);
    if (tmp) {
        axios.post(
            `http://localhost:8080/api/users/watched/${movie.id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => {
            console.log("Added movie to watched");
            setClickedWatched(false);
            if (triggerReloadMovies !== undefined) {
                triggerReloadMovies();
            }
        })
        .catch((error) => {
            console.error("Error adding movie to watched:", error);
            setClickedWatched(false);
        });
    } else {
        axios.delete(`http://localhost:8080/api/users/watched/${movie.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log("Removed movie from watched");
            setClickedWatched(false);
            if (triggerReloadMovies !== undefined) {
                triggerReloadMovies();
            }
        })
        .catch((error) => {
            console.error("Error removing movie from watched:", error);
            setClickedWatched(false);
        });
    }
  };

  const handleClick = () => {
    console.log("Movie clicked:", movie.title);
    console.log("clickable:", clickable);

    if (clickable && !clickedFavorite && !clickedWatchlist && !clickedWatched) {
      // remove the movie from currently watching
      axios
        .delete(`http://localhost:8080/api/users/currentlywatching`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((r) => {
          console.log("Removed movie from currently watching");
          axios
            .post(
              `http://localhost:8080/api/users/currentlywatching/${movie.id}`,
              {},
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((response) => {
              navigate("/home");
            })
            .catch((error) => {
              console.error("Error adding movie to currently watching:", error);
            });
        })
        .catch((e) => {
          console.error("Error removing movie from currently watching:", e);
        });

      // add movie to currently watching
    }
  };

  return (
    <div key={movie.id} className={styles.movieBlock} onClick={handleClick}>
      <img src={movie.poster_url} alt={movie.title} />
      <div className={styles.movieDetails}>
        <div className={styles.buttons}>
            <button className={styles.button} onClick={(event) => toggleFavorite(event)}>
                <img src={favorite ? favoritesIconActive : favoritesIcon}/>
            </button>
            <button className={styles.button} onClick={(event) => toggleWatchlist(event)}>
                <img src={watchlist ? watchlistIconActive : watchlistIcon}/>
            </button>
            <button className={styles.button} onClick={(event) => toggleWatched(event)}>
                <img src={watched ? watchedBeforeIconActive : watchedBeforeIcon}/>
            </button>
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
