describe("Dashboard Page", () => {
  beforeAll(async () => {
    await page.goto("http://127.0.0.1:5500/src/static/html/dashboard.html");
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

  it("correct account form", async () => {
    const addAcctBttn = await page.$("#add-account-btn");
    if (addAcctBttn) {
      const clicked = await addAcctBttn.click();
      if (clicked) {
        // type account name
        await page.type("#grid-note", "BOFA");

        // checking account type drop down
        const invalidAccountType = await page.select(
          "#grid-destination-account",
          "fixed-deposit"
        );
        await expect(invalidAccountType.length).toBe(0);
        const validAccountTypeChecking = await page.select(
          "#grid-destination-account",
          "checking-account"
        );
        await expect(validAccountTypeChecking.length).toBe(1);
        const validAccountTypeCash = await page.select(
          "#grid-destination-account",
          "cash"
        );
        await expect(validAccountTypeCash.length).toBe(1);
        const validAccountTypeSavings = await page.select(
          "#grid-destination-account",
          "savings-account"
        );
        await expect(validAccountTypeSavings.length).toBe(1);
        const validAccountTypeCredit = await page.select(
          "#grid-destination-account",
          "credit-card"
        );
        await expect(validAccountTypeCredit.length).toBe(1);

        // checking currency type drop down
        const invalidCurrencyType = await page.select("#grid-currency", "yen");
        await expect(invalidCurrencyType.length).toBe(0);
        const validCurrencyTypeUSD = await page.select("#grid-currency", "usd");
        await expect(validCurrencyTypeUSD.length).toBe(1);
        const validCurrencyTypeINR = await page.select("#grid-currency", "inr");
        await expect(validCurrencyTypeINR.length).toBe(1);
        const validCurrencyTypeEUR = await page.select("#grid-currency", "eur");
        await expect(validCurrencyTypeEUR.length).toBe(1);

        await page.type("#grid-balance", "10");

        const addAcctModalBttn = await page.$("#add-account-modal-btn");
        if (addAcctModalBttn) {
          await addAcctModalBttn.click();
        }
      }
    }
  });
});
