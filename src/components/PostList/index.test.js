import { render, screen } from '@testing-library/react';
import PostList from './';

test('renders learn react link', () => {
  render(<PostList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
