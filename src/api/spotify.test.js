// src/api/spotify.test.js
import { afterEach, describe, expect, jest, test } from '@jest/globals'

import { fetchAccountProfile } from './spotify';

describe('fetchAccountProfile', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  test('returns error if no token is provided', async () => {
    const result = await fetchAccountProfile('');
    expect(result).toEqual({
      error: 'No access token found.',
      profile: null,
    });
  });

  test('returns profile on successful fetch', async () => {
    const mockProfile = { id: 'user123', display_name: 'Test User' };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockProfile),
    });

    const result = await fetchAccountProfile('valid_token');
    expect(global.fetch).toHaveBeenCalledWith('https://api.spotify.com/v1/me', {
      headers: { Authorization: 'Bearer valid_token' },
    });
    expect(result).toEqual({
      profile: mockProfile,
      error: null,
    });
  });

  test('returns error if Spotify API returns error in response', async () => {
    const mockError = { error: { message: 'Invalid token' } };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockError),
    });

    const result = await fetchAccountProfile('invalid_token');
    expect(result).toEqual({
      error: 'Invalid token',
      profile: null,
    });
  });

  test('returns error if fetch throws', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    const result = await fetchAccountProfile('any_token');
    expect(result).toEqual({
      error: 'Failed to fetch account info.',
      profile: null,
    });
  });
});