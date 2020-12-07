const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

describe('DataCacheNamePrimary', function test_DataCacheNamePrimary() {

	it('returns string', function () {
		deepEqual(mod.DataCacheNamePrimary(), 'cache-alfa-primary');
	});

});

describe('DataCacheNameDetails', function test_DataCacheNameDetails() {

	it('returns string', function () {
		deepEqual(mod.DataCacheNameDetails(), 'cache-bravo-details');
	});

});

describe('DataListingURLs', function test_DataListingURLs() {

	it('returns array', function () {
		deepEqual(mod.DataListingURLs(), process.env.ZDA_VITRINE_LISTING_URLS.split(','));
	});

});

describe('DataFetchURLIndexRemoteStorage', function test_DataFetchURLIndexRemoteStorage() {

	it('returns array', function () {
		deepEqual(mod.DataFetchURLIndexRemoteStorage(), 0);
	});

});

describe('DataFetchURLIndexSolidProject', function test_DataFetchURLIndexSolidProject() {

	it('returns array', function () {
		deepEqual(mod.DataFetchURLIndexSolidProject(), 1);
	});

});

describe('DataFetchURLIndexUnhosted', function test_DataFetchURLIndexUnhosted() {

	it('returns array', function () {
		deepEqual(mod.DataFetchURLIndexUnhosted(), 2);
	});

});

describe('_DataListingProjects', function test__DataListingProjects() {

	it('throws if param1 not in DataListingURLs', function () {
		throws(function () {
			mod._DataListingProjects(Math.random().toString(), Math.random().toString());
		}, /ZDAErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod._DataListingProjects(uRandomElement(mod.DataListingURLs()), null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod._DataListingProjects(uRandomElement(mod.DataListingURLs()), ''), []);
	});

	context('remotestorage', function () {

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

			deepEqual(mod._DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexRemoteStorage()], uTable({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectURL,
			})), [{
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectURL,
			}]);
		});
		
		it('strips whitespace', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();

			deepEqual(mod._DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexRemoteStorage()], uTable({
				ZDAProjectName: ' ' + ZDAProjectName + ' ',
				ZDAProjectBlurb: ' ' + ZDAProjectBlurb + ' ',
				ZDAProjectURL: ' ' + ZDAProjectURL + ' ',
			})), [{
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectURL,
			}]);
		});
	
	});

	context('solidproject', function () {

		const uArticle = function (inputData = {}) {
			const item = Object.assign({
				ZDAProjectName: Math.random().toString(),
				ZDAProjectBlurb: Math.random().toString(),
				ZDAProjectExtra: Math.random().toString(),
				ZDAProjectURL: Math.random().toString(),
			}, inputData);

			return `<article><p>${ Math.random().toString() }</p><h2>${ Math.random().toString() }</h2><ul><li><a href="${ item.ZDAProjectURL }">${ item.ZDAProjectName }</a> ${ item.ZDAProjectBlurb } <a href="${ item.ZDAProjectExtra }">${ item.ZDAProjectExtra }</a></li></ul><h1 id="historical-solid-apps">${ Math.random().toString() }</h1><ul><li><a href="${ Math.random().toString() }">${ Math.random().toString() }</a> ${ Math.random().toString() }</li></ul><h1 id="apps-inclusion-and-exclusion-criteria">Apps inclusion and exclusion criteria</h1><ul><li>${ Math.random().toString() }</li></ul></article>`;
		};
		
		it('parses article', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();
			const ZDAProjectExtra = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();

			deepEqual(mod._DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexSolidProject()], uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra,
				ZDAProjectURL,
			})), [{
				ZDAProjectName,
				ZDAProjectBlurb: [ZDAProjectName, ZDAProjectBlurb, ZDAProjectExtra].join(' '),
				ZDAProjectURL,
			}]);
		});
		
		it('strips whitespace', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();
			const ZDAProjectExtra = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();

			deepEqual(mod._DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexSolidProject()], uArticle({
				ZDAProjectName: ' ' + ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: ZDAProjectExtra + ' ',
				ZDAProjectURL: ' ' + ZDAProjectURL + ' ',
			})), [{
				ZDAProjectName,
				ZDAProjectBlurb: [ZDAProjectName, ZDAProjectBlurb, ZDAProjectExtra].join(' '),
				ZDAProjectURL,
			}]);
		});
		
		it('hides Copyright', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexSolidProject()], uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: 'Copyright ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectName, ZDAProjectBlurb].join(' '));
		});
		
		it('hides (c)', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexSolidProject()], uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: '(c) ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectName, ZDAProjectBlurb].join(' '));
		});
		
		it('hides . Source', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexSolidProject()], uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: '. Source ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectName, ZDAProjectBlurb].join(' '));
		});
		
		it('hides combination ', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexSolidProject()], uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: 'Copyright (c) ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectName, ZDAProjectBlurb].join(' '));
		});
		
	});

	context('unhosted', function () {

		const uList = function (inputData = {}) {
			const item = Object.assign({
				ZDAProjectName: Math.random().toString(),
				ZDAProjectURL: Math.random().toString(),
			}, inputData);

			return `<ul class="icons"><li><a href="${ item.ZDAProjectURL }"><img src="${ item._ZDAProjectImageHREF }" /></a><p><a href="${ item.ZDAProjectURL }">${ item.ZDAProjectName }</a></p></li></ul>`;
		};
		
		it('parses list', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();

			deepEqual(mod._DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexUnhosted()], uList({
				ZDAProjectName,
				ZDAProjectURL,
			})), [{
				ZDAProjectName,
				ZDAProjectURL,
			}]);
		});
		
		it('strips whitespace', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();

			deepEqual(mod._DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexUnhosted()], uList({
				ZDAProjectName: ' ' + ZDAProjectName + ' ',
				ZDAProjectURL: ' ' + ZDAProjectURL + ' ',
			})), [{
				ZDAProjectName,
				ZDAProjectURL,
			}]);
		});
	
	});

});

