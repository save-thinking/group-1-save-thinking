const helloWorld = require('./helloWorld')

test('returns hello world', () => {
  expect(helloWorld()).toBe('Hello World!')
})
