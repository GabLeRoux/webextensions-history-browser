const path = require("path");
const fileSystem = require("fs");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const env = require("./utils/env");

// load the secrets
const alias = {};

const secretsPath = path.join(__dirname, ("secrets." + env.NODE_ENV + ".js"));

const fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

if (fileSystem.existsSync(secretsPath)) {
    alias["secrets"] = secretsPath;
}

const options = {
    mode: process.env.NODE_ENV || "development",
    entry: {
        // popup: path.join(__dirname, "src", "js", "popup.js"),
        // options: path.join(__dirname, "src", "js", "options.js"),
        background: path.join(__dirname, "src", "js", "background.js"),
        history: path.join(__dirname, "src", "js", "history.js"),
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                // exclude: /node_modules/
            },
            {
                test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
                loader: "file-loader?name=[name].[ext]",
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: alias
    },
    plugins: [
        // clean the dist folder
        new CleanWebpackPlugin(),
        // expose and write the allowed env vars on the compiled bundle
        new webpack.EnvironmentPlugin(["NODE_ENV"]),
        new CopyWebpackPlugin([{
            from: "src/manifest.json",
            transform: function (content, path) {
                // generates the manifest file using the package.json informations
                return Buffer.from(JSON.stringify({
                    description: process.env.npm_package_description,
                    version: process.env.npm_package_version,
                    ...JSON.parse(content.toString())
                }))
            },
            writeToDisk: true
        }]),
        new CopyWebpackPlugin([
            {from: 'node_modules/bootstrap/fonts', to: 'fonts', writeToDisk: true},
            {from: 'src/css/slate-bootstrap.min.css', to: 'slate-bootstrap.min.css', writeToDisk: true},
        ]),

        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, "src", "popup.html"),
        //     filename: "popup.html",
        //     chunks: ["popup"]
        // }),
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, "src", "options.html"),
        //     filename: "options.html",
        //     chunks: ["options"]
        // }),
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, "src", "background.html"),
        //     filename: "background.html",
        //     chunks: ["background"]
        // }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "history.html"),
            filename: "history.html",
            chunks: ["history"]
        }),
        new WriteFilePlugin()
    ]
};

if (env.NODE_ENV === "development") {
    options.devtool = "cheap-module-eval-source-map";
}

module.exports = options;
