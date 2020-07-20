(function () {
    var gulp = require('gulp'),
        util = require('gulp-util'),
        open = require('gulp-open'),
        shell = require('gulp-shell');

    const PLUGIN_NAME = 'gulp-serve-iis-express';

    // main gulp plugin function
    //-------------------------
    // PARAMS
    // config: object contains the following:
    //      configFile - path to the config file.
    //      siteNames - array of site names.
    //      appPath - application folder path.
    //      port - port number to serve the application. Defaults to 8080.
    //      clrVersion - Version of clr.
    //      sysTray - Show the application in the system tray.
    //      iisExpressPath - Path to IIS Express if different from programfiles (x86)
    function gulpServeIISExpress(config){
        // Config object...
        if (!config) {
            throw new util.PluginError(PLUGIN_NAME, "Config is missing!");
        }

        // configFile...
        if (!config.configFile) {
            config.configFile = "";
        }

        // siteNames...
        if (!config.siteNames) {
            config.siteNames = [];
        }

        // appPath...
        if (!config.appPath) {
            config.appPath = "";
        }

        // port...
        if (!config.port) {
            config.port = 8080;
        }

        // clrVersion...
        if (!config.clrVersion) {
            config.clrVersion = "v4.0";
        }

        if (config.configFile != "" && config.appPath != "") {
            throw new util.PluginError(PLUGIN_NAME, "Cannot combine config file-based IIS Express run with path-based run");
        }

        if (config.appPath == "" && config.siteNames.length == 0) {
            throw new util.PluginError(PLUGIN_NAME, "No sites to run in config");
        }

        // Config sysTray...
        if (!config.sysTray) {
            config.sysTray = true;
        }

        if(!config.iisExpressPath || config.iisExpressPath == ""){
            config.iisExpressPath = process.env.PROGRAMFILES + "\\IIS Express";
        }

        // Return by starting the sites.
        return gulp.src('/index.html')
            .pipe(startSites(config))
            .on('error', util.log);
    }

    // launch browser helper function
    gulpServeIISExpress.launchBrowser = function(config){
        // Default options
        if (!config) {
            throw new util.PluginError(PLUGIN_NAME, "Missing config for launchBrowser");
        }
        if (!config.startUrl || config.startUrl == ""){
            throw new util.PluginError(PLUGIN_NAME, "startUrl must be provided");
        }
        if (!config.browser || config.browser == ""){
            config.browser = "chrome";
        }
        if(!config.siteFile) {
            config.siteFile = 'index.html';
        }
        return gulp.src('/' + config.siteFile)
            .pipe(open('', {
                url: config.startUrl,
                app: config.browser
            }))
            .on('error', util.log);
    }

    // starting the sites.
    function startSites(config){
        config.siteNames.forEach(function(item){
            var cmd = 'iisexpress /site:"'  + item + '"';

            if(config.configFile !== ""){
                cmd += ' /config:"' + config.configFile + '"';
            }

            if (config.sysTray){
                cmd += ' /systray:true';
            }else{
                cmd += ' /systray:false';
            }

            gulp.src('')
                .pipe(shell([
                    cmd
                ],{
                    cwd: config.iisExpressPath
                }))
                .on('error', util.log);
        });

        return gulp.src('');
    }

    // Exporting the plugin main function
    module.exports = gulpServeIISExpress;
})();
