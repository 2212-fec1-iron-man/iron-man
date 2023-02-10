import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import Styles from "./Styles.jsx";
import Checkout from "./Checkout.jsx";
import Stars from "../RatingsReviews/Stars.jsx";


const ProdInfo = ({productID, styleNumber, setStyleNumber}) => {


  const [styleEntry, setStyleEntry] = useState({});
  const [prodEntry, setProdEntry] = useState({});
  const [newCategory, setNewCategory] = useState("");
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    axios.get(`/products/${productID}/styles`)
    .then((response) => {
      setStyleEntry(response.data.results[styleNumber] !== undefined ? response.data.results[styleNumber] : {});
    })
    .catch((error) => {
      console.log('this is an axios get error in ProdInfo.jsx: ', error);
    })

    axios.get(`/products/${productID}`)
    .then((response) => {
      setProdEntry(response.data);
      setNewCategory(response.data.category.toUpperCase())
    })
    .catch((error) => {
      console.log('this is an axios get error in ProdInfo.jsx: ', error);
    })

    axios.get(`/reviews/meta?product_id=${productID}`)
    .then((res) => {
      setAverageRating(calculateAverageRating(res.data.ratings));
    })

  },[styleNumber, productID]);


  function calculateAverageRating(obj) {
    let sum = (obj[1] * 1) + (obj[2] * 2) + (obj[3] * 3) + (obj[4] * 4) + (obj[5] * 5);
    let count = Number(obj[1]) + Number(obj[2]) + Number(obj[3]) + Number(obj[4]) + Number(obj[5])
    return Math.round((sum/count) * 10) / 10;
  }

  //CSS:
  const prodNameStyle = {
    fontFamily: "Helvetica",
    fontSize: "40px",
    padding: "0 15px 0 15px"
  }

  const categoryStyle = {
    fontFamily: "Helvetica",
    fontSize: "16px",
    padding: "0 15px 0 15px"
  }

  const priceContainerStyle = {
    display: "flex",
  }

  const prodPriceStyle = {
    fontFamily: "Helvetica",
    fontSize: "16px",
    padding: "15px"
  }

  const prodPriceSlashStyle = {
    fontFamily: "Helvetica",
    textDecoration: "line-through",
    fontSize: "16px",
    padding: "15px"
  }

  const salePriceStyle = {
    fontFamily: "Helvetica",
    color: "red",
    fontSize: "16px",
    padding: "15px"
  }

  const reviewStyle = {
    display: "flex",
    fontFamily: "Helvetica",
    fontSize: "10px",
    padding: "15px"
  }

  const styleTypeStyle = {
    fontFamily: "Helvetica",
    fontSize: "16px",
    padding: "15px"
  }

  const prodInfoContainerStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px"
  }

  const stylesStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "left",
    justifyContent: "flex-start"
  }

  return (
    <>
    {Object.keys(styleEntry).length === 0 ? <div>Data not available</div> :
  <>
    <div className="prodInfoContainer" style={prodInfoContainerStyle}>
      <div>
        <div className="review" style={reviewStyle}>
          <Stars className='average-star' rating={averageRating}/>
          <a href="#ratings-reviews" style={{color: "Gray", paddingLeft: "15px"}}>Read all reviews</a>
        </div>
        <div className="category" style={categoryStyle}>
          {newCategory}
        </div>
        <div className="prodName" style={prodNameStyle}>
          <b>{prodEntry.name}</b>
        </div>
        <div className="priceContainer" style={priceContainerStyle}>
            <div className="prodPrice" style={styleEntry.sale_price ? prodPriceSlashStyle : prodPriceStyle}>
              ${styleEntry.original_price ? styleEntry.original_price : ''}
            </div>
            <div className="salePrice" style={salePriceStyle}>
              {styleEntry.sale_price ? '$' + styleEntry.sale_price : ''}
            </div>
        </div>
        <div className="styleType" style={styleTypeStyle}>
        <b>Style</b> &nbsp; > &nbsp;{styleEntry.name}
        </div>
      </div>
      <div className="styles" style={stylesStyle}>
        <Styles
          styleNumber={styleNumber}
          setStyleNumber={setStyleNumber}
          productID={productID}
          />
      </div>
      <div className="checkout">
        {Object.keys(styleEntry).length !== 0 ?
          <Checkout
          productID={productID}
          styleNumber={styleNumber}
          styleEntry={styleEntry}
          />
          : "Loading"
        }
      </div>
    </div>
  </>
      }
      </>
  )
}


export default ProdInfo;