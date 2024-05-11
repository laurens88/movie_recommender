import React, { useState } from "react";
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
  const { movie, clickable } = props;
  const { token } = useAuth();

  const [favorite, setFavorite] = useState(false);

  const [watchlist, setWatchlist] = useState(false);
  const [watched, setWatched] = useState(false);

  const toggleFavorite = () => {
    setFavorite(!favorite);
    if (favorite) {
        axios.post(
            `http://localhost:8080/api/users/favorites/${movie.id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => {
            console.log("Added movie to favorites");
        })
        .catch((error) => {
            console.error("Error adding movie to favorites:", error);
        });
    } else {
        axios.delete(`http://localhost:8080/api/users/favorites/${movie.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log("Removed movie from favorites");
        })
        .catch((error) => {
            console.error("Error removing movie from favorites:", error);
        });
    }
  };

  const toggleWatchlist = () => {
    setWatchlist(!watchlist);
    if (watchlist) {
        axios.post(
            `http://localhost:8080/api/users/watchlist/${movie.id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => {
            console.log("Added movie to watchlist");
        })
        .catch((error) => {
            console.error("Error adding movie to watchlist:", error);
        });
    } else {
        axios.delete(`http://localhost:8080/api/users/watchlist/${movie.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log("Removed movie from watchlist");
        })
        .catch((error) => {
            console.error("Error removing movie from watchlist:", error);
        });
    }
  };

  const toggleWatched = () => {
    setWatched(!watched);
    if (watched) {
        axios.post(
            `http://localhost:8080/api/users/watched/${movie.id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((response) => {
            console.log("Added movie to watched");
        })
        .catch((error) => {
            console.error("Error adding movie to watched:", error);
        });
    } else {
        axios.delete(`http://localhost:8080/api/users/watched/${movie.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log("Removed movie from watched");
        })
        .catch((error) => {
            console.error("Error removing movie from watched:", error);
        });
    }
  };

  const handleClick = () => {
    console.log("Movie clicked:", movie.title);
    console.log("clickable:", clickable);
    if (clickable) {
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
          <button className={styles.button} onClick={toggleFavorite}>
            <img src={favorite ? favoritesIconActive : favoritesIcon} />
          </button>
          <button className={styles.button} onClick={toggleWatchlist}>
            <img src={watchlist ? watchlistIconActive : watchlistIcon} />
          </button>
          <button className={styles.button} onClick={toggleWatched}>
            <img src={watched ? watchedBeforeIconActive : watchedBeforeIcon} />
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