describe('DataProjects', function test_DataProjects() {
	
	const _DataProjects = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_DataListingProjects: (function () {}),
		}, inputData).DataProjects();
	};

	it('returns array', function () {
		const _ValueCache = mod.DataListingURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: Math.random().toString(),
			});
		}, {});
		deepEqual(_DataProjects({
			_ValueCache,
			_DataListingProjects: (function () {
				return [Array.from(arguments)];
			}),
		}), mod.DataListingURLs().map(function (e) {
			return [e, _ValueCache[e]];
		}));
	});

	it('filters if ZDAProjectURL duplicate', function () {
		const item = {
			ZDAProjectURL: Math.random().toString(),
		};

		deepEqual(_DataProjects({
			_DataListingProjects: (function () {
				return [item];
			}),
		}), [item]);
	});

});

describe('DataProjectSchema', function test_DataProjectSchema() {
	
	it('throws if not object', function () {
		throws(function () {
			mod.DataProjectSchema(null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(mod.DataProjectSchema({}), {});
	});

	it('maps ZDAProjectName', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectSchema({
			ZDAProjectName: item,
		}), {
			name: item,
		});
	});

	it('maps ZDAProjectBlurb', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectSchema({
			ZDAProjectBlurb: item,
		}), {
			description: item,
		});
	});

	it('maps ZDAProjectURL', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectSchema({
			ZDAProjectURL: item,
		}), {
			url: item,
		});
	});

});

describe('DataProjectsJSON', function test_DataProjectsJSON() {

	it('returns string', function () {
		const ZDAProjectName = Math.random().toString();
		const item = {
			ZDAProjectName,
		};

		deepEqual(Object.assign(Object.assign({}, mod), {
			DataProjects: (function () {
				return [item];
			}),
		}).DataProjectsJSON(), JSON.stringify([mod.DataProjectSchema(item)]));
	});

});

