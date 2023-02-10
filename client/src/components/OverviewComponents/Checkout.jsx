import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";



const Checkout = ({styleEntry, productID, styleNumber}) => {


  const [sizeDropDown, setSizeDropDown] = useState([]);
  const [quantityDropDown, setQuantityDropDown] = useState([]);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(0);

  let isEmpty = false;
  if (styleEntry.skus !== undefined) {
    isEmpty = true;
    for (let key in styleEntry.skus) {
        if (styleEntry.skus[key].quantity !== 0) {
          isEmpty = false;
        }
    }
  }

  useEffect(() => {

    if (styleEntry.skus !== undefined) {
      let dropDown = Object.keys(styleEntry.skus).map((key, index) => {
            return (
              <option key={index} value={styleEntry.skus[key].size}>&nbsp;&nbsp;{styleEntry.skus[key].size}</option>
              )
            })
      setSizeDropDown(dropDown);
    }

    let quantityNormal = 0;
    if (styleEntry.skus !== undefined) {
      for (let key in styleEntry.skus) {
        if (styleEntry.skus[key].size === size) {
          //setQty(styleEntry.skus[key].quantity < 16 ? styleEntry.skus[key].quantity : 15);
          quantityNormal = styleEntry.skus[key].quantity < 16 ? styleEntry.skus[key].quantity : 15;
          break;
        }
      }
      //generate array with integers from 1 to quanity and use as dropdown values
      let qtyArray = [];
      for (let i = 2; i <= quantityNormal; i++) {
        qtyArray.push(i);
      }
      const finalQty = qtyArray.map((value, index) => {
        return (
          <option key={index} value={value}>&nbsp;&nbsp;{value}</option>
          )
        })
      setQuantityDropDown(finalQty);
    }
  },[styleEntry, size, productID]);

  const handleChange = (event) => {
    setSize(event.target.value);
  }

  const handleFavorite = (event) => {
    if (event.target.innerText === '☆') {
      event.target.innerText = '★';
    } else if (event.target.innerText === '★') {
      event.target.innerText = '☆';
    }
  }

  const handleClick = (event) => {
    //axios post call but something wrong with Cart API
  }

  //CSS:

  const sizeStyle = {
    height: "50px",
    width: "300px",
    margin: "15px",
    fontFamily: "Helvetica",
    fontSize: "16px"
  }

  const quantityStyle = {
    height: "50px",
    width: "150px",
    margin: "15px",
    fontFamily: "Helvetica",
    fontSize: "16px"
  }

  const checkoutContainerStyle = {
    display: "flex"
  }

  const addToCartContainerStyle = {
    display: "flex"
  }

  const socialMediaContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    padding: "15px"
  }

  const buttonStyle = {
    height: "50px",
    minWidth: "300px",
    margin: "15px",
    borderWidth: "thin",
    background: "white",
    fontFamily: "Helvetica",
    fontSize: "16px",
    textAlign: "left"
  }

  const hiddenButtonStyle = {
    visibility: "hidden",
    height: "50px",
    minWidth: "300px",
    margin: "15px",
    borderWidth: "thin",
    background: "white",
    fontFamily: "Helvetica",
    fontSize: "16px",
    textAlign: "left"
  }

  const favoriteStyle = {
    height: "50px",
    minWidth: "50px",
    margin: "15px",
    borderWidth: "thin",
    background: "white",
    fontFamily: "Helvetica",
    fontSize: "16px"
  }


  return (
  <>
    <div className="checkoutContainer" style={checkoutContainerStyle}>
      <div className="sizeDropdown">
        <select name="size" id="size" style={sizeStyle} onChange={handleChange} disabled={isEmpty === true ? true : false}>
          <option value="selectSize">&nbsp;&nbsp;{isEmpty === true ? "OUT OF STOCK" : "SELECT SIZE"}</option>
          {sizeDropDown}
        </select>
      </div>
      <div className="quantityDropdown">
        <select name="quantity" id="quantity" style={quantityStyle}>
          <option value="selectQuantity">&nbsp;&nbsp;{(size === "") ? '-' : 1}</option>
          {quantityDropDown}
        </select>
      </div>
    </div>
    <div className="addToCartContainer" style={addToCartContainerStyle}>
      <button id="addToCart" style={isEmpty ? hiddenButtonStyle : buttonStyle} onClick={handleClick}>&nbsp;&nbsp;ADD TO CART</button>
      <button id="addToFavorite" style={favoriteStyle} onClick={handleFavorite}>&#9734;</button>
    </div>
    <div className="socialMediaContainer" style={socialMediaContainerStyle}>
      <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg"/></a><script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
       <div className="facebook">
          <div id="fb-root"></div>
          <script>{(function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'))}</script>
          <div
            className="fb-share-button"
            data-href="http://localhost:3000"
            data-layout="button_count">
          </div>
       </div>
       <img src="saveButton.png" style={{width:"50px", height:"20px"}}></img>
       <a data-pin-do="buttonBookmark" href="https://www.pinterest.com/pin/create/button/"></a>

    </div>
  </>
  )
}

export default Checkout;