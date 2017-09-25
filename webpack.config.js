const path = require("path");

module.exports = {
    entry: {
        js: "./src/js/history.js",
        background_scripts: "./src/js/background.js",
    },
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "[name]/main.min.js"
    }
};
