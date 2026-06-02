import { test, expect } from "@playwright/test";
import { runSteps, configure } from "passmark";

configure({
  ai: {
    gateway: "openrouter",
  },
});

test("TC1 - Register User using Passmark", async ({ page }) => {
  test.setTimeout(180_000);

  await runSteps({
    page,
    userFlow: "Register a new user",
    steps: [
      { description: "Navigate to https://automationexercise.com/" },
      { description: "Click on Signup / Login link" },
      {
        description: "Fill in the Name field in Signup form",
        data: { value: "testuser" },
      },
      {
        description: "Fill in the Email Address field in Signup form",
        data: { value: "{{run.email}}" },
      },
      { description: "Click the Signup button" },
      { description: "Select Mrs. title" },
      {
        description: "Fill in the Password field",
        data: { value: "Test@1234" },
      },
      { description: "Select day from the Day dropdown", data: { value: "1" } },
      {
        description: "Select month from the Month dropdown",
        data: { value: "February" },
      },
      {
        description: "Select year from the Year dropdown",
        data: { value: "2000" },
      },
      { description: "Fill First name field", data: { value: "Test" } },
      { description: "Fill Last name field", data: { value: "User" } },
      { description: "Fill Address field", data: { value: "123 Test Street" } },
      { description: "Fill State field", data: { value: "Maharashtra" } },
      { description: "Fill City field", data: { value: "Pune" } },
      { description: "Fill Zipcode field", data: { value: "411001" } },
      {
        description: "Fill Mobile Number field",
        data: { value: "9999999999" },
      },
      { description: "Click Create Account button" },
    ],
    assertions: [
      { assertion: "Account Created message is visible on the page" },
    ],
    test,
    expect,
  });
});
