const { throws, rejects, deepEqual } = require('assert');

const mod = require('./main.js');

describe('ZDABankURLs', function test_ZDABankURLs() {

	it('returns array', function () {
		deepEqual(mod.ZDABankURLs(), process.env.ZDA_TASK_BANKS_URLS.split(','));
	});

});

describe('ZDABankURLRemoteStorage', function test_ZDABankURLRemoteStorage() {

	it('returns string', function () {
		deepEqual(mod.ZDABankURLRemoteStorage(), mod.ZDABankURLs().filter(function (e) {
			return e.match(/RemoteStorage/i);
		}).shift());
	});

});

describe('ZDABankURLFission', function test_ZDABankURLFission() {

	it('returns string', function () {
		deepEqual(mod.ZDABankURLFission(), mod.ZDABankURLs().filter(function (e) {
			return e.match(/Fission/i);
		}).shift());
	});

});

describe('ZDABankURLAwesome', function test_ZDABankURLAwesome() {

	it('returns string', function () {
		deepEqual(mod.ZDABankURLAwesome(), mod.ZDABankURLs().filter(function (e) {
			return e.match(/Awesome/i);
		}).shift());
	});

});

describe('ZDABankURLUnhosted', function test_ZDABankURLUnhosted() {

	it('returns string', function () {
		deepEqual(mod.ZDABankURLUnhosted(), mod.ZDABankURLs().filter(function (e) {
			return e.match(/Unhosted/i);
		}).shift());
	});

});

describe('ZDABankURLSolidProject', function test_ZDABankURLSolidProject() {

	it('returns string', function () {
		deepEqual(mod.ZDABankURLSolidProject(), mod.ZDABankURLs().filter(function (e) {
			return e.match(/Solid/i);
		}).shift());
	});

});

describe('ZDABankProtocolProperties', function test_ZDABankProtocolProperties() {

	it('returns object', function () {
		deepEqual(mod.ZDABankProtocolProperties(), {
			ZDABankRemoteStorage: {
				ZDAProtocolName: 'remoteStorage',
			},
			ZDABankFission: {
				ZDAProtocolName: 'Fission',
			},
			ZDABankAwesome: {},
			ZDABankUnhosted: {},
			ZDABankSolidProject: {
				ZDAProtocolName: 'Solid',
			},
		});
	});

});
