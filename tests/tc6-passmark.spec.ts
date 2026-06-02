import { test, expect } from "@playwright/test";
import { runSteps, configure } from "passmark";

configure({
  ai: {
    gateway: "openrouter",
  },
});

test("TC1 - Register User using Passmark", async ({ page }) => {
  test.setTimeout(180_000); // increased to 3 minutes

  await runSteps({
    page,
    userFlow: "Register a new user",
    steps: [
      { description: "Navigate to https://automationexercise.com/" },
      { description: "Click on Signup / Login link" },
      { description: "Fill in the Name field with 'testuser'" },
      {
        description:
          "Fill in the Email Address field in the Signup form with '{{run.email}}'",
      },
      { description: "Click the Signup button" },
      { description: "Select Mrs. title" },
      { description: "Fill in the Password field with 'Test@1234'" },
      { description: "Select day 1 from the Day dropdown" },
      { description: "Select February from the Month dropdown" },
      { description: "Select 2000 from the Year dropdown" },
      { description: "Fill First name field with 'Test'" },
      { description: "Fill Last name field with 'User'" },
      { description: "Fill Address field with '123 Test Street'" },
      { description: "Fill State field with 'Maharashtra'" },
      { description: "Fill City field with 'Pune'" },
      { description: "Fill Zipcode field with '411001'" },
      { description: "Fill Mobile Number field with '9999999999'" },
      { description: "Click Create Account button" },
    ],
    assertions: [
      { assertion: "Account Created message is visible on the page" },
    ],
    test,
    expect,
  });
});
