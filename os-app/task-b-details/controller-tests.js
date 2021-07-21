const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

import { JSDOM } from 'jsdom';
import OLSKLink from 'OLSKLink';
import OLSKCache from 'OLSKCache';

describe('DataCacheAggregateBasename', function test_DataCacheAggregateBasename() {

	it('returns string', function () {
		deepEqual(mod.DataCacheAggregateBasename(), '_aggregate');
	});

});

describe('_DataDOMPropertyCandidates', function test__DataDOMPropertyCandidates() {

	const __DataDOMPropertyCandidates = function (inputData = {}) {
		return mod._DataDOMPropertyCandidates(Object.assign({
			ParamURL: uLink(),
			ParamMetadata: {},
		}, inputData));
	};

	it('throws if not object', function () {
		throws(function () {
			mod._DataDOMPropertyCandidates(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ParamURL not string', function () {
		throws(function () {
			__DataDOMPropertyCandidates({
				ParamURL: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('throws if ParamMetadata not object', function () {
		throws(function () {
			__DataDOMPropertyCandidates({
				ParamMetadata: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(__DataDOMPropertyCandidates(), []);
	});

	it('throws if ParamManifest not object', function () {
		throws(function () {
			__DataDOMPropertyCandidates({
				ParamManifest: null,
			});
		}, /ZDRErrorInputNotValid/);
	});

	context('ParamMetadata', function () {
		
		it('extracts apple-touch-icon', function () {
			const path = uRandomElement('https://alfa.bravo/', Math.random().toString());
			const ParamURL = 'https://example.com';
			deepEqual(__DataDOMPropertyCandidates({
				ParamMetadata: {
					'apple-touch-icon': path,
				},
				ParamURL,
			}), Object.entries({
				ZDAProjectIconURL: OLSKLink.OLSKLinkRelativeURL(ParamURL, path),
			}));
		});

		it('extracts apple-touch-icon-precomposed', function () {
			const path = uRandomElement('https://alfa.bravo/', Math.random().toString());
			const ParamURL = 'https://example.com';
			deepEqual(__DataDOMPropertyCandidates({
				ParamMetadata: {
					'apple-touch-icon-precomposed': path,
				},
				ParamURL,
			}), Object.entries({
				ZDAProjectIconURL: OLSKLink.OLSKLinkRelativeURL(ParamURL, path),
			}));
		});

		it('extracts description', function () {
			const _ZDAProjectBlurb = Math.random().toString();
			deepEqual(__DataDOMPropertyCandidates({
				ParamMetadata: {
					'description': _ZDAProjectBlurb,
				},
			}), Object.entries({
				_ZDAProjectBlurb,
			}));
		});

		it('extracts title', function () {
			const _ZDAProjectBlurb = Math.random().toString();
			deepEqual(__DataDOMPropertyCandidates({
				ParamMetadata: {
					'title': _ZDAProjectBlurb,
				},
			}), Object.entries({
				_ZDAProjectBlurb,
			}));
		});
	
	});

	context('ParamManifest', function () {

		it('sets ZDAProjectHasManifest', function () {
			const ZDAProjectIconURL = uLink();
			deepEqual(__DataDOMPropertyCandidates({
				ParamManifest: {},
			}), Object.entries({
				ZDAProjectHasManifest: true,
			}));
		});

		it('extracts icons', function () {
			const ZDAProjectIconURL = uLink();
			deepEqual(__DataDOMPropertyCandidates({
				ParamManifest: {
					'icons': [{
						src: uLink(),
					}, {
						src: ZDAProjectIconURL,
					}],
				},
			}), Object.entries({
				ZDAProjectIconURL,
				ZDAProjectHasManifest: true,
			}));
		});
	
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

describe('SetupCacheObject', function test_SetupDetailCache() {

	const _SetupDetailCache = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKCache: Object.assign({
				OLSKCacheReadFile: (function () {}),
			}, inputData),
		});
		return _mod.SetupCacheObject() || _mod;
	};

	it('calls OLSKCacheReadFile', function () {
		const items = [];

		_SetupDetailCache({
			OLSKCacheReadFile: (function () {
				items.push(...arguments);
			}),
		});

		deepEqual(items, [mod.DataCacheAggregateBasename(), require('path').join(__dirname, '__cached')]);
	});

	it('sets _ValueCandidatesCache', function () {
		const OLSKCacheReadFile = uRandomElement(Math.random().toString(), null);

		deepEqual(_SetupDetailCache({
			OLSKCacheReadFile: (function () {
				return OLSKCacheReadFile;
			}),
		})._ValueCandidatesCache, OLSKCacheReadFile || {});
	});

});

describe('_SetupCandidates', function test__SetupCandidates() {

	const __SetupCandidates = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataContentString: (function () {
				return inputData.ParamHTML
			}),
			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskWrite: (function () {
					return [...arguments].pop();
				}),
			}, inputData),
		}, inputData)._SetupCandidates(inputData.ParamURL || Math.random().toString());
	};

	it('calls _DataContentString', function () {
		const ParamURL = uLink();

		deepEqual(uCapture(function (_DataContentString) {
			__SetupCandidates({
				ParamURL,
				_DataContentString,
			});
		}), [ParamURL]);
	});

	it('calls OLSKDiskWrite', async function () {
		const ParamURL = uLink();
		const ParamHTML = Math.random().toString();

		deepEqual(await new Promise(function (res) {
			return __SetupCandidates({
				ParamURL,
				_DataContentString: (function () {
					return ParamHTML;
				}),
				OLSKDiskWrite: (function () {
					res([...arguments])
				}),
			});
		}), [OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(ParamURL)), ParamHTML]);
	});

	it('returns _DataDOMPropertyCandidates', async function () {
		const ParamURL = uLink();
		const ParamHTML = `<link rel="apple-touch-icon" href="${ Math.random().toString() }" /><link rel="apple-touch-icon-precomposed" href="${ Math.random().toString() }" /><meta name="description" content="${ Math.random().toString() }"><title>${ Math.random().toString() }</title>`;
		deepEqual(await __SetupCandidates({
			ParamURL,
			ParamHTML,
			_DataDOMPropertyCandidates: (function () {
				return [
					['arguments', [...arguments]],
				];
			}),
		}), {
			arguments: [{
				ParamMetadata: require('OLSKDOM').OLSKDOMMetadata(ParamHTML, {
					JSDOM: JSDOM.fragment,
				}),
				ParamURL,
				ParamManifest: undefined,
			}],
		});
	});

	context('manifest', function () {

		const ParamURL = uLink();
		const manifest = '/manifest' + Math.random().toString();
		const ParamHTML = `<link rel="manifest" href="${ manifest }" />`;
		const ParamManifest = {
			[Math.random().toString()]: Math.random().toString(),
		};
		
		it('calls _DataContentString', async function () {
			const items = [];

			await __SetupCandidates({
				ParamURL,
				_DataContentString: (function () {
					items.push(...arguments);

					return ParamHTML;
				}),
			});

			deepEqual(items, [ParamURL, OLSKLink.OLSKLinkRelativeURL(ParamURL, manifest)]);
		});

		it('calls OLSKDiskWrite', async function () {
			const items = [];

			await __SetupCandidates({
				ParamURL,
				_DataContentString: (function (inputData) {
					return inputData === ParamURL ? ParamHTML : JSON.stringify(ParamManifest);
				}),
				OLSKDiskWrite: (function (param1, param2) {
					items.push([...arguments]);

					return param2;
				}),
			});

			deepEqual(items, [
				[OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(ParamURL)),
				ParamHTML],
				[OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(OLSKLink.OLSKLinkRelativeURL(ParamURL, manifest))), JSON.stringify(ParamManifest)],
				]);
		});

		it('returns _DataDOMPropertyCandidates', async function () {
			deepEqual(await __SetupCandidates({
				ParamURL,
				_DataContentString: (function (inputData) {
					return inputData === ParamURL ? ParamHTML : JSON.stringify(ParamManifest);
				}),
				_DataDOMPropertyCandidates: (function () {
					return [
						['arguments', [...arguments]],
					];
				}),
			}), {
				arguments: [{
					ParamMetadata: require('OLSKDOM').OLSKDOMMetadata(ParamHTML, {
						JSDOM: JSDOM.fragment,
					}),
					ParamURL,
					ParamManifest,
				}],
			});
		});
	
	});

});

describe('_SetupDetail', function test__SetupDetail() {

	const __SetupDetail = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_ValueFetchQueue: Object.assign({}, inputData),
			_DataFoilOLSKCache: Object.assign({
				OLSKCacheResultFetchRenew: (function () {}),
				OLSKCacheWriteFile: (function () {}),
			}, inputData),
			_SetupCandidates: (function () {}),
		}, inputData)._SetupDetail(inputData.url || Math.random().toString());
	};

	it('calls OLSKCacheResultFetchRenew', function () {
		const url = Math.random().toString();
		const _ValueCandidatesCache = {
			[Math.random().toString()]: Math.random().toString(),
		};

		const item = __SetupDetail({
			url,
			_ValueCandidatesCache,
			OLSKCacheResultFetchRenew: (function () {
				return [...arguments];
			}),
		}).pop();

		deepEqual(item, {
			ParamMap: _ValueCandidatesCache,
			ParamKey: url,
			ParamCallback: item.ParamCallback,
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: item._ParamCallbackDidFinish,
		});
	});

	context('ParamCallback', function () {

		it('calls OLSKQueueAdd', async function () {
			deepEqual(await __SetupDetail({
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData.ParamCallback();
				}),
				OLSKQueueAdd: (function () {
					return [...arguments].map(function (e) {
						return typeof e;
					});
				}),
			}), ['function']);
		});

		it('calls _SetupCandidates', async function () {
			const url = Math.random().toString();

			deepEqual(await __SetupDetail({
				url,
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData.ParamCallback();
				}),
				OLSKQueueAdd: (function (inputData) {
					return inputData();
				}),
				_SetupCandidates: (function () {
					return [...arguments];
				}),
			}), [url]);
		});
	
	});

	context('_ParamCallbackDidFinish', function () {

		it('calls OLSKCacheWriteFile', async function () {
			const _ValueCandidatesCache = {
				[Math.random().toString()]: Math.random().toString(),
			};

			deepEqual(await __SetupDetail({
				_ValueCandidatesCache,
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData._ParamCallbackDidFinish();
				}),
				OLSKCacheWriteFile: (function () {
					return [...arguments];
				}),
			}), [_ValueCandidatesCache, mod.DataCacheAggregateBasename(), require('path').join(__dirname, '__cached')]);
		});
	
	});

});

