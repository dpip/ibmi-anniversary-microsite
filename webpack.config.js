var webpack = require('webpack');
var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './source/javascript/app.js',
    output: {
        filename: 'scripts.js',
        path: path.resolve(__dirname, 'public/assets/javascript'),
    },
    plugins: [
        new BrowserSyncPlugin({
            files: ["public/**/*.js", "public/**/*.css", "public/**/*.html"],
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: ['public']
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
        }
};
