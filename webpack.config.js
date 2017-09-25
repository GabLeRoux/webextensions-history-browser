const path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: __dirname,
    devtool: "source-map",
    entry: {
        js: "./src/js/history.js"
    },
    output: {
        path: path.resolve(__dirname, 'addon'),
        filename: "[name]/bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            // Fixes a problem where functions from a background packed with webpackBootstrap were not defined
            // I had a hard time figuring this out, but webpack was breaking my background script...
            // todo: investigate this and pass background.js to the js pipeline instead
            {from: 'src/js/background.js', to: 'background.js'},
        ])
    ]
};
