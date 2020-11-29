const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

describe('DataFetchURLs', function test_DataFetchURLs() {

	it('returns array', function () {
		deepEqual(mod.DataFetchURLs(), process.env.ZDA_VITRINE_FETCH_URLS.split(','));
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
