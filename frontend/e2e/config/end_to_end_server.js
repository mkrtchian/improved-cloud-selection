const execSync = require("child_process").execSync;

module.exports = {
  start: function () {
    const backendPath = "../backend";
    execute(`cd ${backendPath} && docker-compose build`, true);
    execute(
      "NEXT_PUBLIC_BACKEND_URL=http://localhost:8000 node_modules/next/dist/bin/next build",
      true
    );
    execute("node_modules/.bin/pm2 delete pm2_backend.json", false);
    execute("node_modules/.bin/pm2 delete pm2_frontend.json", false);
    execute("node_modules/.bin/pm2 start pm2_backend.json", false);
    execute("node_modules/.bin/pm2 start pm2_frontend.json", true);
  },
  stop: function () {
    execute("node_modules/.bin/pm2 stop frontend", false);
    execute("node_modules/.bin/pm2 stop backend", true);
  },
};

function execute(command, output_result = false) {
  let output = execSync(command, {
    encoding: "utf-8",
  });
  if (output_result) {
    console.log("__________\n", output); // eslint-disable-line no-console
  }
}
