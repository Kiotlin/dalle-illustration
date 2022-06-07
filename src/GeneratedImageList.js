import React from "react";
import { ImageList, ImageListItem, IconButton } from "@mui/material";
import styles from "./Style.module.css";

const imgListStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  paddingLeft: "10px",
};

const imgListItemStyle = {
  justifyContent: "center",
};

const GeneratedImageList = ({ generatedImages, imageSelectedHandler }) => {
  
  function handleButtomClick(event) {
    imageSelectedHandler(event.target.alt);
  }

  const ImageObject = ({ imgData, alt }) => (
    <IconButton onClick={handleButtomClick}>
      <img
        src={`data:image/png;base64,${imgData}`}
        className={styles.generatedImg}
        alt={alt}
      />
    </IconButton>
  );
  return (
    <ImageList sx={imgListStyle} cols={1}>
      {generatedImages.map((generatedImg, index) => {
        return (
          <ImageListItem key={index} sx={imgListItemStyle}>
            <ImageObject imgData={generatedImg} alt={index} />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

export default GeneratedImageList;
