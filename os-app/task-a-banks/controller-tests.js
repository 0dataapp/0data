const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

import OLSKCache from 'OLSKCache';
import OLSKLink from 'OLSKLink';

describe('DataBankURLs', function test_DataBankURLs() {

	it('returns array', function () {
		deepEqual(mod.DataBankURLs(), process.env.ZDA_TASK_BANKS_URLS.split(','));
	});

});

describe('DataBankURLRemoteStorage', function test_DataBankURLRemoteStorage() {

	it('returns string', function () {
		deepEqual(mod.DataBankURLRemoteStorage(), mod.DataBankURLs().filter(function (e) {
			return e.match(/remotestorage/);
		}).shift());
	});

});

describe('DataBankURLFission', function test_DataBankURLFission() {

	it('returns string', function () {
		deepEqual(mod.DataBankURLFission(), mod.DataBankURLs().filter(function (e) {
			return e.match(/fission/);
		}).shift());
	});

});

describe('DataBankURLAwesome', function test_DataBankURLAwesome() {

	it('returns string', function () {
		deepEqual(mod.DataBankURLAwesome(), mod.DataBankURLs().filter(function (e) {
			return e.match(/awesome/);
		}).shift());
	});

});

describe('DataBankURLUnhosted', function test_DataBankURLUnhosted() {

	it('returns string', function () {
		deepEqual(mod.DataBankURLUnhosted(), mod.DataBankURLs().filter(function (e) {
			return e.match(/unhosted/);
		}).shift());
	});

});

describe('DataBankURLSolidProject', function test_DataBankURLSolidProject() {

	it('returns string', function () {
		deepEqual(mod.DataBankURLSolidProject(), mod.DataBankURLs().filter(function (e) {
			return e.match(/solid/);
		}).shift());
	});

});

