import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const config: Configuration = {
	mode: "production",
	devtool: "source-map",
	entry: "./src/index.ts",
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist"),
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
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
	],
};

export default config;
