import {
	generateHashedPassword,
	generateJwtToken,
	generateAccountActivationUrl,
} from '../index';

describe('Testing Utility functions', () => {
	it('generated hashed password', () => {
		const hash = generateHashedPassword('password');
		expect(hash).toBeTruthy();
	});

	it('generate jwt token', () => {
		const token = generateJwtToken('ASDA34234234ASD324@#212312SAD');
		expect(token).toBeTruthy();
	});

	it('generate account activation url', () => {
		const url = generateAccountActivationUrl(
			'ASDA34234234ASD324@#212312SAD',
			'12312234234234',
			'drumac2@gmail.com'
		);
		expect(url).toBeTruthy();
	});
});
