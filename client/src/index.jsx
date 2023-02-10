import React from "react";
import {useEffect, useState} from "react";
import QAIndex from './components/QAcomponents/QAIndex.jsx';
import ReactDOM from "react-dom";
import RatingsReviews from "./components/RatingsReviews/RatingsReviews.jsx";
import Overview from "./components/OverviewComponents/Overview.jsx";


const App = () => {

  const [productID, setProductID] = useState(37311);

  const onClick = () => {
    //start: 37311
    //end: 38321
    setProductID(37311+Math.floor(Math.random()*(38321-37311+1)));
  }



  const logoStyle = {
    height: "100px",
    width: "auto",
    background: "white"
  }

  const logoContainerStyle = {
    display: "flex",
    justifyContent: "center",
    background: "white"
  }

  return (
    <>
    <div className="logoContainer" style={logoContainerStyle}>
      <img style={logoStyle} src="starklogo.png" onClick={onClick}/>
    </div>
    <div>
      <Overview productID={productID}/>
      <QAIndex />
      <RatingsReviews product_id={productID}/>
    </div>
    </>
  )
}




ReactDOM.render(<App/>, document.getElementById('root'))