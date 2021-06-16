const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

import OLSKCache from 'OLSKCache';
import OLSKLink from 'OLSKLink';

describe('DataListingURLs', function test_DataListingURLs() {

	it('returns array', function () {
		deepEqual(mod.DataListingURLs(), process.env.ZDA_VITRINE_LISTING_URLS.split(','));
	});

});

describe('DataListingURLRemoteStorage', function test_DataListingURLRemoteStorage() {

	it('returns string', function () {
		deepEqual(mod.DataListingURLRemoteStorage(), mod.DataListingURLs().filter(function (e) {
			return e.match(/remotestorage/);
		}).shift());
	});

});

describe('DataListingURLFission', function test_DataListingURLFission() {

	it('returns string', function () {
		deepEqual(mod.DataListingURLFission(), mod.DataListingURLs().filter(function (e) {
			return e.match(/fission/);
		}).shift());
	});

});

describe('DataListingURLAwesome', function test_DataListingURLAwesome() {

	it('returns string', function () {
		deepEqual(mod.DataListingURLAwesome(), mod.DataListingURLs().filter(function (e) {
			return e.match(/awesome/);
		}).shift());
	});

});

describe('DataListingURLUnhosted', function test_DataListingURLUnhosted() {

	it('returns string', function () {
		deepEqual(mod.DataListingURLUnhosted(), mod.DataListingURLs().filter(function (e) {
			return e.match(/unhosted/);
		}).shift());
	});

});

describe('DataListingURLSolidProject', function test_DataListingURLSolidProject() {

	it('returns string', function () {
		deepEqual(mod.DataListingURLSolidProject(), mod.DataListingURLs().filter(function (e) {
			return e.match(/solid/);
		}).shift());
	});

});

describe('_DataListingObjects', function test__DataListingObjects() {

	it('throws if param1 not in DataListingURLs', function () {
		throws(function () {
			mod._DataListingObjects(Math.random().toString(), Math.random().toString());
		}, /ZDAErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod._DataListingObjects(uRandomElement(mod.DataListingURLs()), null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod._DataListingObjects(uRandomElement(mod.DataListingURLs()), ''), []);
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

			deepEqual(mod._DataListingObjects(mod.DataListingURLRemoteStorage(), uTable({
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

			deepEqual(mod._DataListingObjects(mod.DataListingURLRemoteStorage(), uTable({
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

			deepEqual(mod._DataListingObjects(mod.DataListingURLFission(), uList({
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

			deepEqual(mod._DataListingObjects(mod.DataListingURLFission(), uList({
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

			deepEqual(mod._DataListingObjects(mod.DataListingURLAwesome(), uList({
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

			deepEqual(mod._DataListingObjects(mod.DataListingURLAwesome(), uList({
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

			deepEqual(mod._DataListingObjects(mod.DataListingURLUnhosted(), uList({
				ZDAProjectName,
				ZDAProjectURL,
				_ZDAProjectImageHREF,
			})), [{
				ZDAProjectName,
				ZDAProjectURL,
				ZDAProjectIconURL: OLSKLink.OLSKLinkRelativeURL(mod.DataListingURLUnhosted(), _ZDAProjectImageHREF),
			}]);
		});
		
		it('strips whitespace', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();

			deepEqual(mod._DataListingObjects(mod.DataListingURLUnhosted(), uList({
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

			deepEqual(mod._DataListingObjects(mod.DataListingURLSolidProject(), uArticle({
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

			deepEqual(mod._DataListingObjects(mod.DataListingURLSolidProject(), uArticle({
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

			deepEqual(mod._DataListingObjects(mod.DataListingURLSolidProject(), uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: 'Copyright ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectBlurb].join(' '));
		});
		
		it('hides (c)', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataListingObjects(mod.DataListingURLSolidProject(), uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: '(c) ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectBlurb].join(' '));
		});
		
		it('hides . Source', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataListingObjects(mod.DataListingURLSolidProject(), uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: '. Source ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectBlurb].join(' '));
		});
		
		it('hides combination ', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataListingObjects(mod.DataListingURLSolidProject(), uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: 'Copyright (c) ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectBlurb].join(' '));
		});
		
	});

});

describe('DataListingProjects', function test_DataListingProjects() {
	
	const _DataListingProjects = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueCacheObject: {},
			_DataListingObjects: (function () {}),
		}, inputData).DataListingProjects();
	};

	it('calls _DataListingObjects', function () {
		const item = [];

		const _ValueCacheObject = mod.DataListingURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: Math.random().toString(),
			});
		}, {});
		
		_DataListingProjects({
			_ValueCacheObject,
			_DataListingObjects: (function () {
				item.push([...arguments]);

				return [];
			}),
		});

		deepEqual(item, mod.DataListingURLs().map(function (e) {
			return [e, _ValueCacheObject[e]];
		}));
	});

	it('returns _DataListingObjects', function () {
		deepEqual(_DataListingProjects({
			_DataListingObjects: (function () {
				return [{
					ZDAProjectURL: arguments[0],
				}];
			}),
		}), mod.DataListingURLs().reduce(function (coll, item) {
			return coll.concat({
				ZDAProjectURL: item,
			});
		}, []));
	});

	it('merges if ZDAProjectURL duplicate', function () {
		const ZDAProjectURL = Math.random().toString();
		const alfa = Math.random().toString();
		const bravo = Math.random().toString();
		
		deepEqual(_DataListingProjects({
			_DataListingObjects: (function () {
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
		deepEqual(_DataListingProjects({
			_DataListingObjects: mod._DataListingObjects,
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

describe('SetupListingsCache', function test_SetupListingsCache() {

	const _SetupListingsCache = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskRead: (function () {}),
			}, inputData),
		});
		return _mod.SetupListingsCache() || _mod;
	};

	it('calls OLSKDiskRead', function () {
		const items = [];

		_SetupListingsCache({
			OLSKDiskRead: (function () {
				items.push(...arguments);
			}),
		});

		deepEqual(items, mod.DataListingURLs().map(OLSKCache.OLSKCacheURLBasename).map(function (e) {
			return OLSKCache.OLSKCachePath(__dirname, e);
		}));
	});

	it('sets _ValueCacheObject', function () {
		const OLSKDiskRead = uRandomElement(Math.random().toString(), null);

		deepEqual(_SetupListingsCache({
			OLSKDiskRead: (function () {
				return OLSKDiskRead;
			}),
		})._ValueCacheObject, mod.DataListingURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: OLSKDiskRead,
			});
		}, {}));
	});

});

describe('_SetupListing', function test__SetupListing() {

	const __SetupListing = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataContentString: (function () {}),

			_DataFoilOLSKCache: Object.assign({
				OLSKCacheResultFetchRenew: (function () {}),
			}, inputData),

			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskWrite: (function () {}),
			}, inputData),
		}, inputData)._SetupListing(inputData.url || Math.random().toString());
	};

	it('calls OLSKCacheResultFetchRenew', function () {
		const url = Math.random().toString();
		const _ValueCacheObject = {
			[Math.random().toString()]: Math.random().toString(),
		};

		const item = __SetupListing({
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

			deepEqual(await __SetupListing({
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
			
			deepEqual(await __SetupListing({
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

describe('SetupListings', function test_SetupListings() {

	const _SetupListings = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_SetupListing: (function () {}),
		}, inputData).SetupListings();
	};

	it('calls _SetupListing', async function () {
		deepEqual(await _SetupListings({
			_SetupListing: (function (e) {
				return e;
			}),
		}), mod.DataListingURLs());
	});

});
