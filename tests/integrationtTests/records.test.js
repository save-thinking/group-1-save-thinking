describe("Record Page", () => {
  beforeAll(async () => {
    await page.goto("http://127.0.0.1:5501/src/static/html/records.html", {
      waitUntil: "load",
      timeout: 60000,
    });
  });

  it("correct record form", async () => {
    await page.click("#add-record");
    const addRcdBttn = await page.$("#add-record");
    if (addRcdBttn) {
      await addRcdBttn.click();
      console.log("record form clicked");

      await page.type("#grid-amount", "10");

      // checking account type drop down
      const invalidRcdType = await page.select(
        "#grid-record-type",
        "fixed-deposit"
      );
      await expect(invalidRcdType.length).toBe(0);

      // checking currency type drop down
      const invalidCurrencyType = await page.select("#grid-currency", "yen");
      await expect(invalidCurrencyType.length).toBe(0);
    }
  });

  it("has all records page components", async () => {
    const title = await page.title();
    console.log(title);
    await expect(title).toMatch("SaveThink");
    await page.waitForSelector("#add-record");
    await page.waitForSelector("#record-list");
    await page.waitForSelector("#record-button");
    await page.waitForSelector("#dashboard-button");
    await page.waitForSelector("#logo");
  });
});
