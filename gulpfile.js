const path = require('path');
const execSync = require('child_process').execSync;
const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackStream = require('webpack-stream');
const dirs = require('./configuration/dirs');

gulp.task("webpack-dev-server", function(callback) {

    const webpackDevConfig = require('./configuration/webpack/webpack.common');
    // Start a webpack-dev-server
    var compiler = webpack(webpackDevConfig);

    new WebpackDevServer(compiler, {
        historyApiFallback: true
        // server and middleware options
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/index.html");

        // keep the server alive or continue?
        // callback();
    });
});

gulp.task('webpack-build', (done) => {
    const webpackConfig = require('./configuration/webpack/webpack.common');
    webpack(webpackConfig, function (error, stats) {
        const errCount = stats.compilation.errors.length;
        if (error || errCount > 0) {
            stats.compilation.errors.forEach(function (err) {
                gutil.log('[webpack][error]', err.rawMessage || err.message || err);
            });
            throw new gutil.PluginError('[webpack] Error compiling sources', error);
        }
        done();
    });
});

gulp.task('build', ['webpack-build']);
gulp.task('default', ['webpack-dev-server']);