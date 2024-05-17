import React, { useEffect, useState } from "react";
import "../App.css";
import styles from "../styles/categoriesPage.module.css";
import PrettyButton from "../components/prettyButton";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToggleButton } from "@mui/material";

// Inside your component

function CategoriesPage() {
  let navigate = useNavigate();
  const location = useLocation();
  const prompt = location.state.prompt;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activeButtons, setActiveButtons] = useState({});

  const toggleButton = (category) => {
    setActiveButtons((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleButtonClick = (category, customOnClick) => {
    if (category === 'no_preference') {
        setActiveButtons({});
        setSelectedCategories([]);
    } else {
        toggleButton(category);
        if (customOnClick) {
            customOnClick();
        }
    }
}

  function goToRecommendationsPage() {
    navigate("/recommendations", {
      state: { prompt: prompt, categories: selectedCategories },
    });
  }

  useEffect(() => {
    document.title = "Categories";
    document.body.classList.add("BodyBackground");
    return () => {
      document.body.classList.remove("BodyBackground");
    };
  }, []);
  return (
    <div>
      <h1 className={styles.h1}>Which of these categories do you like?</h1>
      <h2 className={styles.h2}>Select at least one</h2>
      <Grid container spacing={2} justifyContent="center">
        <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
          <Tooltip title="Movies such as: " placement="bottom">
            <PrettyButton
              text="Uplifting"
              width="min(30vw, 200px)"
              height="min(25vw, 150px)"
              fontSize="min(4vw, 25px)"
              isActive={!!activeButtons["uplifting"]}
              onClick={() => {
                setSelectedCategories([...selectedCategories, "uplifting"]);
                handleButtonClick("uplifting");
              }}
            />
          </Tooltip>
        </Grid>

        <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
          <PrettyButton
            text="Inspiring"
            width="min(30vw, 200px)"
            height="min(25vw, 150px)"
            fontSize="min(4vw, 25px)"
            isActive={!!activeButtons["inspiring"]}
            onClick={() => {
              setSelectedCategories([...selectedCategories, "inspiring"]);
              handleButtonClick("inspiring");
            }}
          />
        </Grid>

        <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
          <PrettyButton
            text="Hopeful"
            width="min(30vw, 200px)"
            height="min(25vw, 150px)"
            fontSize="min(4vw, 25px)"
            isActive={!!activeButtons["hopeful"]}
            onClick={() => {
              setSelectedCategories([...selectedCategories, "hopeful"]);
              handleButtonClick("hopeful");
            }}
          />
        </Grid>

        <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
          <PrettyButton
            text="Sad"
            width="min(30vw, 200px)"
            height="min(25vw, 150px)"
            fontSize="min(4vw, 25px)"
            isActive={!!activeButtons["sad"]}
            onClick={() => {
              setSelectedCategories([...selectedCategories, "sad"]);
              handleButtonClick("sad");
            }}
          />
        </Grid>

        <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
          <PrettyButton
            text="Informative"
            width="min(30vw, 200px)"
            height="min(25vw, 150px)"
            fontSize="min(4vw, 25px)"
            isActive={!!activeButtons["informative"]}
            onClick={() => {
              setSelectedCategories([...selectedCategories, "informative"]);
              handleButtonClick("informative");
            }}
          />
        </Grid>

        <Grid item lg={4} sm={6} xs={6} display="flex" justifyContent="center">
          <PrettyButton
            text="Character growth"
            width="min(30vw, 200px)"
            height="min(25vw, 150px)"
            fontSize="min(4vw, 25px)"
            isActive={!!activeButtons["character_growth"]}
            onClick={() => {
              setSelectedCategories([
                ...selectedCategories,
                "character_growth",
              ]);
              handleButtonClick("character_growth");
            }}
          />
        </Grid>
      </Grid>

      <div className={styles.buttonContainer}>
        <PrettyButton
          text="No preference"
          width="min(30vw, 200px)"
          height="min(25vw, 75px)"
          fontSize="min(4vw, 25px)"
          color="#A23742"
          isActive={!!activeButtons["no_preference"]}
          onClick={() => {
            setSelectedCategories([]);
            handleButtonClick("no_preference");
          }}
        />
        <PrettyButton
          text="Next"
          width="min(30vw, 200px)"
          height="min(25vw, 75px)"
          fontSize="min(4vw, 25px)"
          onClick={goToRecommendationsPage}
        />
      </div>
    </div>
  );
}

export default CategoriesPage;
