const { writeFileSync } = require('fs');

process.on('exit', () => {
  writeFileSync('process.exit.txt', "ok\n");
})
process.on('beforeExit', () => {
  writeFileSync('process.beforeExit.txt', "ok\n");
})

describe("beforeExit", () => {
  afterAll(() => {
    writeFileSync('afterAll.txt', "ok\n");
  });
  afterEach(() => {
    writeFileSync('afterEach.txt', "ok\n");
  })

  it('sleeps for a bit to give you a chance to send SIGINT', async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
  }, 6000);
});
