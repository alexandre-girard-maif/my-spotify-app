// src/api/spotify.test.js
import { afterEach, describe, expect, jest, test } from "@jest/globals";

import { fetchAccountProfile, fetchUserPlaylists, fetchUserTopArtists, fetchUserTopTracks } from "./spotify-me";
import { SPOTIFY_API_BASE } from "./spotify-commons";

describe("spotify-me API", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    jest.clearAllMocks();
  });

  describe("fetchAccountProfile", () => {
    test("returns error if no token is provided", async () => {
      const result = await fetchAccountProfile("");
      expect(result).toEqual({
        error: "No access token found.",
        profile: null,
      });
    });

    test("returns profile on successful fetch", async () => {
      const mockProfile = { id: "user123", display_name: "Test User" };
      globalThis.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockProfile),
      });

      const result = await fetchAccountProfile("valid_token");
      expect(globalThis.fetch).toHaveBeenCalledWith(
        `${SPOTIFY_API_BASE}/me`,
        {
          headers: { Authorization: "Bearer valid_token" },
        }
      );
      expect(result).toEqual({
        data: mockProfile,
        error: null,
      });
    });

    test("returns error if Spotify API returns error in response", async () => {
      const mockError = { error: { message: "Invalid token" } };
      globalThis.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockError),
      });

      const result = await fetchAccountProfile("invalid_token");
      expect(result).toEqual({
        error: "Invalid token",
        data: null,
      });
    });

    test("returns error if fetch throws", async () => {
      globalThis.fetch = jest
        .fn()
        .mockRejectedValue(new Error("Network error"));

      const result = await fetchAccountProfile("any_token");
      expect(result).toEqual({
        error: "Failed to fetch account info.",
        profile: null,
      });
    });
  });

  describe("fetchUserPlaylists", () => {
    test("returns error if no token is provided", async () => {
        const result = await fetchUserPlaylists("");
        expect(result).toEqual({
            error: "No access token found.",
            playlists: [],
        });
    });

    test("returns playlists on successful fetch", async () => {
        const mockData = { data: { items: [{ id: "playlist1" }, { id: "playlist2" }], total: 2 } };
        globalThis.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData),
        });

        const result = await fetchUserPlaylists("valid_token", 2);
        expect(globalThis.fetch).toHaveBeenCalledWith(
            `${SPOTIFY_API_BASE}/me/playlists?limit=2`,
            {
                headers: { Authorization: "Bearer valid_token" },
            }
        );

        expect(result).toEqual({
            data: mockData,
            error: null,
        });
    });

    test("returns error if Spotify API returns error in response", async () => {
        const mockError = { error: { message: "Invalid token" } };
        globalThis.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockError),
        });

        const result = await fetchUserPlaylists("invalid_token", 2);
        expect(result).toEqual({
            error: "Invalid token",
            data: { items: [], total: 0 },
        });
    });

    test("returns error if fetch throws", async () => {
        globalThis.fetch = jest
            .fn()
            .mockRejectedValue(new Error("Network error"));

        const result = await fetchUserPlaylists("any_token", 2);
        expect(result).toEqual({
            error: "Failed to fetch playlists.",
            data: { items: [], total: 0 },
        });
    });
  });

  describe("fetchUserTopTracks", () => {
    test("returns error if no token is provided", async () => {
        const result = await fetchUserTopTracks("");
        expect(result).toEqual({
            error: "No access token found.",
            tracks: [],
        });
    });

    test("returns tracks on successful fetch", async () => {
        const mockTracks = { items: [{ id: "track1" }, { id: "track2" }], total: 2 };
        globalThis.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockTracks),
        });

        const result = await fetchUserTopTracks("valid_token", 2, "short_term");
        expect(globalThis.fetch).toHaveBeenCalledWith(
            `${SPOTIFY_API_BASE}/me/top/tracks?limit=2&time_range=short_term`,
            {
                headers: { Authorization: "Bearer valid_token" },
            }
        );
        expect(result).toEqual({
            data: mockTracks,
            error: null,
        });
    });

    test("returns error if Spotify API returns error in response", async () => {
        const mockError = { error: { message: "Invalid token" } };
        globalThis.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockError),
        });

        const result = await fetchUserTopTracks("invalid_token", 2, "short_term");
        expect(result).toEqual({
            error: "Invalid token",
            tracks: [],
        });
    });

    test("returns error if fetch throws", async () => {
        globalThis.fetch = jest
            .fn()
            .mockRejectedValue(new Error("Network error"));

        const result = await fetchUserTopTracks("any_token", 2, "short_term");
        expect(result).toEqual({
            error: "Failed to fetch top tracks.",
            data: { items: [], total: 0 },
        });
    });
  });

  describe("fetchUserTopArtists", () => {
    test("returns error if no token is provided", async () => {
        const result = await fetchUserTopArtists("");
        expect(result).toEqual({
            error: "No access token found.",
            artists: [],
        });
    });

    test("returns artists on successful fetch", async () => {
        const mockArtists = { data: { items: [{ id: "artist1" }, { id: "artist2" }] }, total: 2 };
        globalThis.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockArtists),
        });

        const result = await fetchUserTopArtists("valid_token", 2, "short_term");
        expect(globalThis.fetch).toHaveBeenCalledWith(
            `${SPOTIFY_API_BASE}/me/top/artists?limit=2&time_range=short_term`,
            {
                headers: { Authorization: "Bearer valid_token" },
            }
        );
        expect(result).toEqual({
            data: mockArtists,
            error: null,
        });
    });

    test("returns error if Spotify API returns error in response", async () => {
        const mockError = { error: { message: "Invalid token" } };
        globalThis.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockError),
        });

        const result = await fetchUserTopArtists("invalid_token", 2, "short_term");
        expect(result).toEqual({
            error: "Invalid token",
            artists: [],
        });
    });

    test("returns error if fetch throws", async () => {
        globalThis.fetch = jest
            .fn()
            .mockRejectedValue(new Error("Network error"));

        const result = await fetchUserTopArtists("any_token", 2, "short_term");
        expect(result).toEqual({
            error: "Failed to fetch top artists.",
            artists: [],
        });
    });
  });
});
