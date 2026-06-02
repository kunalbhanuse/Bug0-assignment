import { test, expect } from "@playwright/test";

test("Logout User", async ({ page }) => {
  const uniqueEmail = `testuser_${Date.now()}@gmail.com`;
  const password = "Bug0@123";

  // Step 1,2,3 - Navigate and verify home page
  await page.goto("https://automationexercise.com/");
  await expect(page).toHaveTitle("Automation Exercise");

  // Register account first so we have valid credentials to login with
  await page.getByRole("link", { name: " Signup / Login" }).click();
  await page.getByRole("textbox", { name: "Name" }).fill("randomuser");
  await page
    .locator("form")
    .filter({ hasText: "Signup" })
    .getByPlaceholder("Email Address")
    .fill(uniqueEmail);
  await page.getByRole("button", { name: "Signup" }).click();
  await page.getByRole("radio", { name: "Mrs." }).check();
  await page.getByRole("textbox", { name: "Password *" }).fill(password);
  await page.locator("#days").selectOption("1");
  await page.locator("#months").selectOption("2");
  await page.locator("#years").selectOption("2020");
  await page.getByRole("textbox", { name: "First name *" }).fill("random");
  await page.getByRole("textbox", { name: "Last name *" }).fill("user");
  await page
    .getByRole("textbox", { name: "Address * (Street address, P." })
    .fill("random street");
  await page.getByRole("textbox", { name: "State *" }).fill("maharashtra");
  await page.getByRole("textbox", { name: "City * Zipcode *" }).fill("pune");
  await page.locator("#zipcode").fill("332211");
  await page
    .getByRole("textbox", { name: "Mobile Number *" })
    .fill("3493726433");
  await page.getByRole("button", { name: "Create Account" }).click();
  await expect(page.getByText("Account Created!")).toBeVisible();
  await page.getByRole("link", { name: "Continue" }).click();

  // Logout so we can test login
  await page.getByRole("link", { name: " Logout" }).click();

  // Step 4 - Click Signup / Login
  await page.getByRole("link", { name: " Signup / Login" }).click();

  // Step 5 - Verify 'Login to your account' is visible
  await expect(page.getByText("Login to your account")).toBeVisible();

  // Step 6 - Enter correct email and password
  await page
    .locator("form")
    .filter({ hasText: "Login" })
    .getByPlaceholder("Email Address")
    .fill(uniqueEmail);
  await page.getByRole("textbox", { name: "Password" }).fill(password);

  // Step 7 - Click Login
  await page.getByRole("button", { name: "Login" }).click();

  // Step 8 - Verify logged in as username
  await expect(page.getByText("Logged in as randomuser")).toBeVisible();

  // Step 9 - Click Logout
  await page.getByRole("link", { name: " Logout" }).click();

  // Step 10 - Verify user is navigated to login page
  await expect(page.getByText("Login to your account")).toBeVisible();

  // Cleanup - Delete the account
  await page
    .locator("form")
    .filter({ hasText: "Login" })
    .getByPlaceholder("Email Address")
    .fill(uniqueEmail);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: " Delete Account" }).click();
  await expect(page.getByText("Account Deleted!")).toBeVisible();
  await page.getByRole("link", { name: "Continue" }).click();
});
