const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		bundle: "./src/index.js"
	},

	devtool: "eval-source-map",

	devServer: {
		contentBase: "./dist"
	},

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[chunkhash].js"
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
				use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
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
		new MiniCssExtractPlugin({
			filename: "style.[contenthash].css"
		}),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./src/index.html",
			inject: false,
			hash: true
		}),
		new WebpackMd5Hash()
	]
};