describe('SetupDetails', function test_SetupDetail() {

	const _SetupDetails = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			DataBankProjects: (function () {
				return [];
			}),
			_SetupDetail: (function () {}),
		}, inputData).SetupDetails();
	};

	it('calls _SetupDetail', async function () {
		const item = {
			ZDAProjectURL: Math.random().toString(),
		};
		deepEqual(await _SetupDetails({
			_DataFoilBanks: {
				DataBankProjects: (function () {
					return [item];
				}),
			},
			_SetupDetail: (function () {
				return [...arguments].slice(0, 1);
			}),
		}), [[item.ZDAProjectURL]]);
	});

});

describe('_SetupDetailsIncoming', function test__SetupDetailsIncoming() {

	const __SetupDetailsIncoming = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			DataBankProjects: (function () {
				return [];
			}),
			_SetupDetail: (function () {}),
		}, inputData)._SetupDetailsIncoming();
	};

	it('calls _SetupDetail', async function () {
		const item = {
			ZDAProjectURL: Math.random().toString(),
		};
		deepEqual(await __SetupDetailsIncoming({
			_DataFoilBanks: {
				DataBankProjects: (function () {
					return [item];
				}),
			},
			_SetupDetail: (function () {
				return [...arguments].slice(0, 1);
			}),
		}), [[item.ZDAProjectURL]]);
	});

	it('skips if _ValueCandidatesCache', async function () {
		const item = {
			ZDAProjectURL: Math.random().toString(),
		};
		deepEqual(await __SetupDetailsIncoming({
			_ValueCandidatesCache: {
				[item.ZDAProjectURL]: {},
			},
			_DataFoilBanks: {
				DataBankProjects: (function () {
					return [item];
				}),
			},
			_SetupDetail: (function () {
				return [...arguments].slice(0, 1);
			}),
		}), []);
	});

});
