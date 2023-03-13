const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	outputDir: "./dist",
	filenameHashing: false,
	chainWebpack: (config) => {
		config.externals({
			...config.get("externals"),
			uxp: "commonjs2 uxp",
			os: "commonjs2 os",
			fs: "commonjs2 fs",
			photoshop: "commonjs2 photoshop",
		});

		config.plugins.delete("preload");
		config.plugins.delete("prefetch");

		config.plugin("html").tap((args) => {
			args[0].template = "layout/plugin.html";
			return args;
		});
	},

	configureWebpack: {
		entry: "./src/main.js",
		devtool: false,

		optimization: {
			splitChunks: false,
		},

		plugins: [
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, "uxp"),
						to: path.resolve(__dirname, "dist"),
					},
				],
			}),
		],
	},
	pluginOptions: {},
};
