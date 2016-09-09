Downloading
===========

If you are using npm, you can use this command:

```
npm install amcharts/amcharts3-react
```

Alternatively, you can put `amcharts/amcharts3-react` into your `dependencies` or `devDependencies`:

```
{
  "dependencies": {
    "amcharts3-react": "amcharts/amcharts3-react"
  }
}
```

----

If you are not using npm, you can use git to download the package:

```
git clone https://github.com/amcharts/amcharts3-react.git
```

Installation
============

* If you are using `<script>` tags:

  1. Include React and React-DOM:

     ```
     <script src="https://unpkg.com/react@15.3.0/dist/react.min.js"></script>
     <script src="https://unpkg.com/react-dom@15.3.0/dist/react-dom.min.js"></script>
     ```

  2. Also include AmCharts:

     ```
     <script src="https://www.amcharts.com/lib/3/amcharts.js"></script>
     <script src="https://www.amcharts.com/lib/3/serial.js"></script>
     <script src="https://www.amcharts.com/lib/3/themes/light.js"></script>
     ```

  3. Lastly include the amcharts3-react plugin:

     ```
     <script src="amcharts3-react.js"></script>
     ```

* If you are using a bundler like Webpack or Browserify, simply import the `amcharts3-react` plugin:

  ```
  var React = require("react");
  var ReactDOM = require("react-dom");
  var AmCharts = require("amcharts3-react");
  ```

  You can now use `AmCharts` directly, rather than using the `AmCharts.React` global.

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

The configuration is exactly the same as the `AmCharts.makeChart` method.

----

You can also store the chart configuration separately:

```
var config = {
  "type": "serial",
  "theme": "light",
  "graphs": [...],
  "dataProvider": [...]
};
```

```
React.createElement(AmCharts.React, config)
```

Or alternatively if you are using JSX:

```
<AmCharts.React {...config} />
```

----

Changes to the configuration are automatically detected when rendering (you do not need to call `validateNow` or `validateData`).

In addition, this plugin automatically generates an `id`, so you do not need to specify it.

You can see some example React programs in the `example` folder. It updates the chart's `dataProvider` every 3 seconds.


## Changelog

### 1.1.1
* Fixing an [issue with peerDependencies](https://github.com/npm/npm/issues/3218)

### 1.1.0
* Adding in support for npm / webpack

### 1.0.0
* Initial release
