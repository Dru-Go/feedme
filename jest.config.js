module.exports = {
	verbose: true,
	testURL: 'http://localhost/',
	testEnvironment: 'node',
	testPathIgnorePatterns: ['build/'],
	restoreMocks: true,
	roots: ['<rootDir>/src'],
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
