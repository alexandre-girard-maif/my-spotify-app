import { test, expect } from "@playwright/test";

test("navigation in spotify-app is correct", async ({ page }) => {
  
  await page.goto("http://localhost:5173");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Spotify App/);

  // await for the welcome title to be visible
  const welcomeTitle = page.locator(".welcome-title");
  await expect(welcomeTitle).toBeVisible();
  await expect(welcomeTitle).toHaveText("Welcome to My Spotify App");

  // click on Top Tracks element and expect to navigate to Top Tracks page
  await page.click("text=Top Tracks");
  await expect(page).toHaveTitle(/Top Tracks | Spotify App/);

  // click on Top Artists element and expect to navigate to Top Artists page
  await page.click("text=Top Artists");
  await expect(page).toHaveTitle(/Top Artists | Spotify App/);

  // click on Playlists element and expect to navigate to Playlists page
  await page.click("text=Playlists");
  await expect(page).toHaveTitle(/Playlists | Spotify App/);
});
