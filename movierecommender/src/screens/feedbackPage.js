import React, { useEffect} from "react";
import "../App.css";
import styles from "../styles/feedbackPage.module.css";
import PrettySlider from "../components/slider";
import TransparentInput from "../components/transparentInput";
import PrettyButton from "../components/prettyButton";
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import {useAuth} from "../contexts/AuthContext";

function FeedbackPage() {
  let navigate = useNavigate();
    const location = useLocation();
    const movieID = location.state.movieID;
    const { token, decodedToken, isValid } = useAuth();
    const categories = location.state.categories.join(', ');


  function submitFeedback() {
      axios
          .delete(`http://localhost:8080/api/users/currentlywatching`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          })
          .then((r) => {
              console.log("Removed movie from currently watching");
              axios.post(
                  `http://localhost:8080/api/users/watched/${movieID}`,
                  {},
                  {
                      headers: { Authorization: `Bearer ${token}` },
                  }
              )
                  .then((response) => {
                      console.log("Added movie to watched");
                      navigate("/home");
                  })
                  .catch((error) => {
                      console.error("Error adding movie to watched:", error);
                      navigate("/home");
                  });

          })
          .catch((e) => {
              console.error("Error removing movie from currently watching:", e);
          });
  }

  useEffect(() => {
    document.title = "Feedback";
    document.body.classList.add("BodyBackground");
    return () => {
      document.body.classList.remove("BodyBackground");
    };
  }, []);
  return (
    <div>
      <h1 className={styles.h1}>Now that you've seen the movie...</h1>
      <h3 className={styles.h3}>Did the movie give you the desired feelings?</h3>
      <PrettySlider />
      <h3 className={styles.h3}> You chose a {categories} movie, was that accurate?</h3>
      <PrettySlider />
      <h3 className={styles.h3}> Was the movie meaningful to you?</h3>
      <PrettySlider />
      <div className={styles.feedbackSubmission}>
      <TransparentInput type="text" placeholder="(Optional): Any additional feedback?" />
      <PrettyButton text="Submit" fontSize="12px" color="#A7C7E7" onClick={submitFeedback}/>
      </div>
    </div>
  );
}

export default FeedbackPage;
