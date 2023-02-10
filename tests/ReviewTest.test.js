import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/react/dont-cleanup-after-each';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor, cleanup, fireEvent, waitForElement} from '@testing-library/react';
import RatingsReviews from '../client/src/components/RatingsReviews/RatingsReviews.jsx';



describe('Review tests', () => {
  afterEach(cleanup);
  const user = userEvent.setup()

  it('Review Test ', () => {
    render(<RatingsReviews />);
    const head = screen.getByTestId("test-1");

    // console.log("the actual head i got :",head)
    expect(head).toHaveTextContent('RATINGS & REVIEWS');
  });


})