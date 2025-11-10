import { test, expect } from "@playwright/test";
// Keep APP_NAME aligned with appMeta constant (duplicated here to avoid cross-env import complexity in Playwright)
const APP_NAME = 'Music Discovery App';
const titlePattern = (section) => `${section} | ${APP_NAME}`;

test("navigation in music discovery app is correct", async ({ page }) => {
  
  await page.goto("http://localhost:5173");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(titlePattern('Welcome'));

  // await for the welcome title to be visible
  const welcomeTitle = page.locator(".welcome-title");
  await expect(welcomeTitle).toBeVisible();
  await expect(welcomeTitle).toHaveText(`Welcome to ${APP_NAME}`);

  // click on Top Tracks element and expect to navigate to Top Tracks page
  await page.click("text=Top Tracks");
  await expect(page).toHaveTitle(titlePattern('Top Tracks'));

  // click on Top Artists element and expect to navigate to Top Artists page
  await page.click("text=Top Artists");
  await expect(page).toHaveTitle(titlePattern('Top Artists'));

  // click on Playlists element and expect to navigate to Playlists page
  await page.click("text=Playlists");
  await expect(page).toHaveTitle(titlePattern('Playlists'));
});
