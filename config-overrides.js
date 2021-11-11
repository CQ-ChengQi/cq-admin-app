const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
	config.plugins.push(
		new MonacoWebpackPlugin({
			languages: ['json', 'lua', 'javascript', 'csharp', 'cpp', 'xml'],
		}),
	);
	return config;
};
