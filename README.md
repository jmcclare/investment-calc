# investment-calc

A React app that simulates investment growth and returns over time.

The app is a site module that works in my [Node.js Koa site
template](https://github.com/jmcclare/koa-template). It can also work in any
project setup to compile JSX.


## Installation ##

First, follow the instructions to install the [Node.js Koa site
template](https://github.com/jmcclare/koa-template).

```bash
git clone git@github.com:jmcclare/koa-template.git app
cd app
rm -rf .git
```

Clone this repository into the `site_modules` directory.

```bash
cd site_modules
git clone git@github.com:jmcclare/investment-calc.git
cd investment-calc
rm -rf .git
```

Symlink the JSX and Stylus files into the main app’s `assets`.

```bash
ln -s assets/_js ../../assets/_js/investment-calc
ln -s assets/_css ../../assets/_css/investment-calc
```

Import the Stylus in the main app’s `assets/_css/site.styl`.

```stylus
@import './investment-calc'
```

Import and render the React app in the main app’s `assets/_js/react-app.jsx`.

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

import ICalc from './investment-calc'

ReactDOM.render(
  <ICalc />,
  document.getElementById('tic-tac-toe')
)
```

In the default site, the investment calculator will show up on the “React
Sample” page.
