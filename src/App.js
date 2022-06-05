import logo from "./logo.svg";
import "./App.css";
import styles from "./Style.module.css";
import React, { useState } from "react";
import { Typography, Paper } from "@mui/material";
import { style } from "@mui/system";

function App() {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Typography variant="h3">
          DALL-E{" "}
          <span role="img" aria-label="">
            🖼️
          </span>{" "}
          IllUSTRATION
        </Typography>
      </div>

      <div className={styles.subTitle}>
        <Typography variant="h5">
          Make your reading of more fun using DALL-E.
        </Typography>
      </div>

      <div className={styles.playgroundSection}>
        <div className={styles.settingSection}></div>
        <div className={styles.illustration}></div>
      </div>

      <div className={styles.gallary}></div>
    </div>
  );
}

export default App;
