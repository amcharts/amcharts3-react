(function () {
  function getType(x) {
    // TODO make this faster ?
    return {}.toString.call(x);
  }

  function hasOwnKey(obj, key) {
    return {}.hasOwnProperty.call(obj, key);
  }


  function copyObject(x) {
    var output = {};

    // TODO use Object.keys ?
    for (var key in x) {
      if (hasOwnKey(x, key)) {
        output[key] = copy(x[key]);
      }
    }

    return output;
  }

  function copyArray(x) {
    var length = x.length;

    var output = new Array(length);

    for (var i = 0; i < length; ++i) {
      output[i] = copy(x[i]);
    }

    return output;
  }

  // TODO can this be made faster ?
  // TODO what about regexps, etc. ?
  function copy(x) {
    switch (getType(x)) {
    case "[object Array]":
      return copyArray(x);

    case "[object Object]":
      return copyObject(x);

    // TODO is this necessary ?
    case "[object Date]":
      return new Date(x.getTime());

    default:
      return x;
    }
  }


  function isNaN(x) {
    return x !== x;
  }

  function isNumberEqual(x, y) {
    return x === y || (isNaN(x) && isNaN(y));
  }


  function removeChartListeners(chart, x, y) {
    if (x !== y) {
      // TODO is this necessary ?
      if (x == null) {
        x = [];
      }

      // TODO is this necessary ?
      if (y == null) {
        y = [];
      }

      var xLength = x.length;
      var yLength = y.length;

      for (var i = 0; i < xLength; ++i) {
        var xValue = x[i];

        var has = false;

        // TODO make this faster ?
        for (var j = 0; j < yLength; ++j) {
          var yValue = y[j];

          // TODO is this correct ?
          if (xValue.event  === yValue.event &&
              xValue.method === yValue.method) {
            has = true;
            break;
          }
        }

        if (!has) {
          // TODO is this correct ?
          chart.removeListener(chart, xValue.event, xValue.method);
        }
      }
    }
  }


  function updateArray(a, x, y, isSkipOldData) {
    var didUpdate = false;

    if (x !== y) {
      var xLength = x.length;
      var yLength = y.length;

      if (xLength !== yLength) {
        a.length = yLength;
        didUpdate = true;
      }

      for (var i = 0; i < yLength; ++i) {
        if (i < xLength) {
            if (!isSkipOldData) {
                if (update(a, i, x[i], y[i])) {
                    didUpdate = true;
                }
            }
        } else {
          // TODO make this faster ?
          a[i] = copy(y[i]);
          // TODO is this necessary ?
          didUpdate = true;
        }
      }
    }

    return didUpdate;
  }

    function updateArrayNewBulk(a, y) {
        var didUpdate = false;

        for (var i = 0; i < y.length; ++i) {
            // TODO make this faster ?
            a[i] = copy(y[i]);
            // TODO is this necessary ?
            didUpdate = true;
        }

        return didUpdate;
    }


  function update(obj, key, x, y, activeSkip, isSkipOldData) {
    var didUpdate = false;

    if (x !== y) {
      var xType = getType(x);
      var yType = getType(y);

      var tempIsSkipOldData = false;

      if (activeSkip) {
          var tempIsSkipOldData = isSkipOldData;

          if (key === 'dataProvider' && y.length > x.length) {
              tempIsSkipOldData = true;
          }
      }

      if (xType === yType) {
        switch (xType) {
        case "[object Array]":
          if (obj && updateArray(obj[key], x, y, tempIsSkipOldData)) {
            didUpdate = true;
          }
          break;

        case "[object Object]":
          if (obj && updateObject(obj[key], x, y)) {
            didUpdate = true;
          }
          break;

        case "[object Date]":
          if (x.getTime() !== y.getTime()) {
            // TODO make this faster ?
            obj[key] = copy(y);
            didUpdate = true;
          }
          break;

        case "[object Number]":
          if (!isNumberEqual(x, y)) {
            // TODO is the copy necessary ?
            obj[key] = copy(y);
            didUpdate = true;
          }
          break;

        default:
          if (x !== y) {
            // TODO is the copy necessary ?
            obj[key] = copy(y);
            didUpdate = true;
          }
          break;
        }

      // TODO is this correct ?
      } else {
        // TODO make this faster ?
        obj[key] = copy(y);
        didUpdate = true;
      }
    }

    return didUpdate;
  }

  function updateObject(chart, oldObj, newObj) {
    var didUpdateClass = false;
    var didUpdateData = false;

    if (oldObj !== newObj) {
      // TODO use Object.keys ?
      for (var key in newObj) {
        if (hasOwnKey(newObj, key)) {
          // TODO make this faster ?
          if (hasOwnKey(oldObj, key)) {
            // TODO should this count as an update ?
            if (key === "listeners") {
              // TODO make this faster ?
              removeChartListeners(chart, oldObj[key], newObj[key]);
            }

            if (update(chart, key, oldObj[key], newObj[key], newObj.activeSkip)) {
                if (key = 'dataProvider') {
                    didUpdateData = true;
                } else {
                    didUpdateClass = true;
                }
            }

          } else {
            // TODO make this faster ?
            chart[key] = copy(newObj[key]);
              if (key = 'dataProvider') {
                  didUpdateData = true;
              } else {
                  didUpdateClass = true;
              }
          }
        }
      }

      // TODO use Object.keys ?
      for (var key in oldObj) {
        if (hasOwnKey(oldObj, key) && !hasOwnKey(newObj, key)) {
          if (key === "listeners") {
            removeChartListeners(chart, oldObj[key], []);
          }

          delete chart[key];
            if (key = 'dataProvider') {
                didUpdateData = true;
            } else {
                didUpdateClass = true;
            }
        }
      }
    }

    return {didUpdateData, didUpdateClass};
  }

  var id = 0;

  AmCharts.React = React.createClass({
    getInitialState: function () {
      return {
        id: "__AmCharts_React_" + (++id) + "__",
        chart: null
      };
    },

    componentDidMount: function () {
      // AmCharts mutates the config object, so we have to make a deep copy to prevent that
      var props = copy(this.props);

      this.setState({
        chart: AmCharts.makeChart(this.state.id, props)
      });
    },

    componentWillReceiveProps: function (nextProps) {
        if(this.state.chart){
            var didUpdate = updateObject(this.state.chart, this.props, nextProps);

            if (didUpdate.didUpdateClass) {
                this.state.chart.validateNow(true, false);
            }

            if (didUpdate.didUpdateData) {
                this.state.chart.validateData();
            }
        }
    },

    componentWillUnmount: function () {
      if (this.state.chart) {
        this.state.chart.clear();
      }
    },

    render: function () {
      return React.DOM.div({
        id: this.state.id,
        style: {
          width: this.props.width || "100%",
          height: this.props.height || "100%"
        }
      });
    }

  });
})();

