import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  const uniqueEmail = `testuser_${Date.now()}@gmail.com`;

  await page.goto("https://automationexercise.com/");
  await page.getByRole("link", { name: " Signup / Login" }).click();
  await page.getByRole("textbox", { name: "Name" }).click();
  await page.getByRole("textbox", { name: "Name" }).fill("randomuser");
  await page
    .locator("form")
    .filter({ hasText: "Signup" })
    .getByPlaceholder("Email Address")
    .click();
  await page
    .locator("form")
    .filter({ hasText: "Signup" })
    .getByPlaceholder("Email Address")
    .fill(uniqueEmail);
  await page.getByRole("button", { name: "Signup" }).click();
  await page.getByRole("radio", { name: "Mrs." }).check();
  await page.getByRole("textbox", { name: "Name *", exact: true }).click();
  await page.getByRole("textbox", { name: "Password *" }).click();
  await page.getByRole("textbox", { name: "Password *" }).fill("ran773322");
  await page.locator("#days").selectOption("1");
  await page.locator("#months").selectOption("2");
  await page.locator("#years").selectOption("2020");
  await page
    .getByRole("checkbox", { name: "Sign up for our newsletter!" })
    .check();
  await page
    .getByRole("checkbox", { name: "Receive special offers from" })
    .check();
  await page.getByRole("textbox", { name: "First name *" }).click();
  await page.getByRole("textbox", { name: "First name *" }).fill("random");
  await page.getByRole("textbox", { name: "Last name *" }).click();
  await page.getByRole("textbox", { name: "Last name *" }).fill("user");
  await page.getByRole("textbox", { name: "Company", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Company", exact: true })
    .fill("bug0");
  await page
    .getByRole("textbox", { name: "Address * (Street address, P." })
    .click();
  await page
    .getByRole("textbox", { name: "Address * (Street address, P." })
    .fill("random");
  await page.getByRole("textbox", { name: "Address 2" }).click();
  await page.getByRole("textbox", { name: "Address 2" }).fill("random");
  await page.getByRole("textbox", { name: "State *" }).click();
  await page.getByRole("textbox", { name: "State *" }).fill("maharashtra");
  await page.getByRole("textbox", { name: "City * Zipcode *" }).click();
  await page.getByRole("textbox", { name: "City * Zipcode *" }).fill("pune");
  await page.locator("#zipcode").click();
  await page.locator("#zipcode").fill("332211");
  await page.getByRole("textbox", { name: "Mobile Number *" }).click();
  await page
    .getByRole("textbox", { name: "Mobile Number *" })
    .fill("3493726433");
  await page.locator("#country").selectOption("India"); // ← ADDED
  await page.getByRole("button", { name: "Create Account" }).click();
  await expect(page.getByText("Account Created!")).toBeVisible({
    timeout: 60000,
  }); // ← ADDED timeout
  await page.getByRole("link", { name: "Continue" }).click();
  await page.getByRole("link", { name: " Delete Account" }).click();
  await expect(page.getByText("Account Deleted!")).toBeVisible();
  await page.getByRole("link", { name: "Continue" }).click();
});
