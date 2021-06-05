var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, `dist`),
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, `dist`),
        port: 5000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
};
