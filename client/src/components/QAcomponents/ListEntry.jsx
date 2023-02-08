import AList from './AList.jsx';
import {useState} from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import styled from 'styled-components';

const BottomLine = styled.div`
background-color: #D3D3D3;
height: 2px;
width: 100%;
margin-top: 20px;
margin-bottom:15px;
`
const ListEntry = (props) => {
  // console.log("ListEntry props looks like: ", props)
  // set helpfulnessCount for showing the current question helpfulness data
  const [helpfulnessCount, setHelpfulnessCount] = useState(props.question.question_helpfulness)
  // state for voting helpful
  const [votedHelpful, setVotedHelpful] = useState(false);
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isValidEmail, setIsValidEmail] = useState(false);
  // handle the photos upload
  const [fileInputs, setFileInputs] = useState([0]);
  const addFileInput = () => {
    if (fileInputs.length < 3) {
      setFileInputs([...fileInputs, fileInputs.length]);
    }
  }

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setIsValidEmail(re.test(value));
  }

  const handleBodyChange = (event) => {
    const value = event.target.value;
    setBody(value);
    setWordCount(value.split(" ").length);
  }

  const handleVote = (questionId) => {
    // console.log("correct question ID here?", questionId)
    axios.put(`http://localhost:3000/qa/questions/${questionId}/helpful`)
    .then((response) => {
      // alert("Thanks for voting this question helpful! ");
      // console.log(response.data);
      setVotedHelpful(true);
    })
    .catch((error) => {
      // alert("This question helpful voting got error", error);
    })
  }

  // this is handle after the click, the helpfulness accumulate
  const voteOnHelp = (questionId) => {
    // console.log("voteOnHep func, which question is dealing with right now ?", questionId);
    setHelpfulnessCount(helpfulnessCount + 1);

    handleVote(questionId);
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  // this is gonna handle the add answer button
  const addAnswer = (questionId) => {
    setIsModalOpen(!isModalOpen);
  }
  // console.log("in listEntry, i want to see the question_id :", props.question.question_id);
  // console.log("what is props here looks like?", props)
  return (
    <div >
      <div className="question-container" key={props.question.question_id}>
        <h4 className="question-body" key={props.question.question_id + 1}>Q: {props.question.question_body}</h4>
        <div key={props.question.question_id} className="question-actions" >
        <button data-testid="question-helpful-btn" className="question-help">
          Helpful? &nbsp;
          <u data-testid="question-helpful-value"
            onClick={() => {
              if (!votedHelpful) {
                voteOnHelp(props.question.question_id);
              }
            }}
            disabled={votedHelpful}
          >
            {votedHelpful ? 'Voted' : `Yes (${helpfulnessCount})`}
          </u>
        </button>
          <button key={props.question.question_id} data-testid="add-answer-btn" className="question-addAnswer" >| &nbsp; <u  onClick={() => addAnswer(props.question.question_id)}>Add Answer</u></button>
        </div>
      </div>
      <div className='flexbox-container'>
        <h4 className="answer-head">A:</h4>
        <AList answers={props.question.answers}/>
        {/* ariaHideApp is used here to prevent ReactModal fault in console */}
      </div>
      <BottomLine></BottomLine>
      <ReactModal data-testid="add-answer-modal" isOpen={isModalOpen} ariaHideApp={false} style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            height: 'auto',
            border: 'none',
            background: 'none'
          }
        }}>
          <button className="close-button" style={{ color: 'black', cursor: 'pointer', position: 'absolute', top: '25px', right: '25px', background:'none', border:'none' }}onClick={() => setIsModalOpen(false)}>[Close]</button>

        <form data-testid="add-answer-modal" className="iron-man-form" onSubmit ={(event) => {
          event.preventDefault();
          let photos = [];
          for (let i = 0; i < fileInputs.length; i++) {
            if (event.target[`photos-${i}`].files.length > 0) {
              photos.push(event.target[`photos-${i}`].files[0].name);
            }
          }

          const data = {body: event.target.body.value, name: event.target.name.value, email: event.target.email.value, photos: photos}


          const addAnsUrl = `http://localhost:3000/api/qa/questions/${props.question.question_id}/answers`;

          axios.post(addAnsUrl, data)
          .then((response) => {
            // alert("Success! Your answer has been submitted.")
            setIsModalOpen(false);
          })
          .catch((error) => {
            console.log('answer submit error.')
          })
        }}>
          <div className="form-group">
            <h2 key={props.question.question_id}data-testid="add-answer-modal-header" className="form-title">Submit Your Answer 👇</h2>
            <textarea className="form-input" name="body" placeholder="Enter your answer here" onChange={handleBodyChange} style={{ height: '200px', width: '350px' }}></textarea>
            {wordCount >= 5 ? <span style={{ color: "green" }}> &#10003; </span> : <span className = "add-answer-body">  {5 - wordCount} words to submit </span> }
            <br/>
            <br/>
            <br/>
            {fileInputs.map((input, index) => (
                <div key={index}>
                  <input key={index} className="form-input" type="file" name={`photos-${index}`} accept="image/*" />
                  <br />
                  <br />
                </div>
              ))}
              {fileInputs.length < 3 && (
                <button data-testid="add-answer-modal-addphoto"  className="addphoto-submit" onClick={(event) => {
                  event.preventDefault();
                  addFileInput();
                }}>Add Another Photo</button>
              )}
            <br/>
            <br/>

            <input  className="form-input" type='text' name='name' placeholder='Your Name' />
            <br/>
            <br/>
            <input  className="form-input" type='email' name='email' placeholder='Your Email' onChange={handleEmailChange}/>
            {isValidEmail ? <span style={{ color: "green" }}> &#10003; </span> : <span className="add-answer-email"> Invalid Email format</span>}
            <br/>
            <br/>
            <button  data-testid="add-answer-modal-submit"   className="form-submit" type="submit" disabled={wordCount < 5 || !isValidEmail}>Add Answer</button>
          </div>
        </form>
      </ReactModal>
    </div>
  )
}
export default ListEntry;
