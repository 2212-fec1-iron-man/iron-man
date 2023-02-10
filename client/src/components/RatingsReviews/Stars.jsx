import React, {useState, useEffect} from 'react';
import { ImStarFull, ImStarEmpty, ImStarHalf} from "react-icons/im";

const Stars = ({rating}) => {
  const totalStars = 5;
  const stars = Array.from({length: totalStars}, () => <ImStarEmpty />);
  let i;
  for (i = 0; i < rating; i++) {
    stars[i] = <ImStarFull />;
  }

  if (rating % 1 != 0)
    stars[i-1] = <ImStarHalf />;

  return (
    <div className="rating">{stars}</div>
  );
}

export default Stars;