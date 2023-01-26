## Testing unhandled promise rejection management for node v16

### Results

Testing by calling `curl "http://localhost:3000/users/test?pass=true"` for a happy case, and `curl "http://localhost:3000/users/test?pass=false"` to throw the UnhandledPromiseRejection exception.   

Without the `--unhandled-rejections=warn` flag:
```
jinhon@SE0387 testing % nvm use 16.19.0
Now using node v16.19.0 (npm v8.19.3)
jinhon@SE0387 testing % node --trace-warnings ./bin/www
w true
GET /users/test?pass=true 200 2.926 ms - 6
w false
node:internal/process/promises:279
            triggerUncaughtException(err, true /* fromPromise */);
            ^

[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "rejected".] {
  code: 'ERR_UNHANDLED_REJECTION'
}
jinhon@SE0387 testing %
```

Note that the instance crashed.

With the `--unhandled-rejections=warn` flag:
```
jinhon@SE0387 testing % nvm use 16.19.0
Now using node v16.19.0 (npm v8.19.3)
jinhon@SE0387 testing % node --trace-warnings --unhandled-rejections=warn ./bin/www
w true
GET /users/test?pass=true 200 5.517 ms - 6
w false
(node:20998) UnhandledPromiseRejectionWarning: rejected
    at emitUnhandledRejectionWarning (node:internal/process/promises:193:15)
    at processPromiseRejections (node:internal/process/promises:270:11)
    at processTicksAndRejections (node:internal/process/task_queues:97:32)
(node:20998) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 2)
GET /users/test?pass=false - - ms - -
w true
GET /users/test?pass=true 200 0.888 ms - 6
```

Note that the instance remains live.

## Conclusion
Using the `--unhandled-rejections=warn` flag can help us safely update from node v14 to v16.
