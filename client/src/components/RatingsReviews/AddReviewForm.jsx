import React, {useState} from 'react';
import Modal from 'react-modal';
import ReactModal from 'react-modal';
import axios from 'axios';
import StarRatingForm from './StarRatingForm.jsx';
import CharacteristicForm from './CharacteristicsForm.jsx';
import styled from 'styled-components';



// const UserEmailText = styled.span`
//   font-style: italic
//   color:gray;
//   // font-size: medium;
// `

const UserEmailText = styled.span`
  color: #D3D3D3;
  font-style: italic
`

const SideText = styled.span`
    color: #D3D3D3;
    font-size: medium;
    position: absolute;
    right: 50px;
`

const AddReviewForm = ({characteristics, product_id, closeModal} ) => {

  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [charChosen, setCharChosen] = useState({});

 // const [toggle, setToggle] = useState(true)
 const [wordCount, setWordCount] = useState(0);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [fileInputs, setFileInputs] = useState([0]);

  const charKeys = Object.keys(characteristics);
  // console.log('LET"S SEEEEEEE ->>>>', charChosen)

  const handleSubmit = (event) => {
    closeModal();
    event.preventDefault();

    let photos = [];
    for (let i = 0; i < fileInputs.length; i++) {
      if (event.target[`photos-${i}`].files.length > 0) {
        photos.push(event.target[`photos-${i}`].files[0].name);
      }
    }

    const data = {
      summary: reviewSummary,
      body: reviewBody,
      username: username,
      email: email,
      product_id: product_id,
      date: new Date(),
      rating: rating,
      characteristics: charChosen,
      recommend: recommend,
      photos: photos
    };


  axios.post(`/api/reviews`, data)
    .then((response) => {
      alert("Success! Your review has been submitted.");
    setTimeout(() => {
      closeModal();
    }, 1000);
    })
    .catch ((error) => {
      console.log(error);
    })
  }

  const handleCharChosen = (event)=>  {
    setCharChosen(previewState => ({
      ...previewState,
      [event.target.name]: Number(event.target.value)
    }));
  }


  const addFileInput = () => {
    if (fileInputs.length < 5) {
      setFileInputs([...fileInputs, fileInputs.length]);
    }
  }


  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setIsValidEmail(re.test(value));
  }

  const handleTypeText = (event) => {
    const value = event.target.value;
    setWordCount(value.length);
    setReviewBody(value)
  }

    return (

      <form className='iron-man-form'onSubmit={handleSubmit}>
        <h4>Write a review for this product</h4>
        <br/>
        <label>
          Summary:
          <br />
          <textarea type='text' value={reviewSummary} onChange = {(e) =>  setReviewSummary(e.target.value)} maxLength="60" placeholder={'Example: Best purchase ever!'} style={{ height: '50px', width: '390px' }}/>
          <br />
        </label>
        <br />
        <br />
        <label>
          Body:
          <br />
          <textarea required type='text' value={reviewBody} onChange={handleTypeText} minLength={50} maxLength={1000} placeholder={'Why did you like the product or not?'} style={{ height: '100px', width: '390px' }}></textarea>
          <br />
          {wordCount > 59 ? <span></span> : <SideText className="char-count"> &nbsp; &nbsp; {60 - wordCount} characters left</SideText>}
        </label>
        <br />
        <br />
        <label>
          Username: &nbsp;
          <input required type='text' value={username} onChange = {e => setUsername(e.target.value)} placeholder={'Example: jackson11!'}/>
        </label>
        <br />
        <UserEmailText>For privacy reasons, do not use your full name or email address</UserEmailText>
        <br />
        <br />
        <label>
          Email: &nbsp;
          <input required type='email' value={email} onChange = {handleEmailChange} placeholder={'Example: jackson11@email.com'}/>
          {isValidEmail ? <span style={{ color: "green" }}> &#10003; </span> : <SideText className="add-email"> &nbsp; Invalid Email format</SideText>}
        </label>
        <br />
        <UserEmailText>For authentication reasons, you will not be emailed </UserEmailText>
        <br />
        <br />
        <label>
          Rating:
           <StarRatingForm required rating={rating} setRating={setRating}/>
        </label>
        <br />
        <br />
        <div>
        <label>
          Characteristics:
          {charKeys.map(key => <CharacteristicForm required characteristic={key} value={characteristics[key]} allChars={charKeys} handleCharChosen={handleCharChosen} charChosen={charChosen}/>)}
        </label>
        </div>
        <br />

        <label>
          Recommend:
          <input required type='radio' value={true} name='recommend?' onChange = {(e) => {setToggle(!toggle); setRecommend(e.target.value) }}/> Yes
        </label>
        <label>
          <input required type='radio' value={false} name='recommend?' onChange = {(e) => {setToggle(!toggle); setRecommend(e.target.value) }}/> No
        </label>
        <br />
        <br />
        <label>
        Add photos:
        <br />
        <br />
        {fileInputs.map((input, index) => (
                <div key={index}>
                  <input key={index}  type="file" name={`photos-${index}`} accept="image/*" />
                  <br />
                  <br />
                </div>
              ))}
              {fileInputs.length < 5 && (
                <button className='add-photo-button' onClick={(event) => {
                  event.preventDefault();
                  addFileInput();
                }}>Add Another Photo</button>
              )}
            <br/>
            <br/>
        </label>
        <button className='submit-button' required type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    )
}
export default AddReviewForm;