const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

describe('DataFetchURLs', function test_DataFetchURLs() {

	it('returns array', function () {
		deepEqual(mod.DataFetchURLs(), process.env.ZDA_VITRINE_FETCH_URLS.split(','));
	});

});

describe('DataProjects', function test_DataFetchURLs() {

	it('throws if param1 not in DataFetchURLs', function () {
		throws(function () {
			mod.DataProjects(Math.random().toString(), Math.random().toString());
		}, /ZDAErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod.DataProjects(mod.DataFetchURLs()[Date.now() % mod.DataFetchURLs().length], null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.DataProjects(mod.DataFetchURLs()[Date.now() % mod.DataFetchURLs().length], ''), []);
	});

	context('remotestorage', function () {
		
		it('parses html', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();
			const ZDAProjectWebsite = Math.random().toString();

			deepEqual(mod.DataProjects(mod.DataFetchURLs()[0], `<table><tr><td><a rel=\"nofollow\" class=\"external text\" href=\"${ ZDAProjectWebsite }\">${ ZDAProjectName }</a></td><td>${ ZDAProjectBlurb }</td><td>${ Math.random().toString() }</td><td> <a rel=\"nofollow\" class=\"external text\" href=\"${ Math.random().toString() }\">${ Math.random().toString() }</a></td><td></td><td><ul><li>${ Math.random().toString() }</li></ul>\n</td></tr></table><table><tr><td>${ Math.random().toString() }</td></tr></table>`), [{
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectWebsite,
			}]);
		});
	
	});

});

describe('LifecycleModuleDidLoad', function test_LifecycleModuleDidLoad() {

	const _LifecycleModuleDidLoad = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataContentString: (function () {}),

			_DataFoilOLSKCache: Object.assign({
				OLSKCacheResultFetchRenew: (function (inputData) {
					if (inputData.ParamCallback) {
						inputData.ParamCallback();
					}

					if (inputData._ParamCallbackDidFinish) {
						inputData._ParamCallbackDidFinish();
					}
				}),
				OLSKCacheWriteFile: (function () {}),
			}, inputData),
		}, inputData).LifecycleModuleDidLoad();
	};

	it('calls OLSKCacheResultFetchRenew', function () {
		const item = [];

		const ParamMap = {
			alfa: Math.random().toString(),
		};

		_LifecycleModuleDidLoad({
			_ValueCache: ParamMap,
			OLSKCacheResultFetchRenew: (function () {
				item.push(...arguments);
			}),
		});

		deepEqual(item, mod.DataFetchURLs().map(function (ParamKey, i) {
			return {
				ParamMap,
				ParamKey,
				ParamCallback: item[i].ParamCallback,
				ParamInterval: 1000 * 60 * 60 * 24,
				_ParamCallbackDidFinish: item[i]._ParamCallbackDidFinish,
			}
		}));
	});

	context('ParamCallback', function () {

		it('calls _DataContentString', function () {
			const item = [];

			_LifecycleModuleDidLoad({
				_DataContentString: (function () {
					item.push(...arguments);
				}),
			});

			deepEqual(item, mod.DataFetchURLs());
		});
	
	});

	context('_ParamCallbackDidFinish', function () {

		it('calls _DataContentString', function () {
			const item = [];

			const _ValueCache = {
				alfa: Math.random().toString(),
			};

			_LifecycleModuleDidLoad({
				_ValueCache,
				OLSKCacheWriteFile: (function () {
					item.push(Array.from(arguments));
				}),
			});

			deepEqual(item, mod.DataFetchURLs().map(function () {
				return [_ValueCache, require('path').basename(__dirname), require('path').join(__dirname, '__cached')];
			}));
		});
	
	});

});
