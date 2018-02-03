const path = require("path");
let CopyWebpackPlugin = require('copy-webpack-plugin');

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
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            },
            {
                test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file?name=fonts/[name].[ext]"
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            // Fixes a problem where functions from a background packed with webpackBootstrap were not defined
            // I had a hard time figuring this out, but webpack was breaking my background script...
            // todo: investigate this and pass background.js to the js pipeline instead
            {from: 'src/js/background.js', to: 'background.js'},
            {from: 'node_modules/bootstrap/fonts', to: 'fonts'},
        ])
    ]
};
