const helloWorld = require("../src/js/helloWorld");

test("returns hello world", () => {
  expect(helloWorld()).toBe("Hello World!");
});
