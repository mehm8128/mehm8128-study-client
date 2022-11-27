const path = require("path")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin")

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"storybook-addon-next-router",
	],
	framework: "@storybook/react",
	core: {
		builder: "@storybook/builder-webpack5",
	},

	webpackFinal: async (config) => {
		config.resolve.modules = [
			...(config.resolve.modules || []),
			path.resolve(__dirname, "../src"),
		]
		config.resolve.plugins = [
			...(config.resolve.plugins || []),
			new TsconfigPathsPlugin(),
		]
		config.plugins.push(new WindiCSSWebpackPlugin())
		return config
	},
}
