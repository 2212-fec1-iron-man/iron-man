import AnswerEntry from './AnswerEntry.jsx';
import { useState, useEffect } from 'react';

const AList = (props) => {
  // console.log("show me the props in AList :", props)

  const answersArray = Object.values(props.answers);
  const [numAnswersDisplayed, setNumAnswersDisplayed] = useState(2);
  const [showMore, setShowMore] = useState(true);
  const [overflow, setOverflow] = useState('hidden')

  return (

    <div className="flexbox-item answer-list" style={{ display: 'inline-block', width: '100%', maxHeight: '600px', overflowY: overflow }}>

      <div>
        {answersArray.slice(0, numAnswersDisplayed).map((answer, index) => (
            <AnswerEntry key={index} answer={answer} />
        ))}

        {answersArray.length > numAnswersDisplayed && (
          <button className="butLoadMoreAns" onClick={() => {
              setNumAnswersDisplayed(showMore ? numAnswersDisplayed + 2 : 2);
              setShowMore(!showMore);
              setOverflow(showMore ? 'scroll' : 'hidden');
              console.log("what is showMore value now :", showMore)
          }}>
              {showMore ? 'LOAD MORE ANSWERS 👈' : 'COLLAPSE ANSWERS 👈'}
          </button>
        )}
      </div>
    </div>
  );
}

export default AList;

