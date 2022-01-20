describe("beforeExit", () => {
  afterAll(function*() {
    console.log('afterAll');
  })
  afterEach(function*() {
    console.log('afterEach');
  })

  it('sleeps for a bit to give you a chance to send SIGINT', async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
  }, 6000);
})
