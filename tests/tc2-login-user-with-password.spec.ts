import { test, expect } from "@playwright/test";

test("Login User with correct email and password", async ({ page }) => {
  test.setTimeout(90000);
  const uniqueEmail = `testuser_${Date.now()}@gmail.com`;
  const password = "Bug0@123";

  // Step 1 - Register the account first
  await page.goto("https://automationexercise.com/");
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
  await expect(page.getByText("Account Created!")).toBeVisible({
    timeout: 60000,
  });
  await page.getByRole("link", { name: "Continue" }).click();

  // Step 2 - Logout so we can test login
  await page.getByRole("link", { name: " Logout" }).click();

  // Step 3 - Now login with the same credentials
  await page
    .locator("form")
    .filter({ hasText: "Login" })
    .getByPlaceholder("Email Address")
    .fill(uniqueEmail);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Login" }).click();

  // Step 4 - Verify login was successful
  await expect(page.getByText("Logged in as randomuser")).toBeVisible();

  // Step 5 - Delete the account
  await page.getByRole("link", { name: " Delete Account" }).click();
  await expect(page.getByText("Account Deleted!")).toBeVisible();
  await page.getByRole("link", { name: "Continue" }).click();
});
