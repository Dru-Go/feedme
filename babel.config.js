// babel.config.js
module.exports = (api) => {
	const isTest = api.env('test');

	const targets = {
		browsers: '> 0.25%, not dead',
	};

	if (isTest) {
		delete targets.browsers;
		targets.node = 'current';
	}

	return {
		presets: [
			[
				'@babel/preset-env',
				{
					useBuiltIns: 'entry',
					corejs: '3.0.0',
					targets,
				},
			],
			'@babel/typescript',
			'@babel/preset-typescript',
		],
		plugins: [
			'@babel/proposal-class-properties',
			'@babel/proposal-object-rest-spread',
			'@babel/plugin-transform-runtime',
		],
	};
};
