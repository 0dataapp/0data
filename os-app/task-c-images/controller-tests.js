const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

import OLSKCache from 'OLSKCache';

describe('DataCachePath', function test_DataCachePath() {

	it('returns string', function () {
		deepEqual(mod.DataCachePath(), require('path').join(__dirname, '__cached', 'ui-assets'));
	});

	it('throws if not string', function () {
		throws(function () {
			mod.DataCachePath(null);
		}, /ZDAErrorInputNotValid/);
	});

	it('joins inputData', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataCachePath(item), require('path').join(__dirname, '__cached', 'ui-assets', item));
	});

});

describe('DataCacheLocalPath', function test_DataCacheLocalPath() {

	const _DataCacheLocalPath = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilFS: Object.assign({
				existsSync: (function () {}),
			}, inputData),
		}, inputData).DataCacheLocalPath(inputData.url || uLink());
	};

	it('calls existsSync', function () {
		const item = [];

		const url = uLink();

		_DataCacheLocalPath({
			url,
			existsSync: (function () {
				item.push(...arguments);
			}),
		});

		deepEqual(item, [mod.DataCachePath(OLSKCache.OLSKCacheURLFilename(url))]);
	});

	it('returns local URL if existsSync', function () {
		const url = uLink();

		deepEqual(_DataCacheLocalPath({
			url,
			existsSync: (function () {
				return true;
			}),
		}), mod.DataCachePath(OLSKCache.OLSKCacheURLFilename(url)).replace(require('path').join(__dirname, '../'), '/'));
	});

	it('returns null', function () {
		deepEqual(_DataCacheLocalPath({
			existsSync: (function () {
				return false;
			}),
		}), null);
	});

});

describe('SetupFetchQueue', function test_SetupFetchQueue() {

	const _SetupFetchQueue = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKQueue: inputData,
		}, inputData);
		return _mod.SetupFetchQueue() || _mod;
	};

	it('calls OLSKQueueAPI', function () {
		const item = Math.random().toString();
		deepEqual(_SetupFetchQueue({
			OLSKQueueAPI: (function () {
				return [...arguments].concat(item);
			}),
		})._ValueFetchQueue, [item]);
	});

	it('sets _ValueFetchQueue', function () {
		const item = Math.random().toString();

		deepEqual(_SetupFetchQueue({
			OLSKQueueAPI: (function () {
				return item;
			}),
		})._ValueFetchQueue, item);
	});

});

describe('_SetupImage', function test__SetupImage() {

	const __SetupImage = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueFetchQueue: Object.assign({}, inputData),
			_DataImagePipe: (function () {}),
		}, inputData)._SetupImage(inputData.url);
	};

	it('calls OLSKQueueAdd', async function () {
		const url = uLink();

		deepEqual(await __SetupImage({
			url,
			OLSKQueueAdd: (function () {
				return [...arguments].map(function (e) {
					return typeof e;
				});
			}),
		}), ['function']);
	});

	it('calls _DataImagePipe', async function () {
		const url = uLink();

		deepEqual(await __SetupImage({
			url,
			OLSKQueueAdd: (function (inputData) {
				return inputData();
			}),
			_DataImagePipe: (function () {
				return [...arguments];
			}),
		}), [url, mod.DataCachePath(OLSKCache.OLSKCacheURLFilename(url))]);
	});

});

describe('SetupImages', function test_SetupImages() {

	const _SetupImages = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilProjects: Object.assign({
				DataProjects: (function () {
					return [];
				}),
			}, inputData),
			_DataFoilBanks: Object.assign({
				DataBankProtocols: (function () {
					return [];
				}),
			}, inputData),
			_SetupImage: (function () {}),
		}, inputData).SetupImages();
	};

	it('calls _SetupImage', async function () {
		const ZDAProjectIconURL = Math.random().toString();

		deepEqual(await _SetupImages({
			DataProjects: (function () {
				return [{
					ZDAProjectIconURL,
				}];
			}),
			_SetupImage: (function () {
				return [...arguments];
			}),
		}), [[ZDAProjectIconURL]]);
	});

	it('ignores if no ZDAProjectIconURL', async function () {
		deepEqual(await _SetupImages({
			DataProjects: (function () {
				return [{}];
			}),
		}), []);
	});

	it('ignores if already local', async function () {
		const ZDAProjectIconURL = Math.random().toString();
		deepEqual(await _SetupImages({
			DataProjects: (function () {
				return [{
					ZDAProjectIconURL: Math.random().toString(),
					_ZDAProjectIconURLCachedPath: Math.random().toString(),
				}];
			}),
			_DataImagePipe: (function () {
				return [...arguments];
			}),
		}), []);
	});

	context('DataBankProtocols', function () {
		
		it('calls _SetupImage', async function () {
			const ZDAProtocolIconURL = Math.random().toString();

			deepEqual(await _SetupImages({
				DataBankProtocols: (function () {
					return [{
						ZDAProtocolIconURL,
					}];
				}),
				_SetupImage: (function () {
					return [...arguments];
				}),
			}), [[ZDAProtocolIconURL]]);
		});

		it('ignores if no ZDAProtocolIconURL', async function () {
			deepEqual(await _SetupImages({
				DataBankProtocols: (function () {
					return [{}];
				}),
			}), []);
		});

		it('ignores if already local', async function () {
			const ZDAProtocolIconURL = Math.random().toString();
			deepEqual(await _SetupImages({
				DataBankProtocols: (function () {
					return [{
						ZDAProtocolIconURL: Math.random().toString(),
						_ZDAProtocolIconURLCachedPath: Math.random().toString(),
					}];
				}),
				_DataImagePipe: (function () {
					return [...arguments];
				}),
			}), []);
		});
	
	});

});
