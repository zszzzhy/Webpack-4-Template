const path = require("path");
const webpack = require("webpack");
const hotMiddlewareScript = "webpack-hot-middleware/client?path=/dist/__webpack_hmr&timeout=20000";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		bundle: ["./src/index.js", hotMiddlewareScript]
	},

	devtool: "eval-source-map",

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[hash].js",
		publicPath: "/"
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: "pre",
				include: [path.resolve(__dirname, "src")],
				loader: "eslint-loader",
				options: {
					fix: true
				}
			},
			{
				test: /\.js$/,
				include: [path.resolve(__dirname, "src")],
				use: ["babel-loader"]
			},
			{
				test: /\.scss$/,
				include: [path.resolve(__dirname, "src/styles")],
				use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				include: [path.resolve(__dirname, "src/images")],
				loader: "file-loader"
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				include: [path.resolve(__dirname, "src/fonts")],
				loader: "file-loader"
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./src/index.html",
			inject: false,
			hash: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
};
