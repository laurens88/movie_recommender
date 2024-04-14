import { React, useEffect } from "react";
import "../App.css";
import styles from "../styles/emotionsPage.module.css";
import TransparentInput from "../components/transparentInput";
import PrettyButton from "../components/prettyButton";

function EmotionsPage() {
  useEffect(() => {
    document.title = "Feelings";
    document.body.classList.add("BodyBackground");
    return () => {
      document.body.classList.remove("BodyBackground");
    };
  }, []);
  return (
    <div>
      <h1 className={styles.h1}>Tell us how you're feeling</h1>
      <div className={styles.inputField}>
        <TransparentInput
          className={styles.inputField}
          placeholder="A brief detailed description will help us better find a movie that suits you the best. "
        />
        <h6 className={styles.h6}>0/100</h6>
        <PrettyButton text="Next" width="110px" height="40px" fontSize="12px" color="#A7C7E7" />
      </div>
      <h3 className={styles.h3}>Suggestions</h3>
      <div className={styles.suggestions}>
        <PrettyButton
          text="Sad"
          width="110px"
          height="40px"
          fontSize="12px"
          color="#A7C7E7"
        />
        <PrettyButton
          text="Happy"
          width="110px"
          height="40px"
          fontSize="12px"
          color="#A7C7E7"
        />
        <PrettyButton
          text="Angry"
          width="110px"
          height="40px"
          fontSize="12px"
          color="#A7C7E7"
        />
        <PrettyButton
          text="Curious"
          width="110px"
          height="40px"
          fontSize="12px"
          color="#A7C7E7"
        />
        <PrettyButton
          text="Bored"
          width="110px"
          height="40px"
          fontSize="12px"
          color="#A7C7E7"
        />
      </div>
    </div>
  );
}

export default EmotionsPage;
