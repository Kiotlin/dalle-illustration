import React from "react";
import { Grid, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TwitterIcon from "@mui/icons-material/Twitter";
import CodeIcon from "@mui/icons-material/Code";
import EmailIcon from "@mui/icons-material/Email";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

export const Download2LocalButton = ({ capturedComponent }) => {
  function handleButtonClick(e) {
    e.preventDefault();

    html2canvas(capturedComponent.current).then((canvas) => {
      saveAs(canvas.toDataURL("image/png"), "dalle_polarioid_image.png");
    });
  }

  return (
    <Grid item>
      <Button
        variant="contained"
        endIcon={<FileDownloadIcon />}
        onClick={handleButtonClick}
      >
        Download As PNG
      </Button>
    </Grid>
  );
};

export const ShareToTwitterButton = () => {
  return (
    <Grid item>
      <Button variant="outlined" endIcon={<TwitterIcon />}>
        Share To Twitter
      </Button>
    </Grid>
  );
};

export const ExportAsCodeButton = () => {
  return (
    <Grid item>
      <Button variant="contained" color="warning" endIcon={<CodeIcon />}>
        Export As Build-in
      </Button>
    </Grid>
  );
};

export const SendWithMailButton = () => {
  return (
    <Grid item>
      <Button variant="contained" color="error" endIcon={<EmailIcon />}>
        Send with Email
      </Button>
    </Grid>
  );
};
