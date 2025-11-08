// src/components/MainNav.test.jsx

import { describe, expect, test } from '@jest/globals'

import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import * as spotifyApi from '../../api/spotify-me.js';
import MainNav from './MainNav';
import { KEY_ACCESS_TOKEN } from '../../constants/storageKeys.js';

const profileData = {
  display_name: 'User from API',
  email: 'account@example.com',
  images: [{ url: 'https://via.placeholder.com/150' }],
  country: 'US',
  product: 'premium',
  external_urls: {
    spotify: 'https://open.spotify.com/user/account'
  }
};

describe('MainNav', () => {
  beforeEach(() => {
    const tokenValue = 'test-token';
    
    // Mock localStorage token access
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => key === KEY_ACCESS_TOKEN ? tokenValue : null);
    
    jest.spyOn(spotifyApi, 'fetchAccountProfile').mockResolvedValue({ data: profileData, error: null });
  });

  function renderWithRouter(initialEntries = ['/']) {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <MainNav />
      </MemoryRouter>
    );
  }

  test('fetches and displays user profile avatar', async () => {
    renderWithRouter();

    // wait for avatar_img className to load
    await waitFor(() => {
      expect(screen.getByAltText(profileData.display_name)).toHaveClass('avatar__img');
    });

    const avatarImg = screen.getByAltText(profileData.display_name);
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', profileData.images[0].url);
  });

  test('get profile from localStorage and display avatar in AccountNav', () => {
    const mockProfile = {
      display_name: 'User from Storage',
      images: [{ url: 'https://via.placeholder.com/150' }],
    };
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => {
      if (key === 'spotify_profile') return JSON.stringify(mockProfile);
      return null;
    });

    renderWithRouter();

    const avatarImg = screen.getByAltText(mockProfile.display_name);
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', mockProfile.images[0].url);
  });

  test('log error when parse cached profile fails', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => {
      if (key === 'spotify_profile') return 'invalid-json';
      return null;
    });

    renderWithRouter();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to parse cached profile:', 'invalid-json');

    consoleErrorSpy.mockRestore();
  });

  test('log error when fetch profile fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(spotifyApi, 'fetchAccountProfile').mockRejectedValue({ data: null, error: 'Fetch error' });

    renderWithRouter();

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch account profile:', { data: null, error: 'Fetch error' });
    });

    consoleErrorSpy.mockRestore();
  });

  test('log error when fetch profile returns error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(spotifyApi, 'fetchAccountProfile').mockResolvedValue({ data: null, error: 'API error' });

    renderWithRouter();

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch account profile:', { data: null, error: 'API error' });
    });

    consoleErrorSpy.mockRestore();
  });


  test('applies the active class to the correct link based on route', async () => {
    renderWithRouter(['/playlists']);

    // wait for avatar_img className to load
    await waitFor(() => {
      expect(screen.getByAltText(profileData.display_name)).toHaveClass('avatar__img');
    });

    // Check if the playlists link is active
    const playlistsLink = screen.getByText('Playlists');
    expect(playlistsLink).toHaveClass('active');
    expect(playlistsLink).toHaveClass('nav-link');
    // Other links should not have 'active'
    expect(screen.getByText('Top Tracks')).not.toHaveClass('active');
    expect(screen.getByText('Top Artists')).not.toHaveClass('active');
  });

});