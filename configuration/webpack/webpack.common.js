/**
 * Created by krusheth on 3/13/17.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dirs = require('../dirs');


module.exports = {
    context: path.join(__dirname + '/../../app'),
    entry: {
        vendor: './vendor.js',
        main: './main.js',
    },
    output: {
        path: dirs.PUBLIC_DIR,
        publicPath: '/',
        filename: '[name].js',
    },
    resolve: {
        // root: dirs.SRC_ROOT,
        extensions: ['.js', '.json', '.css', '.html'],
    },
    module: {
        loaders: [
            // { 
            //     test: /aws-sdk/, 
            //     loaders: ["transform-loader?brfs"]
            // },
            // { 
            //     test: /\.json$/, 
            //     loaders: ['json-loader']
            // },
            {
                test: /\.js/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sassjs-loader')
            },
            {
                test: /\.(html|bundle)$/,
                loader: 'raw-loader',
                include: [/app/],
                exclude: ['index.html'],
            },
            {
                test: /\.(woff|woff2|woff\?.*|eot|eot\?.*)$/,
                loader: 'url?prefix=font/&limit=5000&name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.(ttf|ttf\?.*|ttf\?.*)$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream&name=assets/[name].[hash].[ext]',
            },
            {
                test: /images/,
                loader: 'file-loader?name=assets/[name].[ext]',
            },
            {
                test: /\.(jpg|png|svg|svg\?.*|gif|json|xml)$/,
                loader: 'file-loader?name=assets/[name].[ext]',
            },
            // {
            //     test: /\.(woff|woff2|eot)$/,
            //     loader: 'url?prefix=font/&limit=5000'
            // },
            // {
            //     test: /\.ttf$/,
            //     loader: 'url?limit=10000&mimetype=application/octet-stream',
            // },
            // {
            //     test: /\.svg$/,
            //     loader: 'url?limit=10000&mimetype=image/svg+xml',
            // },
        ],
    },
    plugins: [
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