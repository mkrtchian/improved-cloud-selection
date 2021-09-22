const prefix = process.env.NEXT_PUBLIC_BASE_PATH;

module.exports = {
  trailingSlash: true,
  assetPrefix: prefix ? prefix : "",
  basePath: prefix ? prefix : "",
};