describe('_DataBankObjects', function test__DataBankObjects() {

	it('throws if param1 not in DataBankURLs', function () {
		throws(function () {
			mod._DataBankObjects(Math.random().toString(), Math.random().toString());
		}, /ZDAErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod._DataBankObjects(uRandomElement(mod.DataBankURLs()), null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod._DataBankObjects(uRandomElement(mod.DataBankURLs()), ''), []);
	});

	context('remotestorage', function tost_remotestorage () {

		const uTable = function (inputData = {}) {
			const item = Object.assign({
				ZDAProjectName: Math.random().toString(),
				ZDAProjectBlurb: Math.random().toString(),
				ZDAProjectURL: Math.random().toString(),
			}, inputData);

			return `<table><tr><th></th></tr><tr><td><a rel="nofollow" class="external text" href="${ item.ZDAProjectURL }">${ item.ZDAProjectName }</a></td><td>${ item.ZDAProjectBlurb }</td><td>${ Math.random().toString() }</td><td> <a rel="nofollow" class="external text" href="${ Math.random().toString() }">${ Math.random().toString() }</a></td><td></td><td><ul><li>${ Math.random().toString() }</li></ul></td></tr></table><table><tr><td>${ Math.random().toString() }</td></tr></table>`;
		};
		
		it('parses table', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();

			deepEqual(mod._DataBankObjects(mod.DataBankURLRemoteStorage(), uTable({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectURL,
			})), [{
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectURL,
				_ZDAProjectSupportsRemoteStorage: true,
			}]);
		});
		
		it('strips whitespace', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();

			deepEqual(mod._DataBankObjects(mod.DataBankURLRemoteStorage(), uTable({
				ZDAProjectName: ' ' + ZDAProjectName + ' ',
				ZDAProjectBlurb: ' ' + ZDAProjectBlurb + ' ',
				ZDAProjectURL: ' ' + ZDAProjectURL + ' ',
			})), [{
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectURL,
				_ZDAProjectSupportsRemoteStorage: true,
			}]);
		});
	
	});

	context('fission', function test_fission () {

		const uList = function (inputData = {}) {
			const item = Object.assign({
				ZDAProjectName: Math.random().toString(),
				ZDAProjectURL: Math.random().toString(),
				ZDAProjectBlurb: Math.random().toString(),
			}, inputData);

			return `<article class="entry-content"><ul><li><a href="${ item.ZDAProjectURL }">${ item.ZDAProjectName }</a>: ${ item.ZDAProjectBlurb }</li></ul></article>`;
		};
		
		it('parses list', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataBankObjects(mod.DataBankURLFission(), uList({
				ZDAProjectName,
				ZDAProjectURL,
				ZDAProjectBlurb,
			})), [{
				ZDAProjectName,
				ZDAProjectURL,
				ZDAProjectBlurb,
				_ZDAProjectSupportsFission: true,
			}]);
		});
		
		it('strips whitespace', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataBankObjects(mod.DataBankURLFission(), uList({
				ZDAProjectName: ' ' + ZDAProjectName + ' ',
				ZDAProjectURL: ' ' + ZDAProjectURL + ' ',
				ZDAProjectBlurb: ' ' + ZDAProjectBlurb + ' ',
			})), [{
				ZDAProjectName,
				ZDAProjectURL,
				ZDAProjectBlurb,
				_ZDAProjectSupportsFission: true,
			}]);
		});
	
	});

	context('awesome', function test_awesome () {

		const uList = function (inputData = {}) {
			const item = Object.assign({
				ZDAProjectName: Math.random().toString(),
				ZDAProjectURL: Math.random().toString(),
				ZDAProjectBlurb: Math.random().toString(),
			}, inputData);

			return `<article class="entry-content"><ul><li><a href="${ item.ZDAProjectURL }">${ item.ZDAProjectName }</a>: ${ item.ZDAProjectBlurb }</li></ul></article>`;
		};
		
		it('parses list', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataBankObjects(mod.DataBankURLAwesome(), uList({
				ZDAProjectName,
				ZDAProjectURL,
				ZDAProjectBlurb,
			})), [{
				ZDAProjectName,
				ZDAProjectURL,
				ZDAProjectBlurb,
			}]);
		});
		
		it('strips whitespace', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataBankObjects(mod.DataBankURLAwesome(), uList({
				ZDAProjectName: ' ' + ZDAProjectName + ' ',
				ZDAProjectURL: ' ' + ZDAProjectURL + ' ',
				ZDAProjectBlurb: ' ' + ZDAProjectBlurb + ' ',
			})), [{
				ZDAProjectName,
				ZDAProjectURL,
				ZDAProjectBlurb
			}]);
		});
	
	});

	context('unhosted', function test_unhosted () {

		const uList = function (inputData = {}) {
			const item = Object.assign({
				ZDAProjectName: Math.random().toString(),
				ZDAProjectURL: Math.random().toString(),
			}, inputData);

			return `<ul class="icons"><li>${ item._ZDAProjectImageHREF ? `<a href="${ item.ZDAProjectURL }"><img src="${ item._ZDAProjectImageHREF }" /></a>` : '' }<p><a href="${ item.ZDAProjectURL }">${ item.ZDAProjectName }</a></p></li></ul>`;
		};
		
		it('parses list', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();
			const _ZDAProjectImageHREF = '/' + Math.random().toString();

			deepEqual(mod._DataBankObjects(mod.DataBankURLUnhosted(), uList({
				ZDAProjectName,
				ZDAProjectURL,
				_ZDAProjectImageHREF,
			})), [{
				ZDAProjectName,
				ZDAProjectURL,
				ZDAProjectIconURL: OLSKLink.OLSKLinkRelativeURL(mod.DataBankURLUnhosted(), _ZDAProjectImageHREF),
			}]);
		});
		
		it('strips whitespace', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();

			deepEqual(mod._DataBankObjects(mod.DataBankURLUnhosted(), uList({
				ZDAProjectName: ' ' + ZDAProjectName + ' ',
				ZDAProjectURL: ' ' + ZDAProjectURL + ' ',
			})), [{
				ZDAProjectName,
				ZDAProjectURL,
			}]);
		});
	
	});

	context('solidproject', function test_solidproject () {

		const uArticle = function (inputData = {}) {
			const item = Object.assign({
				ZDAProjectName: Math.random().toString(),
				ZDAProjectBlurb: Math.random().toString(),
				ZDAProjectExtra: Math.random().toString(),
				ZDAProjectURL: Math.random().toString(),
			}, inputData);

			return `<article><h1>${ Math.random().toString() }</h1><h2>${ Math.random().toString() }</h2><table><tbody><tr><td><a href="${ item.ZDAProjectURL }">${ item.ZDAProjectName }</a></td><td>${ item.ZDAProjectBlurb } <a href="${ item.ZDAProjectExtra }">${ item.ZDAProjectExtra }</a></td></tr></tbody></table><h2 id="pod-management">${ Math.random().toString() }</h2><table><tbody><tr><td><a href="${ Math.random().toString() }">${ Math.random().toString() }</a></td><td>${ Math.random().toString() } <a href="${ Math.random().toString() }">${ Math.random().toString() }</a></td></tr></tbody></table><h1 id="historical-solid-apps">${ Math.random().toString() }</h1><ul><li><table><tbody><tr><td><a href="${ Math.random().toString() }">${ Math.random().toString() }</a></td><td>${ Math.random().toString() } <a href="${ Math.random().toString() }">${ Math.random().toString() }</a></td></tr></tbody></table></li></ul><h1 id="apps-inclusion-and-exclusion-criteria">Apps inclusion and exclusion criteria</h1><p>${ Math.random().toString() }</p></article>`;
		};
		
		it('parses article', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();
			const ZDAProjectExtra = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();

			deepEqual(mod._DataBankObjects(mod.DataBankURLSolidProject(), uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra,
				ZDAProjectURL,
			})), [{
				ZDAProjectName,
				ZDAProjectBlurb: [ZDAProjectBlurb, ZDAProjectExtra].join(' '),
				ZDAProjectURL,
				_ZDAProjectSupportsSOLID: true,
			}]);
		});
		
		it('strips whitespace', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();
			const ZDAProjectExtra = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();

			deepEqual(mod._DataBankObjects(mod.DataBankURLSolidProject(), uArticle({
				ZDAProjectName: ' ' + ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: ZDAProjectExtra + ' ',
				ZDAProjectURL: ' ' + ZDAProjectURL + ' ',
			})), [{
				ZDAProjectName,
				ZDAProjectBlurb: [ZDAProjectBlurb, ZDAProjectExtra].join(' '),
				ZDAProjectURL,
				_ZDAProjectSupportsSOLID: true,
			}]);
		});
		
		it('hides Copyright', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataBankObjects(mod.DataBankURLSolidProject(), uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: 'Copyright ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectBlurb].join(' '));
		});
		
		it('hides (c)', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataBankObjects(mod.DataBankURLSolidProject(), uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: '(c) ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectBlurb].join(' '));
		});
		
		it('hides . Source', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataBankObjects(mod.DataBankURLSolidProject(), uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: '. Source ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectBlurb].join(' '));
		});
		
		it('hides combination ', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataBankObjects(mod.DataBankURLSolidProject(), uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: 'Copyright (c) ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectBlurb].join(' '));
		});
		
	});

});

