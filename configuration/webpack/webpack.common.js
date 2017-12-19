/**
 * Created by krusheth on 3/13/17.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dirs = require('../dirs');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});


module.exports = {
    context: path.join(__dirname + '/../../app'),
    entry: {
        vendor: './vendor.js',
        main: './main.js',
    },
    output: {
        path: dirs.DIST_DIR,
        publicPath: '/',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.html'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.js/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                      ignore: '/node_modules/'        
                    }
                }]
            },
            {
                test: /\.(html|bundle)$/,
                use: [{
                    loader: "raw-loader",
                    // include: [/app/],
                    // exclude: ['index.html'],
                }]
            },
            {
                test: /\.(jpg|png|svg|svg\?.*|gif|json|xml)$/,
                use: [{
                    loader: 'file-loader?name=assets/[name].[ext]',
                }]
            },
        ],
    },
    plugins: [
        extractSass,
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor'],
        }),
        new HtmlWebpackPlugin({
            template: path.join(dirs.SRC_ROOT, 'index.html'),
            inject: 'head',
        }),
        new webpack.ProvidePlugin({
            "window.jQuery": "jquery",
            $: "jquery",
            jQuery: "jquery",
        }),
        new ExtractTextPlugin('[name].css'),
    ],
};