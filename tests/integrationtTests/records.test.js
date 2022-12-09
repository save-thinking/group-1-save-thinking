describe("Record Page", () => {
  beforeAll(async () => {
    await page.goto("http://127.0.0.1:5501/src/static/html/records.html", {
      waitUntil: "load",
      timeout: 60000,
    });
  });

  it("has all records page components", async () => {
    const title = await page.title();
    await expect(title).toMatch("SaveThink");
    const addRcdBttn = page.$("#add-record");
    await expect(addRcdBttn).not.toBeNull();
    const exportRcdBttn = page.$("#export-records-btn");
    await expect(exportRcdBttn).not.toBeNull();
    const rcdList = page.$("#record-list");
    await expect(rcdList).not.toBeNull();
    const rcdBtn = page.$("#record-button");
    await expect(rcdBtn).not.toBeNull();
    const dashboardBtn = page.$("#dashboard-button");
    await expect(dashboardBtn).not.toBeNull();
    const logo = page.$("#logo");
    await expect(logo).not.toBeNull();
  });

  it("correct record form", async () => {
    const addRcdBttn = await page.$("#add-record");
    if (addRcdBttn) {
      const clicked = await addRcdBttn.click();
      if (clicked) {
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
