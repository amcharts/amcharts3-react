var webpack = require("webpack");
var path    = require("path");

module.exports = {
  entry: {
    "example": path.join(__dirname, "example.js")
  },

  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
    sourceMapFilename: "[file].map"
  }
};
