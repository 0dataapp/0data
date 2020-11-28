const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

describe('DataFetchURLs', function test_DataFetchURLs() {

	it('returns array', function () {
		deepEqual(mod.DataFetchURLs(), process.env.ZDA_VITRINE_FETCH_URLS.split(','));
	});

});
