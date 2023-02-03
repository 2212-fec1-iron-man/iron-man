import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Stars from './Stars.jsx';
import StarsBars from './StarsBars.jsx';
import CharacteristicBreakdown from './CharacteristicBreakdown.jsx';


const Ratings = ({product_id}) => {
  const[ratingsData, setRatingsData] = useState({})
  const[ratings, setRatings] = useState();
  const[averageRating, setAverageRating] = useState(0);
  const[recommendPerc, setRecommendPerc] = useState(0);
  const[starsPercentage, setStarPercentage] = useState({5: 0, 4: 0, 3: 0, 2: 0, 1: 0})
  const[characteristics, setcharacteristics] = useState({})

  useEffect(() => {
    //const product_id = 37315
    axios.get(`http://localhost:3000/reviews/meta?product_id=${product_id}`)
    .then((res) => {
      setRatingsData(res.data);
      setRatings(res.data.ratings);
      setcharacteristics(res.data.characteristics);
      setAverageRating(calculateAverageRating(res.data.ratings));
      setRecommendPerc(calculatePercentageRecommend(res.data.recommended));
      setStarPercentage(calculateStarPercentage(res.data.ratings));
    })
  }, [product_id])

  function calculateAverageRating(obj) {
    let sum = (obj[1] * 1) + (obj[2] * 2) + (obj[3] * 3) + (obj[4] * 4) + (obj[5] * 5);
    let count = Number(obj[1]) + Number(obj[2]) + Number(obj[3]) + Number(obj[4]) + Number(obj[5])
    return Math.round((sum/count) * 10) / 10;
  }

  function calculatePercentageRecommend(obj) {
    return Math.round(Number(obj.true)/ (Number(obj.true) + Number(obj.false)) * 100)
  }

  function calculateStarPercentage(obj) {
    let sum = Number(obj[5]) + Number(obj[4]) + Number(obj[3]) + Number(obj[2]) + Number(obj[1]);
    return ({
      5: Math.round((Number(obj[5])/sum) * 100) + '%',
      4: Math.round((Number(obj[4])/sum) * 100) + '%',
      3: Math.round((Number(obj[3])/sum) * 100) + '%',
      2: Math.round((Number(obj[2])/sum) * 100) + '%',
      1: Math.round((Number(obj[1])/sum) * 100) + '%'
    })
  }
  //  console.log('all rating data: ', ratingsData)
  //  console.log('ratings: ', ratings)
  //  console.log('characteristics: ', characteristics)
  //console.log(starsPercentage)
  return (
  <div>
    <div> Ratings</div>
    <div> {averageRating}</div>
    <Stars rating={averageRating}/>
    <div>{recommendPerc}% of reviews reccomend this product</div>
    <StarsBars percentages={starsPercentage} rating={ratings}/>
    {Object.keys(characteristics).map((key) => {
      return (
          <CharacteristicBreakdown category={key} characteristic={characteristics[key].value}/>
      )
    })}

  </div>

  )
}

export default Ratings;