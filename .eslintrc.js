module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	extends: ['eslint:recommended', 'airbnb-base'],
	parserOptions: {
		ecmaVersion: 2019,
	},
	rules: {
		// for rules, 0 means ignore, 1 means warn, and 2 means error
		'linebreak-style': 0,
		indent: 0,
		'no-tabs': 0,
		radix: 0,
		'no-plusplus': 0,
		'spaced-comment': 0,
		'no-console': 0,
		'max-len': 0,
		quotes: 0,
		'no-multiple-empty-lines': 0,
		'eol-last': 1,
		'consistent-return': 0,
		'space-in-parens': 0,
		'space-before-function-paren': 0,
		'import/extensions': [1, { js: 'always', json: 'never' }],
		'array-bracket-spacing': 0,
	},
};
