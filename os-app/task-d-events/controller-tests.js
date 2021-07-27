const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

describe('ZDAEventURLs', function test_ZDAEventURLs() {

	it('returns array', function () {
		deepEqual(mod.ZDAEventURLs(), process.env.ZDA_TASK_EVENTS_URLS.split(','));
	});

});

describe('ZDAEventURLRemoteStorage', function test_ZDAEventURLRemoteStorage() {

	it('returns string', function () {
		deepEqual(mod.ZDAEventURLRemoteStorage(), mod.ZDAEventURLs().filter(function (e) {
			return e.match(/RemoteStorage/i);
		}).shift());
	});

});

describe('ZDAEventURLFission', function test_ZDAEventURLFission() {

	it('returns string', function () {
		deepEqual(mod.ZDAEventURLFission(), mod.ZDAEventURLs().filter(function (e) {
			return e.match(/q0wId4DZFlx7LCP/i);
		}).shift());
	});

});

describe('ZDAEventURLSolidProject', function test_ZDAEventURLSolidProject() {

	it('returns string', function () {
		deepEqual(mod.ZDAEventURLSolidProject(), mod.ZDAEventURLs().filter(function (e) {
			return e.match(/Solid/i);
		}).shift());
	});

});

