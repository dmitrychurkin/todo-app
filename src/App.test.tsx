import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

import App from './App';

test("renders app successfully", async () => {
  await act(async () => {
    render(<App />);
  });

  const container = await screen.findByTestId(/auth|main/i);
  expect(container).toBeInTheDocument();
});
