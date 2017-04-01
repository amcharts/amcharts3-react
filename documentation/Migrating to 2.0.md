Migrating to amCharts React plugin 2.0
======================================

With the release of amCharts React plugin 2.0 we've made some significant changes. If you are using Webpack, make sure you read below and update your code accordingly.

1. We now have an npm package. In your `package.json`, change `"amcharts3-react": "amcharts/amcharts3-react"` to `"@amcharts/amcharts3-react": "^2.0.0"`

2. In addition, you should remove `"amcharts/amcharts3"` and `"amcharts/export"` from your `package.json`

3. Delete your `node_modules` folder and run `npm install` to make sure that you have the correct dependencies.

4. In your HTML file, you must now load AmCharts using `<script>` tags:

   ```html
   <link rel="stylesheet" href="https://www.amcharts.com/lib/3/plugins/export/export.css" type="text/css" media="all" />

   <script src="https://www.amcharts.com/lib/3/amcharts.js"></script>
   <script src="https://www.amcharts.com/lib/3/serial.js"></script>
   <script src="https://www.amcharts.com/lib/3/themes/light.js"></script>
   <script src="https://www.amcharts.com/lib/3/plugins/export/export.min.js"></script>
   ```

   This is the same as in [our demos](https://www.amcharts.com/demos/).

5. You must change `var AmCharts = require("amcharts3-react");` to `var AmCharts = require("@amcharts/amcharts3-react");`

6. You must remove the other AmCharts imports, such as `require("amcharts3/amcharts/pie.js");`

7. You should remove the `"path": "node_modules/amcharts3/amcharts"` from your chart configuration.

8. If you are using plugins (like [dataloader](https://github.com/amcharts/dataloader), [export](https://github.com/amcharts/export), etc.) then you must not import them with `require` or `import`, instead you must load them with a `<script>` tag:

   ```html
   <link rel="stylesheet" href="https://www.amcharts.com/lib/3/plugins/export/export.css" type="text/css" media="all" />

   <script src="https://www.amcharts.com/lib/3/plugins/export/export.min.js"></script>
   ```

Below are examples of the old and new usage.

Old syntax
----------

```json
{
  "devDependencies": {
    "react": "^15.4.2",
    "react-dom": "^15.4.2",
    "amcharts3": "amcharts/amcharts3",
    "amcharts3-react": "amcharts/amcharts3-react",
    "amcharts3-export": "amcharts/export"
  }
}
```

```js
require("amcharts3-export");

var AmCharts = require("amcharts3-react");

React.createElement(AmCharts.React, {
  "path": "node_modules/amcharts3/amcharts",
  ...
})
```

New syntax
----------

```json
{
  "devDependencies": {
    "react": "^15.4.2",
    "react-dom": "^15.4.2",
    "@amcharts/amcharts3-react": "^2.0.0"
  }
}
```

```html
<link rel="stylesheet" href="https://www.amcharts.com/lib/3/plugins/export/export.css" type="text/css" media="all" />

<script src="https://www.amcharts.com/lib/3/amcharts.js"></script>
<script src="https://www.amcharts.com/lib/3/serial.js"></script>
<script src="https://www.amcharts.com/lib/3/themes/light.js"></script>
<script src="https://www.amcharts.com/lib/3/plugins/export/export.min.js"></script>
```

```js
var AmCharts = require("@amcharts/amcharts3-react");

React.createElement(AmCharts.React, {
  ...
})
```
