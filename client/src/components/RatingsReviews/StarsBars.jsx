import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// const ContainerStyle = styled.div`
//   height: 10px;
//   width: 359px;
//   background-color: grey;
//   margin-left: 50px;
//   margin-top: 10px;
//   //margin-bottom: 10px;
// `
// const FillerStyles = styled.div`
//   height: 100%;
//   background-color: green;
//   width: 0%;
// `
// const LabelStyles = styled.span`
//   padding: 5px;
//   color: green;
// `

// const StarNum = styled.span`
//   position: absolute;
//   bottom: 5px;
//   left: 161px;
//   font-size: 9px;
// `

const GrayBar = styled.div`
  height: 10px;
  width: 235px;
  background-color: #D3D3D3;
  margin: 0px;
  margin-top: 10px;
  &:hover {
    background-color: red;
  }
`
const GreenBar = styled.div`
  height: 100%;
  background-color: #009f00;
  width: 0%;
  &:hover {
    background-color: red;
  }
`
const RatingsNum = styled.span`
  padding: 5px;
  color: black;
  position: absolute;
  left: 240px;
  bottom: 10px;
  font-size: small;
  &:hover {
    color: red;
  }
`
const StarNum = styled.u`
  // padding: 5px;
  color: black;
  position: absolute;
  left: -50px;
  bottom: 14px;
  font-size: small;
  &:hover {
    color: red;
  }
`

const Container = styled.div`
  position: relative;
  width: 335px;
  left: 50px;
  height:25px;
  margin: 0px;
`

const StarsBars = ({ percentages, rating, num, reviews, setReviews, allReviews}) => {
  // console.log('Reviews --->', reviews)

  const [isHover, setIsHover] = useState(false);
  const [toggle, setToggle] = useState(true)
  const [removeFilters, setRemoveFilters] = useState(false);

  const handleMouseEnter = () => {
     setIsHover(true);
  };

  const handleMouseLeave = () => {
     setIsHover(false);
  };

  const filterReviews = (num) => {
    if (toggle) {
    const numClicked = Number(num);
    const newArr = [];
    // console.log(num)
    // const filteredReviews = reviews.filter((review) => {
    //   review.rating === numClicked
    // })
    // setReviews(filteredReviews)
    for (let i = 0; i < allReviews.length; i++) {
      const singleReview = allReviews[i];
      if (singleReview.rating === numClicked) {
        newArr.push(singleReview);
      }
    }
    setReviews(newArr)
    setToggle(!toggle)
    setRemoveFilters(!removeFilters)
    } else {
      setReviews(allReviews)
      setToggle(!toggle)
    }
  }

  useEffect(() => {

  }, [reviews])
  return (
    <Container>
      {/* <div>{removeFilters === true ? <button>Remove filters</button> : '' }</div> */}
      <GrayBar onClick={((event) =>  {filterReviews(num)})} onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
        <StarNum>{num} stars</StarNum>
        <GreenBar style={{ width: `${percentages}` }}>
          <RatingsNum>{rating.length !== 0 && rating[num] !== undefined ? rating[num] : ''} reviews</RatingsNum>
        </GreenBar>
      </GrayBar>
    </Container>
  );
};



export default StarsBars;
