import ListEntry from './ListEntry.jsx';

const QAList = (props) => {
  // console.log("now im in QAList, now the props looks like: ", props, "and types of props are: ", typeof (props));
  const questionArray = Object.values(props.qaData)

  return (
    <div className="qa-list">
      {questionArray.slice(0, props.questionsToShow).map(question => (
        <ListEntry
          key={question.question_id}
          question={question}/>
      ))}
    </div>
  )
}

export default QAList;