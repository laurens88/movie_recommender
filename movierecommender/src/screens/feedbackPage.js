import { React, useEffect} from "react";
import "../App.css";
import styles from "../styles/feedbackPage.module.css";
import PrettySlider from "../components/slider";
import TransparentInput from "../components/transparentInput";
import PrettyButton from "../components/prettyButton";
import { useNavigate } from 'react-router-dom';

function FeedbackPage() {
  let navigate = useNavigate();

  function goToHomePage() {
    navigate('/');
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
      <h3 className={styles.h3}> You chose a [] movie, was that accurate?</h3>
      <PrettySlider />
      <h3 className={styles.h3}> Was the movie meaningful to you?</h3>
      <PrettySlider />
      <div className={styles.feedbackSubmission}>
      <TransparentInput type="text" placeholder="(Optional): Any additional feedback?" />
      <PrettyButton text="Submit" fontSize="12px" color="#A7C7E7" onClick={goToHomePage}/>
      </div>
    </div>
  );
}

export default FeedbackPage;
