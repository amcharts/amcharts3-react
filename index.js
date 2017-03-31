if (typeof window !== "undefined") {
  window.React = require("react");
  window.ReactDOM = require("react-dom");

  require("./amcharts3-react.js");

  module.exports = window.AmCharts;

} else {
  module.exports = {};
}
