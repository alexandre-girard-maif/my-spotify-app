// src/components/AccountNav.test.jsx
import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import AccountNav from './AccountNav';

describe('AccountNav component', () => {
  test('renders avatar image when profile has an avatar', () => {
    const profile = {
      display_name: 'Test User',
      images: [{ url: 'test-avatar.jpg' }],
    };

    render(
      <MemoryRouter>
        <AccountNav profile={profile} />
      </MemoryRouter>
    );

    // Verify avatar image is rendered correctly with alt text and src
    const avatarImg = screen.getByAltText('Test User');
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', 'test-avatar.jpg');
    
    // Verify nav link has correct exist with aria-label
    const navLink = screen.getByLabelText('Account (Test User)');
    expect(navLink).toBeInTheDocument();
  });

  test('does not render avatar image when profile has no avatar', () => {
    const profile = {
      display_name: 'Test User',
      images: [],
    };

    render(
      <BrowserRouter>
        <AccountNav profile={profile} />
      </BrowserRouter>
    );

    const avatarImg = screen.queryByRole('img');
    expect(avatarImg).not.toBeInTheDocument();
  });

  test('renders fallback aria-label when profile is missing', () => {
    render(
      <MemoryRouter>
        <AccountNav profile={null} />
      </MemoryRouter>
    );

    const navLink = screen.getByLabelText('Account');
    expect(navLink).toBeInTheDocument();
  });

  test('renders fallback aria-label when display_name is missing', () => {
    const profile = {
      images: [{ url: 'test-avatar.jpg' }],
    };

    render(
      <MemoryRouter>
        <AccountNav profile={profile} />
      </MemoryRouter>
    );

    const navLink = screen.getByLabelText('Account');
    expect(navLink).toBeInTheDocument();

    const avatarImg = screen.getByAltText('Profile avatar');
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', 'test-avatar.jpg');    

  });
});