if (typeof window !== "undefined") {
  window.React = require("react");
  window.ReactDOM = require("react-dom");

  require("amcharts3/amcharts/amcharts.js");
  require("amcharts3/amcharts/serial.js");
  require("amcharts3/amcharts/themes/light.js");

  require("./amcharts3-react.js");

  var component = window.AmCharts.React;
  var factory = React.createFactory(component);

  function AmCharts() {
    console.warn("Using AmCharts is deprecated, instead use AmCharts.React");
    return factory.apply(this, arguments);
  }

  AmCharts.React = component;

  function define(obj, name) {
    Object.defineProperty(obj, name, {
      configurable: true,
      enumerable: true,
      get: function () {
        return window.AmCharts[name];
      },
      set: function (v) {
        window.AmCharts[name] = v;
      }
    });
  }

  define(AmCharts, "baseHref");
  define(AmCharts, "bezierX");
  define(AmCharts, "bezierY");
  define(AmCharts, "charts");
  define(AmCharts, "dayNames");
  define(AmCharts, "monthNames");
  define(AmCharts, "processDelay");
  define(AmCharts, "shortDayNames");
  define(AmCharts, "shortMonthNames");
  define(AmCharts, "theme");
  define(AmCharts, "useUTC");
  define(AmCharts, "addInitHandler");
  define(AmCharts, "addPrefix");
  define(AmCharts, "clear");
  define(AmCharts, "formatDate");
  define(AmCharts, "formatNumber");
  define(AmCharts, "makeChart");
  define(AmCharts, "stringToDate");

  module.exports = AmCharts;

} else {
  module.exports = {};
}
