const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const dotenv = require("dotenv");
dotenv.config();
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

console.log("nodeEnv" + process.env.NODE_ENV);
module.exports = {
    mode: process.env.NODE_ENV === "development" ? "development" : "production",
    entry: {
        main: path.resolve("./src/app.js"),
    },
    output: {
        // publicPath: "/webpack/dist/",
        filename: "[name].js",
        path: path.resolve("./dist"),
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use: [path.resolve("./myLoader.js")],
            // },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|jped|gif|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 1kb가 1024byte 이기 때문에 20kb를 원한다면 1024에 20을 곱합니다.
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `Commit version: ${childProcess.execSync(
                "git rev-parse --short HEAD"
            )}
                Committer name : ${childProcess.execSync(
                    "git config user.name"
                )}
                commit Date : ${new Date().toLocaleString()}`,
        }),
        new webpack.DefinePlugin({
            dev: JSON.stringify(process.env.DEV_API),
            pro: JSON.stringify(process.env.PRO_API),
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CleanWebpackPlugin(),
    ],
};
