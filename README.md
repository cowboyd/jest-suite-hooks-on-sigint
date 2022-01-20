## Reproduction

It appears that jest is not calling `afterEach` and `afterAll` hooks when you
hit CTRL-C to send a SIGINT.

To reproduce, first run yarn install
```
$ yarn install
```

then you should be able to hit ctrl-c while the test suite is running and you
see that `test suite is running`

```
$ yarn test

```
