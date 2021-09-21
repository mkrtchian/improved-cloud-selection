require("ts-node/register");
const { setHeadlessWhen } = require("@codeceptjs/configure");

setHeadlessWhen(process.env.CI);

var server = require("./end_to_end_server");

exports.config = {
  tests: "../*_test.ts",
  output: "../output",
  helpers: {
    Playwright: {
      url: "http://localhost:3001",
      show: true,
      browser: "chromium",
    },
  },
  include: {
    I: "./steps_file.js",
  },
  bootstrap: server.start,
  teardown: server.stop,
  mocha: {},
  name: "frontend",
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
      attribute: "data-testid",
    },
  },
};
