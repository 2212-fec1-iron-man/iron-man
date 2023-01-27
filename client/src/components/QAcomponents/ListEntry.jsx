import AList from './AList.jsx';
import {useState} from 'react';
import ReactModal from 'react-modal';




const ListEntry = (props) => {
  // set helpfulnessCount for showing the current question helpfulness data
  const [helpfulnessCount, setHelpfulnessCount] = useState(props.question.question_helpfulness)
  // this is handle after the click, the helpfulness accumulate
  const voteOnHelp = (questionId) => {
    setHelpfulnessCount(helpfulnessCount + 1);
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  // this is gonna handle the add answer button
  const addAnswer = (questionId) => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div>
      <div className="question-container">
        <h2>Q: {props.question.question_body}</h2>
        <p>
          <button onClick={() => voteOnHelp(props.question.quesiton_id)}>Helpful? <a url="rul">YES</a> <a>{helpfulnessCount}</a></button>
          <button onClick={() => addAnswer(props.question.question_id)}>Add Answer</button>
        </p>
      </div>
      <AList answers={props.question.answers}/>
      {isModalOpen && (
    <div>
        <form>
            <textarea placeholder="Enter your answer here"></textarea>
            <input type="file" accept="image/*" />
            <button>Add Answer</button>
        </form>
    </div>
)}
    </div>
  )
}

export default ListEntry