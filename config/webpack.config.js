const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "output.js",
    path: path.resolve(__dirname, "../dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
