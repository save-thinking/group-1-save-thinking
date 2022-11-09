const path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "output.js",
    path: path.resolve(__dirname, "../dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
