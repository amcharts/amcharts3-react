if (typeof window !== "undefined") {
  window.React = require("react");
  window.ReactDOM = require("react-dom");
  window.createReactClass = require("create-react-class");

  require("./amcharts3-react.js");

  module.exports = window.AmCharts;

} else {
  module.exports = {};
}
