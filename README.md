Installation
============

If you are using `<script>` tags
--------------------------------

1. Use `git` to download the `amcharts3-react` plugin:

   ```
   git clone https://github.com/amcharts/amcharts3-react.git
   ```

2. Include `react` and `react-dom`:

   ```
   <script src="https://unpkg.com/react@15.3.0/dist/react.min.js"></script>
   <script src="https://unpkg.com/react-dom@15.3.0/dist/react-dom.min.js"></script>
   ```

3. Also include `amcharts`:

   ```
   <script src="https://www.amcharts.com/lib/3/amcharts.js"></script>
   <script src="https://www.amcharts.com/lib/3/serial.js"></script>
   <script src="https://www.amcharts.com/lib/3/themes/light.js"></script>
   ```

4. Lastly include the `amcharts3-react` plugin:

   ```
   <script src="amcharts3-react/amcharts3-react.js"></script>
   ```

If you are using a bundler like Webpack or Browserify
-----------------------------------------------------

1. Create a `package.json` which includes `react`, `react-dom`, `amcharts/amcharts3`, and `amcharts/amcharts3-react`:

   ```
   {
     "devDependencies": {
       "react": "^15.4.2",
       "react-dom": "^15.4.2",
       "amcharts3": "amcharts/amcharts3",
       "amcharts3-react": "amcharts/amcharts3-react"
     }
   }
   ```

2. Run `npm install`

3. You can now import the `amcharts3-react` plugin:

   ```
   var AmCharts = require("amcharts3-react");
   ```

   And then you can use it:

   ```
   React.createElement(AmCharts.React, {
     ...
   });
   ```

   Or alternatively if you are using JSX:

   ```
   <AmCharts.React ... />
   ```

4. You will probably need to specify the [`path`](https://docs.amcharts.com/3/javascriptcharts/AmSerialChart#path) property, so that AmCharts can find the appropriate images:

   ```
   React.createElement(AmCharts.React, {
     "path": "node_modules/amcharts3/amcharts"
   })
   ```

5. If you want to use plugins (like [dataloader](https://github.com/amcharts/dataloader), [export](https://github.com/amcharts/export), [responsive](https://github.com/amcharts/responsive), [animate](https://github.com/amcharts/animate), etc.) you will need to do the following steps:

   1. Include the plugin in your `package.json`:

      ```
      {
        "devDependencies": {
          "amcharts3-export": "amcharts/export"
        }
      }
      ```

   2. When you want to use the plugin, put a `require` at the top of the file:

      ```
      // This must be at the top of the file:
      require("amcharts3-export");

      // The rest of the code goes here:
      var React = require("react");
      var AmCharts = require("amcharts3-react");

      React.createElement(AmCharts.React, {
        "export": {
          "enabled": true
        }
      });
      ```

   You can see an example program in the `examples/webpack-export` folder.

Usage
=====

Use the `AmCharts.React` component in your React programs:

```
React.createElement(AmCharts.React, {
  "type": "serial",
  "theme": "light",
  "graphs": [...],
  "dataProvider": [...]
})
```

Or alternatively if you are using JSX:

```
<AmCharts.React
  type="serial"
  theme="light"
  graphs={[...]}
  dataProvider={[...]} />
```

The configuration is exactly the same as the [`AmCharts.makeChart`](https://docs.amcharts.com/3/javascriptcharts/AmCharts#makeChart) method.

Changes to the configuration are automatically detected when rendering (you do not need to call [`validateNow`](https://docs.amcharts.com/3/javascriptcharts/AmSerialChart#validateNow) or [`validateData`](https://docs.amcharts.com/3/javascriptcharts/AmSerialChart#validateData)).

In addition, this plugin automatically generates an `id`, so you do not need to specify it.

You can see some example React programs in the `examples` folder. It updates the chart's `dataProvider` every 3 seconds.

## Changelog

### 1.1.8
* Fixing another bug with updating the chart data

### 1.1.7
* Fixing a bug where the chart does not zoom out when changing the `dataProvider`

### 1.1.6
* Fixing a bug where the chart won't show up properly on the first update

### 1.1.5
* Fixing a bug which caused stock charts to not update correctly

### 1.1.4
* Deprecating using `AmCharts` with Webpack, instead use `AmCharts.React`
* Adding in the various global `AmCharts` properties for Webpack

### 1.1.3
* Fixing a bug that caused the `listeners` to trigger multiple times

### 1.1.2
* Fixing an [issue when using `amcharts3-react` on the server](https://github.com/amcharts/amcharts3-react/issues/11)

### 1.1.1
* Fixing an [issue with `peerDependencies`](https://github.com/npm/npm/issues/3218)

### 1.1.0
* Adding in support for npm / webpack

### 1.0.0
* Initial release
