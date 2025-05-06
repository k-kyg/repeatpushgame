import path from "path";
import FixStyleOnlyEntries from "webpack-fix-style-only-entries";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default {
	entry: {
		index: "./ts/index.ts",
		main: "./ts/main.ts",
		game: "./ts/game.ts",
		style: "./style/style.scss",
	},
	output: {
		filename: "./js/[name].js",
		path: import.meta.dirname,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	plugins: [
		new FixStyleOnlyEntries(),
		new MiniCssExtractPlugin({
			filename: "./style/[name].css",
		}),
	],
	watchOptions: {
		ignored: /node_modules/
	}
};