describe('DataBankProjects', function test_DataBankProjects() {
	
	const _DataBankProjects = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueCacheObject: {},
			_DataBankObjects: (function () {}),
		}, inputData).DataBankProjects();
	};

	it('calls _DataBankObjects', function () {
		const item = [];

		const _ValueCacheObject = mod.DataBankURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: Math.random().toString(),
			});
		}, {});
		
		_DataBankProjects({
			_ValueCacheObject,
			_DataBankObjects: (function () {
				item.push([...arguments]);

				return [];
			}),
		});

		deepEqual(item, mod.DataBankURLs().map(function (e) {
			return [e, _ValueCacheObject[e]];
		}));
	});

	it('returns _DataBankObjects', function () {
		deepEqual(_DataBankProjects({
			_DataBankObjects: (function () {
				return [{
					ZDAProjectURL: arguments[0],
				}];
			}),
		}), mod.DataBankURLs().reduce(function (coll, item) {
			return coll.concat({
				ZDAProjectURL: item,
			});
		}, []));
	});

	it('merges if ZDAProjectURL duplicate', function () {
		const ZDAProjectURL = Math.random().toString();
		const alfa = Math.random().toString();
		const bravo = Math.random().toString();
		
		deepEqual(_DataBankProjects({
			_DataBankObjects: (function () {
				return [{
				ZDAProjectURL,
				alfa: alfa,
			}, {
				ZDAProjectURL,
				alfa: Math.random().toString(),
				bravo: bravo,
			}];
			}),
		}), [{
			ZDAProjectURL,
			alfa: alfa,
			bravo: bravo,
		}]);
	});

	it('passes default value if cache empty', function () {
		deepEqual(_DataBankProjects({
			_DataBankObjects: mod._DataBankObjects,
		}), []);
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

describe('SetupBanksCache', function test_SetupBanksCache() {

	const _SetupBanksCache = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskRead: (function () {}),
			}, inputData),
		});
		return _mod.SetupBanksCache() || _mod;
	};

	it('calls OLSKDiskRead', function () {
		const items = [];

		_SetupBanksCache({
			OLSKDiskRead: (function () {
				items.push(...arguments);
			}),
		});

		deepEqual(items, mod.DataBankURLs().map(OLSKCache.OLSKCacheURLBasename).map(function (e) {
			return OLSKCache.OLSKCachePath(__dirname, e);
		}));
	});

	it('sets _ValueCacheObject', function () {
		const OLSKDiskRead = uRandomElement(Math.random().toString(), null);

		deepEqual(_SetupBanksCache({
			OLSKDiskRead: (function () {
				return OLSKDiskRead;
			}),
		})._ValueCacheObject, mod.DataBankURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: OLSKDiskRead,
			});
		}, {}));
	});

});

