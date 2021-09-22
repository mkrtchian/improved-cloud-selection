const execSync = require("child_process").execSync;

module.exports = {
  start: function () {
    stopFrontendAndBackend();
    buildBackend();
    startBackend();
    // The frontend has to be built after the backend has started because
    // of the frontend static generation consuming the backend API
    buildFrontend();
    startFrontend();
  },
  stop: function () {
    stopFrontendAndBackend();
  },
};

const frontendPath = "../..";
const pm2Path = `node_modules/.bin/pm2`;
const frontendName = "enhanced_cloud_selection_frontend";
const backendPath = "../../../backend";

function stopFrontendAndBackend() {
  execute(
    `docker-compose -f ${backendPath}/docker-compose.prod.yml down || true`
  );
  execute(`cd ${frontendPath} && ${pm2Path} stop ${frontendName} || true`);
}

function buildBackend() {
  execute(`docker-compose -f ${backendPath}/docker-compose.prod.yml build`);
}

function startBackend() {
  execute(
    `docker-compose -f ${backendPath}/docker-compose.prod.yml up -d --force-recreate`
  );
}

function buildFrontend() {
  execute(
    `cd ${frontendPath} && NEXT_PUBLIC_BACKEND_URL=http://localhost:8001 node_modules/next/dist/bin/next build && node_modules/next/dist/bin/next export`
  );
}

function startFrontend() {
  execute(
    `cd ${frontendPath} && ${pm2Path} -f --name ${frontendName} serve out/ 3001`
  );
}

function execute(command, outputResult = true) {
  let options = {
    encoding: "utf-8",
  };
  if (outputResult) {
    options.stdio = "inherit";
  }
  execSync(command, options);
}
