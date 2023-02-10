import React, {useState, useEffect} from 'react';
import Ratings from './Ratings.jsx';
import ReviewsList from './ReviewsList.jsx';
import axios from 'axios';

const RatingsReviews = ( {product_id} /* product_id produt_id from overview component*/) => {
  // const product_id = 37311

  // Reviews
  const[reviews, setReviews] = useState([]);
  const[sortBy, setSortBy] = useState(sortBy || 'relevant');
  const[reviewsShown, setReviewsShown] = useState(2);

  const[allReviews, setAllReviews] = useState([])

  useEffect(() => {
    axios.get(`/reviews?count=5000&sort=${sortBy}&product_id=${product_id}`)
    // axios.get(`http://localhost:3000/reviews?count=5000&sort=${sortBy}&product_id=${product_id}`)
    .then((res) => {
      setReviews(res.data.results);
      setAllReviews(res.data.results)
    });
  }, [sortBy, product_id]);

  const handleReviewsShown = () => {
    setReviewsShown(reviewsShown + 2)
  }

  const handleSortBy = (input) => {
    setSortBy(input)
  }

  // Ratings
  const[ratingsData, setRatingsData] = useState({})
  const[ratings, setRatings] = useState([]);
  const[averageRating, setAverageRating] = useState(0);
  const[recommendPerc, setRecommendPerc] = useState(0);
  const[starsPercentage, setStarPercentage] = useState({1: 0, 2: 0, 3: 0, 4: 0, 5: 0})
  const[characteristics, setcharacteristics] = useState({})

  useEffect(() => {
    axios.get(`/reviews/meta?product_id=${product_id}`)
    .then((res) => {
      setRatingsData(res.data);
      setRatings(res.data.ratings);
      setcharacteristics(res.data.characteristics);
      setAverageRating(calculateAverageRating(res.data.ratings));
      setRecommendPerc(calculatePercentageRecommend(res.data.recommended));
      setStarPercentage(calculateStarPercentage(res.data.ratings));
    })
  }, [product_id])

  function calculateAverageRating(rating) {
    let sum = (rating[1] * 1) + (rating[2] * 2) + (rating[3] * 3) + (rating[4] * 4) + (rating[5] * 5);
    let total = Number(rating[1]) + Number(rating[2]) + Number(rating[3]) + Number(rating[4]) + Number(rating[5])
    return Math.round((sum/total) * 10) / 10;
  }

  function calculatePercentageRecommend(recommend) {
    return Math.round(Number(recommend.true)/ (Number(recommend.true) + Number(recommend.false)) * 100)
  }

  function calculateStarPercentage(rating) {
    let sum = Number(rating[1]) + Number(rating[2]) + Number(rating[3]) + Number(rating[4]) + Number(rating[5]);
    return ({
      1: Math.round((Number(rating[1])/sum) * 100) + '%',
      2: Math.round((Number(rating[2])/sum) * 100) + '%',
      3: Math.round((Number(rating[3])/sum) * 100) + '%',
      4: Math.round((Number(rating[4])/sum) * 100) + '%',
      5: Math.round((Number(rating[5])/sum) * 100) + '%'
    })
  }

  return (
    <div id='ratings-reviews'>
      <h5 data-testid="test-1" className='ratings-reviews-title'> RATINGS & REVIEWS</h5>
      <Ratings product_id={product_id} ratingsData={ratingsData} ratings={ratings} averageRating={averageRating} recommendPerc={recommendPerc} starsPercentage={starsPercentage} characteristics={characteristics} reviews={reviews} setReviews={setReviews} allReviews={allReviews} sortBy={sortBy}/>
      <ReviewsList product_id={product_id} reviews={reviews} sortBy={sortBy} reviewsShown={reviewsShown} handleSortBy={handleSortBy} handleReviewsShown={handleReviewsShown} characteristics={characteristics} allReviews={allReviews}/>
    </div>
  );
}

export default RatingsReviews;
