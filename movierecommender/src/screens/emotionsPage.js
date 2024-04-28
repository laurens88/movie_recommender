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
    navigate("/categories", { state: { prompt: prompt } });
  }

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  function setSadPrompt() {
    let sadPrompts = ["I feel sad because I lost someone close to me and I want to watch a movie that helps me with grieving",
    "I’m not feeling well today and I want to watch movie to make me feel happier",
    "I am feeling sad and I want to be relieved by having a good cry"];
    let currentPrompt = prompt;
    let newPrompt = "";
    if (currentPrompt === "") {
      newPrompt = sadPrompts[0];
    } else {
      let index = sadPrompts.indexOf(currentPrompt);
      if (index === sadPrompts.length - 1) {
        newPrompt = sadPrompts[0];
      } else {
        newPrompt = sadPrompts[index + 1];
      }
    }
    setPrompt(newPrompt);
  }

  function setHappyPrompt() {
    let happyPrompts = ["I am feeling happy today and I want to watch a movie that compasses this feeling",
    "I feel very well cause I am in love and I want to watch a movie that expresses this feeling",
    "I feel very uplifted and therefore I want to learn more about the goodness of the world"];
    let currentPrompt = prompt;
    let newPrompt = "";
    if (currentPrompt === "") {
      newPrompt = happyPrompts[0];
    } else {
      let index = happyPrompts.indexOf(currentPrompt);
      if (index === happyPrompts.length - 1) {
        newPrompt = happyPrompts[0];
      } else {
        newPrompt = happyPrompts[index + 1];
      }
    }
    setPrompt(newPrompt);
  }

  function setAngryPrompt() {
    let angryPrompts = ["I am annoyed at my family and I want to watch a movie that helps me to learn how to deal with this feeling",
    "I'm feeling really angry and I'd like to watch a movie that serves as a good emotional release.",
    "I feel very angry but I want to watch a movie to calm me down and make me feel happy again"];
    let currentPrompt = prompt;
    let newPrompt = "";
    if (currentPrompt === "") {
      newPrompt = angryPrompts[0];
    } else {
      let index = angryPrompts.indexOf(currentPrompt);
      if (index === angryPrompts.length - 1) {
        newPrompt = angryPrompts[0];
      } else {
        newPrompt = angryPrompts[index + 1];
      }
    }
    setPrompt(newPrompt);
  }

  function setFearPrompt() {
    let fearPrompts = ["I am concerned about the faith of the world and I want to watch something to make me more hopeful about the future",
     "I feel very nervous, but I want to watch a movie to forget about this feeling and have a good laugh",
      "I am feeling anxious and therefore I want to watch a movie with an anxious character that learns to overcome its fears"];
    let currentPrompt = prompt;
    let newPrompt = "";
    if (currentPrompt === "") {
      newPrompt = fearPrompts[0];
    } else {
      let index = fearPrompts.indexOf(currentPrompt);
      if (index === fearPrompts.length - 1) {
        newPrompt = fearPrompts[0];
      } else {
        newPrompt = fearPrompts[index + 1];
      }
    }
    setPrompt(newPrompt);
  }

  function setHopefulPrompt() {
    let hopefulPrompts = ["I feel very hopeful and therefore I want to watch a movie to make me even more hopeful",
    "I feel hopeful and I want to watch a movie with a character that also expresses hopefulness"];
    let currentPrompt = prompt;
    let newPrompt = "";
    if (currentPrompt === "") {
      newPrompt = hopefulPrompts[0];
    } else {
      let index = hopefulPrompts.indexOf(currentPrompt);
      if (index === hopefulPrompts.length - 1) {
        newPrompt = hopefulPrompts[0];
      } else {
        newPrompt = hopefulPrompts[index + 1];
      }
    }
    setPrompt(newPrompt);
  }

  function setCuriousPrompt() {
    let curiousPrompts = ["I am feeling curious to learn about world war two, even if that makes me cry",
    "I am feeling curious to learn about something new, but I have to improve my mood in a positive way like feeling more hopeful or inspired",
    "I feel like I am in the mood to learn more about ….. [the world, social media, feminism history etc.]"];
    let currentPrompt = prompt;
    let newPrompt = "";
    if (currentPrompt === "") {
      newPrompt = curiousPrompts[0];
    } else {
      let index = curiousPrompts.indexOf(currentPrompt);
      if (index === curiousPrompts.length - 1) {
        newPrompt = curiousPrompts[0];
      } else {
        newPrompt = curiousPrompts[index + 1];
      }
    }
    setPrompt(newPrompt);
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
            onClick={setHappyPrompt}
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
            onClick={setAngryPrompt}
          />
        </Grid>

        <Grid item lg="3" md="6">
          <PrettyButton
            text="Fear"
            width="110px"
            height="40px"
            fontSize="12px"
            color="#A7C7E7"
            onClick={setFearPrompt}
          />
        </Grid>

        <Grid item lg="3" md="6">
          <PrettyButton
            text="Hopeful"
            width="110px"
            height="40px"
            fontSize="12px"
            color="#A7C7E7"
            onClick={setHopefulPrompt}
          />
        </Grid>

        <Grid item lg="3" md="6">
          <PrettyButton
            text="Curious"
            width="110px"
            height="40px"
            fontSize="12px"
            color="#A7C7E7"
            onClick={setCuriousPrompt}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default EmotionsPage;
