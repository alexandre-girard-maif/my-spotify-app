// src/components/MainNav.test.jsx

import React from 'react';
import { describe, expect, test } from '@jest/globals'

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import MainNav from './MainNav';

describe('MainNav', () => {
  function renderWithRouter(initialEntries = ['/']) {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <MainNav />
      </MemoryRouter>
    );
  }

  test('renders all navigation links with correct text and href', () => {
    renderWithRouter();
    expect(screen.getByText('Top Tracks')).toHaveAttribute('href', '/top-tracks');
    expect(screen.getByText('Top Artists')).toHaveAttribute('href', '/top-artists');
    expect(screen.getByText('Playlists')).toHaveAttribute('href', '/playlists');
    expect(screen.getByText('Account')).toHaveAttribute('href', '/account');
  });

  test('applies the active class to the correct link based on route', () => {
    renderWithRouter(['/playlists']);
    const playlistsLink = screen.getByText('Playlists');
    expect(playlistsLink).toHaveClass('active');
    expect(playlistsLink).toHaveClass('nav-link');
    // Other links should not have 'active'
    expect(screen.getByText('Top Tracks')).not.toHaveClass('active');
    expect(screen.getByText('Top Artists')).not.toHaveClass('active');
    expect(screen.getByText('Account')).not.toHaveClass('active');
  });

  

  test('all links have nav-link class', () => {
    renderWithRouter();
    expect(screen.getByText('Top Tracks')).toHaveClass('nav-link');
    expect(screen.getByText('Top Artists')).toHaveClass('nav-link');
    expect(screen.getByText('Playlists')).toHaveClass('nav-link');
    expect(screen.getByText('Account')).toHaveClass('nav-link');
  });

  test('renders nav with correct class and style', () => {
    renderWithRouter();
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('layout-nav');
    expect(nav).toHaveStyle({ flex: '1' });
  });
});