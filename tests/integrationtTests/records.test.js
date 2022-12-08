describe("Dashboard", () => {
  beforeAll(async () => {
    await page.goto("http://127.0.0.1:5500/src/static/html/records.html", {
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

  // it("correct record form", async () => {
  //   // let clicked = await page.evaluate(() => {
  //   //   let btn = document.querySelector('#add-record-btn');
  //   //   console.log("record clicked");
  //   //   console.log(btn);
  //   //   return btn;
  //   // });
  //   // console.log("heyyy")
  //   // console.log(clicked);

  //   await page.exposeFunction('onCustomEvent', e => {
  //     console.log(`${e.type} fired`, e.detail || '');
  //   });

  //   // /**
  //   //  * Attach an event listener to page to capture a custom event on page load/navigation.
  //   //  * @param {string} type Event name.
  //   //  * @returns {!Promise}
  //   //  */
  //   // function listenFor(type) {
  //   //   return page.$('#add-record-btn').evaluateOnNewDocument(type => {
  //   //     document.addEventListener(type, e => {
  //   //       window.onCustomEvent({type, detail: e.detail});
  //   //     });
  //   //   }, type);
  //   // }

  //   // await listenFor('app-ready');

  //   /**
  //    * Attach an event listener to page to capture a custom event on page load/navigation.
  //    * @param {string} type Event name.
  //    * @returns {!Promise}
  //    */
  //   function listenFor(type) {
  //     return page.evaluateOnNewDocument(type => {
  //       console.log(JSON.stringify(document.querySelector('body')));
  //       document.querySelector("#add-record-btn").addEventListener(type, e => {
  //         window.onCustomEvent({type, detail: e.detail});
  //       });
  //     }, type);
  //   }

  //   await listenFor('DOMContentLoaded');

  //   // function addListener(type) {
  //   //   return page.evaluateOnNewDocument(type => {
  //   //     // here we are in the browser context
  //   //     document.addEventListener(type, e => {
  //   //       window.onCustomEvent({ type, detail: e.detail });
  //   //     });
  //   //   }, type);
  //   // }

  //   // const evt = await new Promise(async resolve => {
  //   //   // Define a window.onCustomEvent function on the page.
  //   //   await document.body.querySelector('#add-record-btn').exposeFunction('click', e => {
  //   //     // here we are in the node context
  //   //     resolve(e); // resolve the outer Promise here so we can await it outside
  //   //   });
  //   //   // await addListener('#add-record-btn'); // setup listener for "status" custom event on page load
  //   //   // await page.goto('http://example.com');  // N.B! Do not use { waitUntil: 'networkidle0' } as that may cause a race condition
  //   // });

  //   // await page.click("#add-record-btn")
  //   // const addRecordBttn = await page.$('#add-record-btn');
  //   // // await addRecordBttn.addEventListener('click', e => {
  //   // //   window.onCustomEvent({type: 'click', detail: e.detail});
  //   // // });
  //   // if (addRecordBttn) {
  //   //   await addRecordBttn.click();
  //   //   console.log("records-clicked");

  //   //   // const invalidRecordType = await page.select('#grid-record-type',"deposit");
  //   //   // console.log(invalidRecordType);
  //   //   // await expect(invalidRecordType.length).toBe(0);
  //   //   // const validRecordTypeExpense = await page.select("#grid-record-type", "expense");
  //   //   // console.log(validRecordTypeExpense);
  //   //   // await expect(validRecordTypeExpense.length).toBe(1);
  //   //   // const validRecordTypeIncome = await page.select("#grid-record-type", "income");
  //   //   // await expect(validRecordTypeIncome.length).toBe(1);
  //   //   // const validRecordTypeTransfer = await page.select("#grid-record-type", "transfer");
  //   //   // await expect(validRecordTypeTransfer.length).toBe(1);
  //   //   // console.log(validRecordTypeTransfer);
  //   // }
  // })

  it("has all records page components", async () => {
    const title = await page.title();
    console.log("hello");
    console.log(title);
    await expect(title).toMatch("SaveThink");
    await page.waitForSelector("#add-record");
    await page.waitForSelector("#record-list");
    await page.waitForSelector("#record-button");
    await page.waitForSelector("#dashboard-button");
    await page.waitForSelector("#logo");
  });
});
