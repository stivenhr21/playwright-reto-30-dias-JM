import { test} from "@playwright/test";

test.describe("Users OrangeHRM", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    await page.getByRole("textbox", { name: "Username" }).fill("Admin");
    await page.getByRole("textbox", { name: "Password" }).fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("link", { name: "Admin" }).click();
  });

  test("get all the usernames registered", async ({ page }) => {
    await page
      .getByRole("navigation", { name: "Topbar Menu" })
      .getByText("User Management")
      .click();
    await page.getByRole("menuitem", { name: "Users" }).click();

    const rows = page.getByRole("table").getByRole("row");
    const rowCount = await rows.count();
    const usernames: string[] = [];

    for (let i = 1; i < rowCount; i++) {
      const cell = rows.nth(i).getByRole("cell").nth(1);
      const username = await cell.textContent();

      if (username) {
        usernames.push(username);
      }
    }
    console.log(usernames);
  });

  test("get all registered employee names", async ({ page }) => {
    await page
      .getByRole("navigation", { name: "Topbar Menu" })
      .getByText("User Management")
      .click();
    await page.getByRole("menuitem", { name: "Users" }).click();

    const rows = page.getByRole("table").getByRole("row");
    const rowCount = await rows.count();
    const employeeNames: string[] = [];

    for (let i = 1; i < rowCount; i++) {
      const cell = rows.nth(i).getByRole("cell").nth(3);
      const employeeName = await cell.textContent();

      if (employeeName) {
        employeeNames.push(employeeName);
      }
    }
    console.log(employeeNames);
  });
});