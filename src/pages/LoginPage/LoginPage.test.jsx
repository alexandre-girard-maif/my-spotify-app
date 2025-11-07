import { describe, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  test('renders correctly', () => {
    render(<LoginPage />);
    // Use accessible role-based query for the page title
    const heading = screen.getByRole('heading', { name: /welcome to my spotify app/i });
    expect(heading).toBeInTheDocument();
  });
});
