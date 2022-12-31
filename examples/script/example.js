// Generate random data
function generateData() {
  var firstDate = new Date();

  var dataProvider = [];

  for (var i = 0; i < 100; ++i) {
    var date = new Date(firstDate.getTime());

    date.setDate(i);

    dataProvider.push({
      date: date,
      value: Math.floor(Math.random() * 100)
    });
  }

  return dataProvider;
}


// Component which contains the dynamic state for the chart
var Chart = createReactClass({
  getInitialState: function () {
    return {
      dataProvider: generateData(),
      timer: null
    };
  },

  componentDidMount: function () {
    var self = this;

    self.setState({
      // Update the chart dataProvider every 3 seconds
      timer: setInterval(function () {
        self.setState({
          dataProvider: generateData()
        });
      }, 3000)
    });
  },

  componentWillUnmount: function () {
    clearInterval(this.state.timer);
  },

  render: function () {
    // Render the chart
    return React.createElement(AmCharts.React, {
      style: {
        width: "100%",
        height: "500px"
      },
      options: {
        "type": "serial",
        "theme": "light",
        "marginRight": 40,
        "marginLeft": 40,
        "autoMarginOffset": 20,
        "mouseWheelZoomEnabled": true,
        "valueAxes": [{
          "id": "v1",
          "axisAlpha": 0,
          "position": "left",
          "ignoreAxisWidth": true
        }],
        "balloon": {
          "borderThickness": 1,
          "shadowAlpha": 0
        },
        "graphs": [{
          "id": "g1",
          "balloon":{
            "drop": true,
            "adjustBorderColor": false,
            "color":"#ffffff"
          },
          "bullet": "round",
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          "bulletSize": 5,
          "hideBulletsCount": 50,
          "lineThickness": 2,
          "title": "red line",
          "useLineColorForBulletBorder": true,
          "valueField": "value",
          "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
        }],
        "chartScrollbar": {
          "graph": "g1",
          "oppositeAxis": false,
          "offset":30,
          "scrollbarHeight": 80,
          "backgroundAlpha": 0,
          "selectedBackgroundAlpha": 0.1,
          "selectedBackgroundColor": "#888888",
          "graphFillAlpha": 0,
          "graphLineAlpha": 0.5,
          "selectedGraphFillAlpha": 0,
          "selectedGraphLineAlpha": 1,
          "autoGridCount": true,
          "color":"#AAAAAA"
        },
        "chartCursor": {
          "pan": true,
          "valueLineEnabled": true,
          "valueLineBalloonEnabled": true,
          "cursorAlpha":1,
          "cursorColor":"#258cbb",
          "limitToGraph":"g1",
          "valueLineAlpha":0.2,
          "valueZoomable": true
        },
        "valueScrollbar":{
          "oppositeAxis": false,
          "offset":50,
          "scrollbarHeight":10
        },
        "categoryField": "date",
        "categoryAxis": {
          "parseDates": true,
          "dashLength": 1,
          "minorGridEnabled": true
        },
        "dataProvider": this.state.dataProvider
      }
    });
  }
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(Chart, null));
