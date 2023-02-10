import React, { useState } from "react";
import { ImStarFull, ImStarEmpty, ImStarHalf} from "react-icons/im";

const StarRatingForm = ({rating, setRating}) => {

  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <ImStarFull/>
          </button>
        );
      })}
    </div>
  );
};

export default StarRatingForm;