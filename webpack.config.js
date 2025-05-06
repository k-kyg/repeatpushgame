module.exports = {
	entry: {
		index: "./ts/index.ts",
		main: "./ts/main.ts",
		game: "./ts/game.ts",
	},
	output: {
		filename: "[name].js",
		path: __dirname + "/js",
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
};
