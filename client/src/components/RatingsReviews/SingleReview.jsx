import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stars from './Stars.jsx';
import styled from 'styled-components';
import { GrCheckmark } from 'react-icons/gr'
import EnlargedImageModal from './EnlargedImage.jsx'

const BottomLine = styled.div`
background-color: #D3D3D3;
height: 2px;
width: 100%;
margin-top: 20px;
margin-bottom:15px;
`

const SingleReview = ({ review }) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulness);
  const [alreadyVoted, setAlreadyVolted] = useState(false);
  // console.log('review', review)
  const handleVoteCount = (review_id) => {
    axios.put(`http://localhost:3000/reviews/${review_id}/helpful`)
      .then((res) => {
        setAlreadyVolted(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const increaseHelpCount = (review_id) => {
    setHelpfulCount(helpfulCount + 1);
    handleVoteCount(review_id);
  }

  const months = ['Januray', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const date = new Date(review.date)


  const [isOpen, setIsOpen] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [enlargePhotoIndex, setEnlargedPhotoIndex] = useState(-1);

  const handlePhotoClick = (index) => {
    setEnlargedPhotoIndex(index);
    setIsEnlarged(!isEnlarged);
  }

  return (
    <div className='single-review'>
      <span>
        <div className='star-rating'><Stars rating={review.rating} /> </div>
        <div className='name-date'>{review.reviewer_name}, &nbsp; {`${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`}
        </div>
      </span>
      <div className='review-summary'>{review.summary}</div>
      <div className='review-body'>{review.body}</div>
      <div className='review-recommend'>{review.recommend ? <div> <GrCheckmark /> &nbsp; I recommend this product </div> : ''}</div>
      <div className='review-response'>{review.response}</div>

      <div className='review-phots'>{review.photos.map((photo, index) => {
        return (
          <img key={photo.id} src={photo.url}
            onClick={() => handlePhotoClick(index)} alt="review photo"
            className={index === enlargePhotoIndex && isEnlarged ? 'enlarged-photo' : 'review-photo-orign'} />
        )
      })}
      <EnlargedImageModal
              imageUrl={review.photos[enlargePhotoIndex] !== undefined ? review.photos[enlargePhotoIndex].url : ''}
              isOpen={isEnlarged}
              ariaHideApp={false}
              onClose={() => setIsEnlarged(false)}
            />
      </div>


      <button data-testid='help' className="review-help"> Helpful? &nbsp; | &nbsp;
        <u onClick={() => { if (!alreadyVoted) { increaseHelpCount(review.review_id) } }}
          disabled={alreadyVoted}
        >
          {alreadyVoted ? 'Already voted' : `Yes (${helpfulCount})`}
        </u>
      </button>
      {/* <button className='review-report'>Report</button> */}
      <BottomLine></BottomLine>

    </div>
  )
}

export default SingleReview