describe('_SetupMethods', function test__SetupMethods() {

	it('returns array', function () {
		const signature = 'Setup' + Date.now().toString();

		deepEqual(Object.assign(Object.assign({}, mod), {
			[signature]: function () {},
		})._SetupMethods(), Object.keys(mod).filter(function (e) {
			return e.match(/^Setup/);
		}).concat(signature));
	});

});

describe('SetupCache', function test_SetupCache() {

	const _SetupCache = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKCache: Object.assign({
				OLSKCacheReadFile: (function () {}),
			}, inputData),
		});
		return _mod.SetupCache() || _mod;
	};

	it('calls OLSKCacheReadFile', function () {
		const items = [];

		_SetupCache({
			OLSKCacheReadFile: (function () {
				items.push(...arguments);
			}),
		});

		deepEqual(items, [mod.DataCacheNamePrimary(), require('path').join(__dirname, '__cached')]);
	});

	it('sets _ValueCache', function () {
		const OLSKCacheReadFile = Math.random().toString();

		deepEqual(_SetupCache({
			OLSKCacheReadFile: (function () {
				return OLSKCacheReadFile;
			}),
		})._ValueCache, OLSKCacheReadFile);
	});

});

describe('_SetupListing', function test__SetupListing() {

	const __SetupListing = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataContentString: (function () {}),

			_DataFoilOLSKCache: Object.assign({
				OLSKCacheResultFetchRenew: (function () {}),
				OLSKCacheWriteFile: (function () {}),
			}, inputData),
		}, inputData)._SetupListing(inputData.url || Math.random().toString());
	};

	it('calls OLSKCacheResultFetchRenew', function () {
		const url = Math.random().toString();
		const ParamMap = {
			[Math.random().toString()]: Math.random().toString(),
		};

		const item = __SetupListing({
			url,
			_ValueCache: ParamMap,
			OLSKCacheResultFetchRenew: (function () {
				return Array.from(arguments);
			}),
		}).pop();

		deepEqual(item, {
			ParamMap,
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
					return Array.from(arguments);
				}),
			}), [url]);
		});
	
	});

	context('_ParamCallbackDidFinish', function () {

		it('calls _DataContentString', async function () {
			const _ValueCache = {
				[Math.random().toString()]: Math.random().toString(),
			};

			deepEqual(await __SetupListing({
				_ValueCache,
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData._ParamCallbackDidFinish();
				}),
				OLSKCacheWriteFile: (function () {
					return Array.from(arguments);
				}),
			}), [_ValueCache, mod.DataCacheNamePrimary(), require('path').join(__dirname, '__cached')]);
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

describe('SetupDetails', function test_SetupDetails() {

	const _SetupDetails = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			DataProjects: (function () {
				return [];
			}),
			_SetupDetail: (function () {}),
		}, inputData).SetupDetails();
	};

	it('calls _SetupDetail', async function () {
		const ZDAProjectURL = Math.random().toString();
		deepEqual(await _SetupDetails({
			DataProjects: (function () {
				return [{
					ZDAProjectURL,
				}];
			}),
			_SetupDetail: (function () {
				return Array.from(arguments);
			}),
		}), [[ZDAProjectURL]]);
	});

});

describe('LifecycleModuleDidLoad', function test_LifecycleModuleDidLoad() {

	const _LifecycleModuleDidLoad = function (inputData = {}) {
		return Object.assign(mod._SetupMethods().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: function () {
					return item;
				},
			});
		}, Object.assign({}, mod)), inputData).LifecycleModuleDidLoad();
	};

	it('calls _SetupMethods', async function () {
		const signature = 'Setup' + Date.now().toString();

		deepEqual(await _LifecycleModuleDidLoad({
			[signature]: function (arguments) {
				return signature;
			},
		}), mod._SetupMethods().concat(signature));
	});

});
