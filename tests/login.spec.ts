import { test, expect } from "@playwright/test";

test.describe("Login OrangeHRM", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
  });

  test("Successful login", async ({ page }) => {
    await page.getByRole("textbox", { name: "Username" }).fill("Admin");
    await page.getByRole("textbox", { name: "Password" }).fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForURL(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
    );
  });

  test("Unsuccessful login with invalid credentials", async ({ page }) => {
    await page.getByRole("textbox", { name: "Username" }).fill("AdminInvalid");
    await page.getByRole("textbox", { name: "Password" }).fill("AdminInvalid123");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByRole("alert")).toContainText("Invalid credentials");
  });
});