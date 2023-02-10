import React from "react";
import {useEffect, useState} from "react";

const MiniGallery = ({photoList, setPhotoNumber, photoNumber}) => {

  const [windowIndex, setWindowIndex] = useState(0);

const thumbnailStyle = {
  width: "50px",
  height: "auto",
  margin: "0px 0px 0px 15px",
  padding: "5px",
}

const thumbnailSelectedStyle = {
  width: "50px",
  height: "auto",
  margin: "0px 0px 0px 15px",
  padding: "5px",
  backgroundColor: "black"
}

const miniGalleryContainerStyle = {
  display: "flex",
  alignSelf: "flex-start",
  width: "80px",
  flexDirection: "column",
  postion: "absolute",
  top: "0px",
  left: "15px"
}

const upArrowStyle = {
  cursor: "pointer",
  width: "auto",
  alignSelf: "center",
  padding: "0px 0px 10px 10px",
  color: "black",
  fontWeight: "bold",
  fontSize: "38px",
}

const downArrowStyle = {
  cursor: "pointer",
  width: "auto",
  alignSelf: "center",
  padding: "0px 0px 15px 10px",
  color: "black",
  fontWeight: "bold",
  fontSize: "38px",
}

const handleDownArrow = () => {
  if (windowIndex + 5 > photoList.length - 1) {
  } else {
    setWindowIndex(windowIndex + 1);
  }
}

const handleUpArrow = () => {
  if (windowIndex !== 0) {
    setWindowIndex(windowIndex - 1);
  }
}

const handleThumbnailSelect = (event) => {
  setPhotoNumber(Number(event.target.id.slice(5)) + windowIndex);
}

console.log("photoNumber: ", photoNumber, " windowIndex: ", windowIndex);

if (photoNumber >= windowIndex + 5) {
  setWindowIndex(windowIndex + 1)
} else if (photoNumber < windowIndex) {
  setWindowIndex(windowIndex - 1)
}


let galleryWindow = [];

if (windowIndex + 5 > photoList.length - 1) {
  galleryWindow = photoList.slice(windowIndex);
} else {
  galleryWindow = photoList.slice(windowIndex, windowIndex + 5);
}

let formattedWindow = galleryWindow.map((photoContainer, index) => {
  return (
    <div key={index} className={"image" + index + "Div"}>
      <img
        className="thumbnailClass"
        id={"image" + index}
        style={windowIndex + index === photoNumber ? thumbnailSelectedStyle : thumbnailStyle}
        src={photoContainer.thumbnail_url}
        onClick={handleThumbnailSelect} />
    </div>
  )
})

  return (
    <>
      <div className="miniGalleryContainer" style={miniGalleryContainerStyle}>
        <a className="upArrow"  style={upArrowStyle} onClick={handleUpArrow}>&#65087;</a>
          {formattedWindow}
        <a className="downArrow"  style={downArrowStyle} onClick={handleDownArrow}>&#65088;</a>
      </div>
    </>
  )
}

export default MiniGallery;
