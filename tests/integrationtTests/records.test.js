
describe('Dashboard', () => {
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5500/group-1-save-thinking/src/static/html/records.html', {waitUntil: 'load', timeout: 60000});
    })
  
    it("correct record form", async () => {
      await page.click("#add-record-btn")
      const addRecordBttn = await page.$('#add-record-btn');
      if (addRecordBttn) {
        await addRecordBttn.click();
        console.log("records-clicked");

        // const invalidRecordType = await page.select('#grid-record-type',"deposit");
        // console.log(invalidRecordType);
        // await expect(invalidRecordType.length).toBe(0);
        // const validRecordTypeExpense = await page.select("#grid-record-type", "expense");
        // console.log(validRecordTypeExpense);
        // await expect(validRecordTypeExpense.length).toBe(1);
        // const validRecordTypeIncome = await page.select("#grid-record-type", "income");
        // await expect(validRecordTypeIncome.length).toBe(1);
        // const validRecordTypeTransfer = await page.select("#grid-record-type", "transfer");
        // await expect(validRecordTypeTransfer.length).toBe(1);
        // console.log(validRecordTypeTransfer);
      }
    })
  
    it('has all records page components', async () => {
      const title = await page.title();
      console.log("hello");
      console.log(title);
      await expect(title).toMatch('SaveThink');
      await page.waitForSelector('#add-record');
      await page.waitForSelector('#record-list');
      await page.waitForSelector('#record-button');
      await page.waitForSelector('#dashboard-button');
      await page.waitForSelector('#logo');
    })
  })
  
  
  