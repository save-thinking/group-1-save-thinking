describe("Dashboard Page", () => {
  beforeAll(async () => {
    await page.goto("http://127.0.0.1:5501/src/static/html/dashboard.html");
  });

  it("correct account form", async () => {
    await page.click("#add-account-btn");
    const addAcctBttn = await page.$("#add-account-btn");
    if (addAcctBttn) {
      await addAcctBttn.click();
      console.log("clicked");

      await page.type("#grid-note", "BOFA");
    }
  });

  it("has all dashboard components", async () => {
    const title = await page.title();
    await expect(title).toMatch("SaveThink");
    await page.waitForSelector("#add-record");
    await page.waitForSelector("#add-account-btn");
    await page.waitForSelector("#account-list");
    await page.waitForSelector("#record-button");
    await page.waitForSelector("#dashboard-button");
    await page.waitForSelector("#logo");
  });
});
