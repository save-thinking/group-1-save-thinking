describe("Record Page", () => {
  beforeAll(async () => {
    await page.goto("http://127.0.0.1:5500/src/static/html/records.html", {
      waitUntil: "load",
      timeout: 60000,
    });
  });

  it("has all records page components", async () => {
    const title = await page.title();
    await expect(title).toMatch("SaveThink");
    await page.waitForSelector("#add-record");
    await page.waitForSelector("#export-records-btn");
    await page.waitForSelector("#record-list");
    await page.waitForSelector("#record-button");
    await page.waitForSelector("#dashboard-button");
    await page.waitForSelector("#logo");
  });

  it("correct record form", async () => {
    const addRcdBttn = await page.$("#add-record");
    if (addRcdBttn) {
      const clicked = await addRcdBttn.click();
      if(clicked) {
          // entering amount in record
          await page.type("#grid-amount", "10");

          // checking account type drop down
          const invalidRcdType = await page.select(
            "#grid-record-type",
            "fixed-deposit"
          );
          await expect(invalidRcdType.length).toBe(0);

          const validRcdTypeExpense = await page.select(
            "#grid-record-type",
            "expense"
          );
          await expect(validRcdTypeExpense.length).toBe(1);

          const validRcdTypeTransfer = await page.select(
            "#grid-record-type",
            "transfer"
          );
          await expect(validRcdTypeTransfer.length).toBe(1);

          const validRcdTypeIncome = await page.select(
            "#grid-record-type",
            "income"
          );
          await expect(validRcdTypeIncome.length).toBe(1);

          // checking currency type drop down
          const invalidCurrencyType = await page.select("#grid-currency", "yen");
          await expect(invalidCurrencyType.length).toBe(0);
          const validCurrencyTypeUSD = await page.select("#grid-currency", "usd");
          await expect(validCurrencyTypeUSD.length).toBe(1);
          const validCurrencyTypeINR = await page.select("#grid-currency", "inr");
          await expect(validCurrencyTypeINR.length).toBe(1);
          const validCurrencyTypeEUR = await page.select("#grid-currency", "eur");
          await expect(validCurrencyTypeEUR.length).toBe(1);
        }
    }
  });

});
