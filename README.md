## Reproduction

This is a reproduction of the following Jest Issues:

1. https://github.com/facebook/jest/issues/12259
2. https://github.com/facebook/jest/issues/10927

It appears that jest is not calling `afterEach` and `afterAll` hooks when you
hit CTRL-C to send a SIGINT. Also, it somehow interferes with the calling of the
node process `exit` and `beforeExit` hooks.

### How this test suite works

In [`__tests__/process-exit-test.ts`](__tests__/process-exit.test.ts) there is
a test that writes "ok" to an output file for each hook. There are 4 hooks total
, and each writes to a file named after it.

* `process.on('exit')` -> `process.exit.txt`
* `process.on('beforeExit')` -> `process.beforeExit.txt`
* `afterAll()` -> `afterAll.txt`
* `afterEach()` -> `afterEach.txt`


### Setup

```
$ yarn install
```

### Expected Output (with normal test completion)

Run the tests by using the `yarn test` command. After running the test normally,
you should see all four files in the project directory.

```
$ yarn test
```

> Note, do NOT use `yarn jest` as it will not first clear out any output files
> from prior test cases.


### Actual Output (with normal test completion)

_only_ the `afterEach.txt` and `afterAll.txt` files are output. The
`process.exit.txt` and `process.beforeExit.txt` hooks are not.


### Expected Output (with SIGINT)

Run the tests by using the `yarn test`. They will pause for 5 seconds. After a
couple of seconds, hit CTRL-C to send `SIGINT` to the process. It should
run all teardown hooks as well as process exit hooks and create the files for
each one.

### Actual Oput (with SIGINT)

_No_ files are created at all since _no_ teardown hooks are run.

```
$ yarn test

```
