import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import Thumbnail from "./Thumbnail.jsx";
import MiniGallery from "./MiniGallery.jsx";


const MainPhoto = ({productID, photoNumber, setPhotoNumber, styleNumber}) => {

  const [photoList, setPhotoList] = useState([]);

  useEffect(() => {
    axios.get(`/products/${productID}/styles`)
    .then((response) => {
      setPhotoList(response.data.results[styleNumber].photos !== undefined ? response.data.results[styleNumber].photos : []);
    })
    .catch((error) => {
      console.log('this is an axios get error in MainPhoto.jsx: ', error);
    });
  },[productID, styleNumber]);

  const handleNext = function() {
    if (photoNumber !== photoList.length) {
      setPhotoNumber(photoNumber + 1);
    }
  }

  const handlePrev = function() {
    if (photoNumber !== 0) {
      setPhotoNumber(photoNumber - 1);
    }
  }

  const enlargePhoto = function(event) {
    let imageContainerNew = document.getElementById("imageContainerID");
    let photoNew = event.target.style;
    let thumbnailNew = document.getElementsByClassName("thumbnailClass");
    if (imageContainerNew.style.width === "1400px") {
      imageContainerNew.style.width = "800px";
      imageContainerNew.style.height = "600px";
      photoNew.width = "700px";
      photoNew.height = "600px";
      for (let i = 0; i < thumbnailNew.length; i++) {
        thumbnailNew[i].style.width = "50px"
      }
    } else {
      imageContainerNew.style.width = "1400px";
      imageContainerNew.style.height = "auto";
      photoNew.width = "1400px";
      photoNew.height = "auto";
      for (let i = 0; i < thumbnailNew.length; i++) {
        thumbnailNew[i].style.width = "15px"
      }
    }
  }

  if (photoList.length === 0) {
    return (
      <span>Data not available</span>
    )
  };

  //CSS:
  const arrowStylePrev = {
    position: "absolute",
    top: "50%",
    left: "115px",
    cursor: "pointer",
    width: "auto",
    padding: "0px",
    color: "black",
    fontWeight: "bold",
    fontSize: "38px",
  }

  const arrowStyleNext = {
    position: "absolute",
    top: "50%",
    right: "15px",
    cursor: "pointer",
    width: "auto",
    padding: "0px",
    color: "black",
    fontWeight: "bold",
    fontSize: "38px",
  }

  const imageContainer = {
    backgroundColor: "LightGray",
    position: "relative",
    display: "flex",
    width: "800px",
    height: "600px"
  }

  const mainPhoto = {
      width: "700px",
      height: "600px"
  }


  return (
  <>
    <div className="imageContainer" id="imageContainerID" style={imageContainer}>
       <MiniGallery
         photoList={photoList}
         setPhotoNumber={setPhotoNumber}
         photoNumber={photoNumber}
       />
       <img className="mainPhoto" src={photoList[photoNumber].url ? photoList[photoNumber].url : "starklogo.png"} alt="Italian Trulli" style={mainPhoto} onClick={enlargePhoto}/>
        <a className="prev"
          style={arrowStylePrev}
          onClick={handlePrev}
          hidden={photoNumber === 0 ? true : false}
          >&#10094;
        </a>
        <a className="next"
          style={arrowStyleNext}
          onClick={handleNext}
          hidden={photoNumber === photoList.length - 1 ? true : false}
          >&#10095;
        </a>
    </div>
  </>
  )
}


export default MainPhoto;