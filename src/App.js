import logo from "./logo.svg";
import "./App.css";
import styles from "./Style.module.css";
import React, { useRef, useState } from "react";
import { Typography, Paper, Grid } from "@mui/material";

import { callDalleService } from "./backend_api";
import GeneratedImageList from "./GeneratedImageList";
import TextPromptInput from "./TextPromptInput";
import BackendUrlInput from "./BackendUrlInput";
import LoadingSpinner from "./LoadingSpinner";
import {
  Download2LocalButton,
  ShareToTwitterButton,
  ExportAsCodeButton,
  SendWithMailButton,
} from "./GeneratorButtonGroup";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/system";

const paperStyle = {
  width: "100%",
  height: "100%",
};

function App() {
  const IMAGE_PER_QUERY_OPTION = 7;

  const [backendUrl, setBackendUrl] = useState("");
  const [isFetchingImgs, setIsFetchingImgs] = useState(false);
  const [isCheckingBackendEndpoint, setIsCheckingBackendEndpoint] =
    useState(false);
  const [isValidBackendEndpoint, setIsValidBackendEndpoint] = useState(true);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [apiError, setApiError] = useState("");
  const [imagesPerQuery, setImagesPerQuery] = useState(IMAGE_PER_QUERY_OPTION);
  const [queryTime, setQueryTime] = useState(0);
  const [imageSelectedIndex, setImageSelectedIndex] = useState(-1);
  const [promptText, setPromptText] = useState("");

  const validBackendUrl = isValidBackendEndpoint && backendUrl;
  const canvasRef = useRef();

  function enterPressedCallback(pText) {
    console.log(
      "API call to DALL-E web service with the following prompt [" + pText + "]"
    );
    setPromptText(pText);
    setApiError("");
    setIsFetchingImgs(true);
    callDalleService(backendUrl, pText, imagesPerQuery)
      .then((response) => {
        setQueryTime(response["executionTime"]);
        setGeneratedImages(response["generatedImgs"]);
        setIsFetchingImgs(false);
      })
      .catch((error) => {
        console.log("Error querying DALL-E service.", error);
        if (error.message === "Timeout") {
          setApiError(
            "Timeout querying DALL-E service (>1min). Consider reducing the images per query or use a stronger backend."
          );
        } else {
          setApiError(
            "Error querying DALL-E service. Check your backend server logs."
          );
        }
        setIsFetchingImgs(false);
      });
  }

  function handleImageSelect(illustIndex) {
    setImageSelectedIndex(illustIndex);
  }

  function getGalleryContent() {
    if (apiError) {
      return (
        <Typography variant="h5" color="error">
          {apiError}
        </Typography>
      );
    }

    if (isFetchingImgs) {
      return <LoadingSpinner isLoading={isFetchingImgs} />;
    }

    return (
      <GeneratedImageList
        generatedImages={generatedImages}
        imageSelectedHandler={handleImageSelect}
      />
    );
  }

  function setIllustration() {
    if (apiError || isFetchingImgs) {
      return <div></div>;
    }

    const theme = createTheme({
      typography: {
        fontFamily: ["Nunito", "Helvetica Neue"].join(","),
      },
    });

    const copyRightTheme = createTheme({
      typography: {
        fontFamily: [
          "Brush Script MT",
          "Brush Script Std",
          "Lucida Calligraphy",
          "Lucida Handwriting",
          "Apple Chancery",
          "Nunito",
          "Helvetica Neue",
        ].join(","),
        fontSize: 20,
      },
    });

    const illust = generatedImages[imageSelectedIndex];
    const IllustObject = ({ imgData, alt }) => (
      <img
        src={`data:image/png;base64,${imgData}`}
        className={styles.illustration}
        alt={alt}
      />
    );

    return (
      <div className={styles.illustrationWrap}>
        <IllustObject imgData={illust} alt={imageSelectedIndex} />
        <ThemeProvider theme={theme}>
          <Typography variant="h4" color="textSecondary" pt={4}>
            {promptText}
          </Typography>
        </ThemeProvider>
        <ThemeProvider theme={copyRightTheme}>
          <Typography color="textSecondary">
            © DALL-E ILLUSTRATION
          </Typography>
        </ThemeProvider>
      </div>
    );
  }

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
        <div className={styles.book}>
          <div className={styles.settingSection}>
            <Paper variant="outlined" square sx={paperStyle}>
              <BackendUrlInput
                setBackendValidUrl={setBackendUrl}
                isValidBackendEndpoint={isValidBackendEndpoint}
                setIsValidBackendEndpoint={setIsValidBackendEndpoint}
                setIsCheckingBackendEndpoint={setIsCheckingBackendEndpoint}
                isCheckingBackendEndpoint={isCheckingBackendEndpoint}
                disabled={isFetchingImgs}
              />
              <TextPromptInput
                enterPressedCallback={enterPressedCallback}
                disabled={isFetchingImgs || !validBackendUrl}
              />
            </Paper>
          </div>
          <div className={styles.illustrationSection}>
            <Paper
              ref={canvasRef}
              variant="outlined"
              square
              sx={paperStyle}
              className={styles.illustrationWrap}
            >
              {imageSelectedIndex !== -1 && setIllustration()}
            </Paper>
          </div>
        </div>

        <Paper className={styles.gallary}>{getGalleryContent()}</Paper>

        {queryTime !== 0 && (
          <Typography variant="body2" color="textSecondary">
            Query execution time: {queryTime} sec
          </Typography>
        )}

        <Grid container className={styles.buttonWrap} py={2} spacing={5}>
          <Download2LocalButton capturedComponent={canvasRef} />
          <ExportAsCodeButton />
          <SendWithMailButton />
          <ShareToTwitterButton />
        </Grid>
      </div>
    </div>
  );
}

export default App;
