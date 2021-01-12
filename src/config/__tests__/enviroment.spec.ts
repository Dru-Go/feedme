import { mappedVars } from '../environments';

describe('env', () => {
	it('Admin domain set', () => {
		expect(mappedVars.appDomain).toBeDefined();
	});
	it('App email address set', () => {
		expect(mappedVars.appEmailAddress).toBeDefined();
	});
	it('Admin password set', () => {
		expect(mappedVars.appEmailPassword).toBeDefined();
	});
	it('AppName set', () => {
		expect(mappedVars.appName).toBeDefined();
	});
	it('JWT key set', () => {
		expect(mappedVars.jwtKey).toBeDefined();
	});
	it('Mongo URL set', () => {
		expect(mappedVars.mongoUrl).toBeDefined();
	});
	it('Port set', () => {
		expect(mappedVars.port).toBeDefined();
	});
});
