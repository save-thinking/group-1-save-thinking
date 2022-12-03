// /**
//  * @jest-environment puppeteer
//  */

//  const wsChromeEndpointurl = 'ws://127.0.0.1:9222/devtools/browser/0325677e-a04a-41ef-a29c-073caf8a13f4objc';
//  const browser = await puppeteer.connect({
//      browserWSEndpoint: wsChromeEndpointurl,
//  });

describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com')
  })

  it('should display "google" text on page', async () => {
    const title = await page.title();
    await expect(title).toMatch('Google')
  })
})


// describe('w3resource', () => {
//   beforeAll(async () => {
//     await page.goto('https://w3resource.com');
//   });

//   it('should be titled "w3resource"', async () => {
//     await expect(page.title()).resolves.toMatch('w3resource');
//   });
// });


