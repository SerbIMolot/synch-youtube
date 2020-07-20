# gulp-serve-iis-express
IIS Express server plugin for gulp. This repository is forked off of [gulp-iis-express](https://github.com/82edwards/gulp-iis-express) (not actively maintained) with necessary fixes and improvements.

## Install
Install `gulp-serve-iis-express` as a development dependency:

```shell
npm install gulp-serve-iis-express --save-dev
```

## Usage
Create a new task using `gulp-serve-iis-express`, which might look like below:

```javascript
'use strict';

var gulp = require('gulp');
var iisexpress = require('gulp-serve-iis-express');

gulp.task('serve:site', function() {
    var configPath = path.join(__dirname, '..\\.vs\\config\\applicationHost.config');

    iisexpress({
        siteNames: ['site'],
        configFile: configPath
    });
});
```

## Advanced Usage
### Parameters
There are multiple parameters you can supply the object passed into the `gulp-serve-iis-express` variable:

```javascript
configFile // Required (String) path to the config file.
siteNames // Required (String Array) array of site names.
appPath // Optional (String) application folder path.
port // Optional (Number) port number to serve the application. Defaults to 8080.
clrVersion // Optional (String) Version of clr.
sysTray // Optional (Boolean) Show the application in the system tray.
iisExpressPath // Optional (String) Path to IIS Express if different from programfiles (x86)
```
### Additional Functionality
You can also call an additional function to launch the browser with a specified url after the server has been started. FYI, this is a work in progress currently and may not function correctly at the moment.

```javascript
iisexpress.launchBrowser({
    startUrl: 'localhost:3000',
    browser: 'chrome',
    siteFile: 'index.html'
});
```

## Contributing
Please open an issue first, then create a pull request with changes/additions linked to the issue.

## License
[MIT License](https://github.com/mitchwinn/gulp-server-iis-express/blob/master/LICENSE.txt)
