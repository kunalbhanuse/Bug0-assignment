import { test, expect } from "@playwright/test";

test("Login User with incorrect email and password", async ({ page }) => {
  // Step 1,2,3 - Navigate and verify home page
  await page.goto("https://automationexercise.com/");
  await expect(page).toHaveTitle("Automation Exercise");

  // Step 4 - Click Signup / Login
  await page.getByRole("link", { name: " Signup / Login" }).click();

  // Step 5 - Verify 'Login to your account' is visible
  await expect(page.getByText("Login to your account")).toBeVisible();

  // Step 6 - Enter incorrect email and password
  await page
    .locator("form")
    .filter({ hasText: "Login" })
    .getByPlaceholder("Email Address")
    .fill("wrongemail@gmail.com");
  await page
    .getByRole("textbox", { name: "Password" })
    .fill("WrongPassword@123");

  // Step 7 - Click Login
  await page.getByRole("button", { name: "Login" }).click();

  // Step 8 - Verify error message
  await expect(
    page.getByText("Your email or password is incorrect!"),
  ).toBeVisible();
});
