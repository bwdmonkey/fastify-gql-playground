import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const listElement = screen.getByText(/list/i);
  expect(listElement).toBeInTheDocument();
});
