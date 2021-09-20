const { setHeadlessWhen } = require("@codeceptjs/configure");

setHeadlessWhen(process.env.CI);

var server = require("./e2e/config/end_to_end_server");

exports.config = {
  tests: "./e2e/*_test.ts",
  output: "./e2e/output",
  helpers: {
    Playwright: {
      url: "http://localhost:3001",
      show: true,
      browser: "chromium",
    },
  },
  include: {
    I: "./e2e/config/steps_file.js",
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
