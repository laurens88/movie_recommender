import { React, useEffect, useState } from "react";
import "../App.css";
import styles from "../styles/feedbackPage.module.css";
import PrettySlider from "../components/slider";

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

      <h4 className={styles.h4}> Was the movie meaningful to you?</h4>
      <slider />
    </div>
  );
}

export default FeedbackPage;
