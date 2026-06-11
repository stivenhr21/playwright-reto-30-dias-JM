import { test, expect } from "@playwright/test";

test.describe("navigation menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    await page.getByRole("textbox", { name: "Username" }).fill("Admin");
    await page.getByRole("textbox", { name: "Password" }).fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();
  });

  test("check left menu options", async ({ page }) => {
    const leftMenuItems = page
      .getByRole("navigation", { name: "Sidepanel" })
      .getByRole("listitem");
    const currentMenuItemsCount = await leftMenuItems.count();
    const currentMenuItems: string[] = [];

    for (let i = 0; i < currentMenuItemsCount; i++) {
      const menuItemText = await leftMenuItems.nth(i).innerText();
      currentMenuItems.push(menuItemText);
    }

    console.log(currentMenuItemsCount);
    console.log(currentMenuItems);

    const expectedMenuItems = [
      "Admin",
      "PIM",
      "Leave",
      "Time",
      "Recruitment",
      "My Info",
      "Performance",
      "Dashboard",
      "Directory",
      "Maintenance",
      "Claim",
      "Buzz",
    ];

    expect(currentMenuItems).toEqual(expectedMenuItems);

    expect(currentMenuItems[0]).toEqual(expectedMenuItems[0]);
  });
});