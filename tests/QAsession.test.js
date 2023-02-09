import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/react/dont-cleanup-after-each';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor, cleanup, fireEvent, waitForElement} from '@testing-library/react';


import QAIndex from '../client/src/components/QAcomponents/QAIndex.jsx';
import AList from '../client/src/components/QAcomponents/AList.jsx';
import QAList from '../client/src/components/QAcomponents/QAList.jsx';
import ListEntry from '../client/src/components/QAcomponents/ListEntry.jsx';
import AnswerEntry from '../client/src/components/QAcomponents/AnswerEntry';
import NewQuestionForm from '../client/src/components/QAcomponents/NewQuestionForm';
import axios from 'axios';

describe('QAIndex', () => {
  afterEach(cleanup);
  const user = userEvent.setup()

  it('renders QA head', () => {
    render(<QAIndex />);
    const head = screen.getByTestId('todo-1');

    // console.log("the actual head i got :",head)
    expect(head).toHaveTextContent('QUESTIONS & ANSWERS');
  });

  it ('There should be a ADD a question button on the screen', () => {

    render(<QAIndex />);
    const addQButton = screen.getByTestId("add-question-button" )
    expect(addQButton).toBeInTheDocument()
  })

  it ('There should be a More Answered question button on the screen', () => {

    render(<QAIndex />);
    const showQButton = screen.getByTestId("more-answered-questions" )
    expect(showQButton).toBeInTheDocument()
  })

  it ('There should be a question helpful button to click', () => {
    render(<ListEntry question={{answers: {2844077:{photos:[]}}, asker_name: 'tester', question_body:'tester', question_date:'test', question_helpfulness: 31, question_id: 34, reported:false}} />)
    const helpfulBtn = screen.getByTestId("question-helpful-btn")
    expect(helpfulBtn).toBeInTheDocument()
  })

  it ('There should be add answer button to click', () => {
    render(<ListEntry question={{answers: {2844077:{photos:[]}}, asker_name: 'tester', question_body:'tester', question_date:'test', question_helpfulness: 31, question_id: 34, reported:false}} />)
    const helpfulBtn = screen.getByTestId("add-answer-btn")
    expect(helpfulBtn).toBeInTheDocument()
  })


  it ('Each answer should have button for helpful voting ', () => {
    render(<AnswerEntry answer={{answerer_name:'tester', body: 'tester', date:'tester', helpful:1, id:1, photos:[]}}/>)
    const helpfulABtn = screen.getByTestId('answer-helpful-btn')
    expect(helpfulABtn).toBeInTheDocument()
  })

  it ('Each answer should have button for report ', () => {
    render(<AnswerEntry answer={{answerer_name:'tester', body: 'tester', date:'tester', helpful:1, id:1, photos:[]}}/>)
    const helpfulABtn = screen.getByTestId('answer-report-btn')
    expect(helpfulABtn).toBeInTheDocument()
  })

  it ('snap shots tests for AList component', () => {
    const answers = {
      1: { answerer_name: 'test1', body: 'test1', date: 'test1', helpfulness: 1, id: 1, photos: [] },
      2: { answerer_name: 'test2', body: 'test2', date: 'test2', helpfulness: 1, id: 1, photos: [] },
      3: { answerer_name: 'test3', body: 'test3', date: 'test3', helpfulness: 1, id: 1, photos: [] },
      4: { answerer_name: 'test4', body: 'test4', date: 'test4', helpfulness: 1, id: 1, photos: [] },
    };

    const { container } = render(<AList answers={answers} />);

    expect(container).toMatchSnapshot();
  })

  it ('Each answer should have button for helpful voting ', () => {
    render(<AnswerEntry answer={{answerer_name:'tester', body: 'tester', date:'tester', helpful:1, id:1, photos:[]}}/>)
    const helpfulABtn = screen.getByTestId('answer-helpful-btn')
    expect(helpfulABtn).toBeInTheDocument()
  })

  it ('answer helpful button should increase passing in helpfulness ', () => {
    render(<AnswerEntry answer={{answerer_name:'tester', body: 'tester', date:'tester', helpfulness:1, id:1, photos:[]}}/>)


    const helpfulButton = screen.getByTestId("answer-helpful-value")

    fireEvent.click(helpfulButton)

    expect(screen.getByTestId("answer-helpful-value").textContent).toBe("Yes (2) ");
  })

  it ('question helpful button should increase passing in helpfulness', () => {
    render(<ListEntry question={{answers: {2844077:{photos:[]}}, asker_name: 'tester', question_body:'tester', question_date:'test', question_helpfulness: 1, question_id: 34, reported:false}} />)


    const helpfulBtn = screen.getByTestId("question-helpful-btn")

    fireEvent.click(helpfulBtn)

    expect(screen.getByTestId("question-helpful-value").textContent).toBe("Yes (1)");
  })

  it ('snap shots tests for ListEntry component', () => {
    const question = {
      answers: {},
      asker_name: "Orval.Daugherty",
      question_body: "Recusandae nemo dolores.",
      question_date: "2021-06-22T00:00:00.000Z",
      question_helpfulness: 31,
      question_id: 304736,
      reported: false
    }

    const { container } = render(<ListEntry question={question} />);

    expect(container).toMatchSnapshot();
  })

  it('should render the form correctly', () => {
    const closeModal = jest.fn();
    const questionId = [1];
    const { getByText, getByPlaceholderText } = render(<NewQuestionForm closeModal={closeModal} questionId={questionId} />);

    expect(getByText('STARK VALUE YOUR QUESTIONS')).toBeInTheDocument();
    expect(getByText('Question Body:')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter your question')).toBeInTheDocument();
    expect(getByText('Your Name:')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter your name')).toBeInTheDocument();
    expect(getByText('Your Email:')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('Should increment helpful count when helpful button is clicked', () => {
    const question = {
      question_id: 1,
      question_body: 'What is your name?',
      question_helpfulness: 2,
      answers: []
    };
    const { getByTestId } = render(<ListEntry question={question} />);
    const helpfulBtn = getByTestId('question-helpful-btn');

    fireEvent.click(helpfulBtn);

    const helpfulValue = getByTestId('question-helpful-value');
    expect(helpfulValue.textContent).toBe('Yes (2)');
  });

  it ('Add answer button should pop a new window', () => {

    render(<ListEntry question={{answers: {1:{photos:[]}}, asker_name: 'tester', question_body:'tester', question_date:'test', question_helpfulness: 1, question_id: 1, reported:false}} />)
    const addAnswerButton = screen.getByText("Add Answer")
    fireEvent.click(addAnswerButton);

    expect(screen.getByTestId('add-answer-modal')).toBeInTheDocument();
  })

  it ('In the add answer pop up window, should include SUBMIT YOUR ANSWER header', () => {

    render(<ListEntry question={{answers: {1:{photos:[]}}, asker_name: 'tester', question_body:'tester', question_date:'test', question_helpfulness: 1, question_id: 1, reported:false}} />)
    const addAnswerButton = screen.getByText("Add Answer")
    fireEvent.click(addAnswerButton);

    expect(screen.getByTestId("add-answer-modal-header" )).toBeInTheDocument();
  })

  it ('In the add answer pop up window, should include add another photo button', () => {

    render(<ListEntry question={{answers: {1:{photos:[]}}, asker_name: 'tester', question_body:'tester', question_date:'test', question_helpfulness: 1, question_id: 1, reported:false}} />)
    const addAnswerButton = screen.getByText("Add Answer")
    fireEvent.click(addAnswerButton);

    expect(screen.getByTestId("add-answer-modal-addphoto")).toBeInTheDocument();
  })

  it ('In the add answer pop up window, should include submit button', () => {

    render(<ListEntry question={{answers: {1:{photos:[]}}, asker_name: 'tester', question_body:'tester', question_date:'test', question_helpfulness: 1, question_id: 1, reported:false}} />)
    const addAnswerButton = screen.getByText("Add Answer")
    fireEvent.click(addAnswerButton);

    expect(screen.getByTestId("add-answer-modal-submit")).toBeInTheDocument();
  })

  it('submits the form when all inputs are valid', async () => {
    const closeModal = jest.fn();
    const questionId = [1];

    const { getByPlaceholderText, getByText } = render(<NewQuestionForm closeModal={closeModal} questionId={questionId}/>);
    const questionInput = getByPlaceholderText('Enter your question');
    const nameInput = getByPlaceholderText('Enter your name');
    const emailInput = getByPlaceholderText('Enter your email');
    const submitButton = getByText('Submit');

    fireEvent.change(questionInput, { target: { value: 'test' } });

    fireEvent.change(nameInput, { target: { value: 'test' } });

    fireEvent.change(emailInput, { target: { value: '123@test.com' } });

    fireEvent.submit(submitButton);

    await waitFor (() => {
      expect(() => getByTestId("add-answer-modal")).toThrow();
    });
  });

  it('renders the question and answer in ListEntry', () => {
    const question = {
      question_id: 1,
      question_body: 'qtest',
      question_helpfulness: 10,
      answers: [
        {
          answer_id: 1,
          body: 'atest',
          date: '2022-01-01',
          helpfulness: 20,
          name: 'John Doe',
          photos: [],
        },
      ],
    };

    const { getByText } = render(<ListEntry question={question} />);

    expect(getByText('Q: qtest')).toBeInTheDocument();
    expect(getByText('atest')).toBeInTheDocument();
  });

  it ('snap shots tests for QAIndex component', () => {


    const { container } = render(<QAIndex />);

    expect(container).toMatchSnapshot();
  })

  it ('In the add answer pop up window, should include submit button', () => {

    render(<ListEntry question={{answers: {1:{photos:[]}}, asker_name: 'tester', question_body:'tester', question_date:'test', question_helpfulness: 1, question_id: 1, reported:false}} />)
    const addAnswerButton = screen.getByText("Add Answer")
    fireEvent.click(addAnswerButton);

    expect(screen.getByTestId("add-answer-modal-submit")).toBeInTheDocument();
  })

});