import { React, useEffect} from "react";
import "../App.css";
import styles from "../styles/feedbackPage.module.css";
import PrettySlider from "../components/slider";
import TransparentInput from "../components/transparentInput";
import PrettyButton from "../components/prettyButton";

function FeedbackPage() {
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
      <h4 className={styles.h4}>
        {" "}
        Did the movie give you the desired feelings?
      </h4>
        <PrettySlider />
      <h4 className={styles.h4}> You chose a [] movie, was that accurate?</h4>
      <PrettySlider />
      <h4 className={styles.h4}> Was the movie meaningful to you?</h4>
      <PrettySlider />
      <TransparentInput type="text" placeholder="(Optional): Any additional feedback?" />
      <PrettyButton text="Submit" width="110px" height="40px" fontSize="12px" color="#A7C7E7" />
    </div>
  );
}

export default FeedbackPage;
