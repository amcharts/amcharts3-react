Migrating to amCharts React plugin 3.0
======================================

* If you are not using JSX:

   Old syntax
   ----------

   ```js
   React.createElement(AmCharts.React, {
     "width": "100%",
     "height": "500px",
     "type": "serial",
     "theme": "light",
     "graphs": [...],
     "dataProvider": [...]
   })
   ```

   New syntax
   ----------

   ```js
   React.createElement(AmCharts.React, {
     style: {
       width: "100%",
       height: "500px"
     },
     options: {
       "type": "serial",
       "theme": "light",
       "graphs": [...],
       "dataProvider": [...]
     }
   })
   ```

* If you are using JSX:

   Old syntax
   ----------

   ```js
   <AmCharts.React
     width="100%",
     height="500px"
     type="serial"
     theme="light"
     graphs={[...]}
     dataProvider={[...]} />
   ```

   ```js
   <AmCharts.React {...config} />
   ```

   New syntax
   ----------

   ```js
   <AmCharts.React
     style={{
       width: "100%",
       height: "500px"
     }}
     options={{
       "type": "serial",
       "theme": "light",
       "graphs": [...],
       "dataProvider": [...]
     }} />
   ```

   ```js
   <AmCharts.React options={config} />
   ```