describe('_SetupBank', function test__SetupBank() {

	const __SetupBank = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataContentString: (function () {}),

			_DataFoilOLSKCache: Object.assign({
				OLSKCacheResultFetchRenew: (function () {}),
			}, inputData),

			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskWrite: (function () {}),
			}, inputData),
		}, inputData)._SetupBank(inputData.url || Math.random().toString());
	};

	it('calls OLSKCacheResultFetchRenew', function () {
		const url = Math.random().toString();
		const _ValueCacheObject = {
			[Math.random().toString()]: Math.random().toString(),
		};

		const item = __SetupBank({
			url,
			_ValueCacheObject,
			OLSKCacheResultFetchRenew: (function () {
				return [...arguments];
			}),
		}).pop();

		deepEqual(item, {
			ParamMap: _ValueCacheObject,
			ParamKey: url,
			ParamCallback: item.ParamCallback,
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: item._ParamCallbackDidFinish,
		});
	});

	context('ParamCallback', function () {

		it('calls _DataContentString', async function () {
			const url = Math.random().toString();

			deepEqual(await __SetupBank({
				url,
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData.ParamCallback();
				}),
				_DataContentString: (function () {
					return [...arguments];
				}),
			}), [url]);
		});
	
	});

	context('_ParamCallbackDidFinish', function () {

		it('calls OLSKDiskWrite', async function () {
			const url = uLink();
			const data = Math.random().toString();
			
			deepEqual(await __SetupBank({
				url,
				_ValueCacheObject: {
					[url]: data,
				},
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData._ParamCallbackDidFinish();
				}),
				OLSKDiskWrite: (function () {
					return [...arguments];
				}),
			}), [OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(url)), data]);
		});
	
	});

});

describe('SetupBanks', function test_SetupBanks() {

	const _SetupBanks = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_SetupBank: (function () {}),
		}, inputData).SetupBanks();
	};

	it('calls _SetupBank', async function () {
		deepEqual(await _SetupBanks({
			_SetupBank: (function (e) {
				return e;
			}),
		}), mod.DataBankURLs());
	});

});
