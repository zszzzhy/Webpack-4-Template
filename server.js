const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const app = express();
const config = require("./webpack.config.js");
const compiler = webpack(config);

app.use(
	webpackDevMiddleware(compiler, {
		logLevel: "warn",
		publicPath: config.output.publicPath
	})
);

app.use(
	webpackHotMiddleware(compiler, {
		log: console.log,
		path: "/dist/__webpack_hmr",
		heartbeat: 10 * 1000
	})
);

app.listen(3000, function() {
	console.log("Express web app available at localhost: 3000!\n");
});
