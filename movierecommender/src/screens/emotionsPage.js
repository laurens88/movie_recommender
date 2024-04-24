import React, { useEffect, useState } from "react";
import "../App.css";
import styles from "../styles/emotionsPage.module.css";
import TransparentInput from "../components/transparentInput";
import TextArea from "../components/textArea";
import PrettyButton from "../components/prettyButton";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

function EmotionsPage() {
  let navigate = useNavigate();

  const [prompt, setPrompt] = useState("");

  function goToCategoriesPage() {
    navigate("/categories");
  }

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  function setSadPrompt() {
    setPrompt("Sad");
  }

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
        <TextArea
          placeholder="A brief detailed description will help us better find a movie that suits you the best."
          onChange={handleChange}
          value={prompt}
        />
        <h6 className={styles.h6}>0/100</h6>
        <PrettyButton
          text="Next"
          width="110px"
          height="40px"
          fontSize="12px"
          color="#A7C7E7"
          onClick={goToCategoriesPage}
        />
      </div>
      <h3 className={styles.h3}>Suggestions</h3>

      <Grid container spacing={1} justifyContent="center">
        <Grid item lg="3" md="6">
          <PrettyButton
            text="Happy/Joy"
            width="110px"
            height="40px"
            fontSize="12px"
            color="#A7C7E7"
          />
        </Grid>

        <Grid item lg="3" md="6">
          <PrettyButton
            text="Sad/Despair"
            width="110px"
            height="40px"
            fontSize="12px"
            color="#A7C7E7"
            onClick={setSadPrompt}
          />
        </Grid>

        <Grid item lg="3" md="6">
          <PrettyButton
            text="Angry/Annoyed"
            width="110px"
            height="40px"
            fontSize="12px"
            color="#A7C7E7"
          />
        </Grid>

        <Grid item lg="3" md="6">
          <PrettyButton
            text="Fear"
            width="110px"
            height="40px"
            fontSize="12px"
            color="#A7C7E7"
          />
        </Grid>

        <Grid item lg="3" md="6">
          <PrettyButton
            text="Hopeful"
            width="110px"
            height="40px"
            fontSize="12px"
            color="#A7C7E7"
          />
        </Grid>

        <Grid item lg="3" md="6">
          <PrettyButton
            text="Curious"
            width="110px"
            height="40px"
            fontSize="12px"
            color="#A7C7E7"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default EmotionsPage;
