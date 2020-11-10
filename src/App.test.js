import { render, screen } from '@testing-library/react';
import App from './App';

test('renders games link', () => {
  render(<App />);
  const linkElement = screen.getByText(/open games/i);
  expect(linkElement).toBeInTheDocument();
});
