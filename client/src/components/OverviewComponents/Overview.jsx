import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import MainPhoto from "./MainPhoto.jsx";
import ProdInfo from "./ProdInfo.jsx";
import AdditionalInfo from "./AdditionalInfo.jsx";
import styled from 'styled-components';


const BottomLine = styled.div`
background-color: #D3D3D3;
height: 2px;
width: 100%;
margin-top: 0px;
margin-bottom:15px;
`

const Overview = ({productID}) => {

  const [photoNumber, setPhotoNumber] = useState(0);
  const [styleNumber, setStyleNumber] = useState(0);

  const photoAndProdInfoContainerStyle = {
    display: "flex"
  }

  const overallContainerStyle = {
    display: "flex",
    flexDirection: "column"
  }

  const centeringContainerStyle = {
    display: "flex",
    justifyContent: "center"
  }

  return (
    <div className="centeringContainer" style={centeringContainerStyle}>

    <div className="overallContainer" style={overallContainerStyle}>
      <BottomLine></BottomLine>
        <div className="photoAndProdInfoContainer" style={photoAndProdInfoContainerStyle}>
          <MainPhoto
              productID={productID}
              photoNumber={photoNumber}
              setPhotoNumber={setPhotoNumber}
              styleNumber={styleNumber}
              />
          <ProdInfo
              productID={productID}
              styleNumber={styleNumber}
              setStyleNumber={setStyleNumber}
              />
        </div>
        <div>
          <AdditionalInfo
            productID={productID}
            />
        </div>
      <BottomLine></BottomLine>
    </div>
  </div>
  )
}

export default Overview;