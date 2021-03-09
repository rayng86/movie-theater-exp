import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('renders nav element on toggle', () => {
  render(<App />);
  const toggleNavElement = screen.getByTitle('toggle theater controls');

  const navComponent = screen.queryByText(/Toggle Curtains/i);
  expect(navComponent).not.toBeInTheDocument();
  
  userEvent.click(toggleNavElement);
  
  const navComponentActive = screen.getByText(/Toggle Curtains/i);
  expect(navComponentActive).toBeInTheDocument();
});

test('theater lights is dimmed on toggle', () => {
  render(<App />);
  const toggleNavElement = screen.getByTitle('toggle theater controls');
  const displayedLights = document.querySelector('#theater-lights') as HTMLElement;
  expect(displayedLights.className).not.toContain('lights dimmed');

  userEvent.click(toggleNavElement);

  const toggleLights = screen.getByRole('button', { name: /dim lights on\/off/i });
  userEvent.click(toggleLights);

  expect(displayedLights.className).toContain('lights dimmed');
});