"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var path_1 = __importDefault(require("path"));
var config = {
	mode: "production",
	devtool: "source-map",
	entry: "./src/index.ts",
	output: {
		filename: "index.js",
		path: path_1.default.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.[tj]sx?$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-typescript"],
					},
				},
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.html|svg$/i,
				use: "html-loader",
			},
			{
				test: /\.md$/i,
				use: [
					{
						loader: "raw-loader",
						options: {
							esModule: false,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
	plugins: [
		new html_webpack_plugin_1.default({
			template: "./src/index.html",
		}),
	],
};
exports.default = config;
