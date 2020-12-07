const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

describe('DataCacheNamePrimary', function test_DataCacheNamePrimary() {

	it('returns string', function () {
		deepEqual(mod.DataCacheNamePrimary(), 'cache-alfa-primary');
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

describe('DataListingProjects', function test_DataListingProjects() {

	it('throws if param1 not in DataListingURLs', function () {
		throws(function () {
			mod.DataListingProjects(Math.random().toString(), Math.random().toString());
		}, /ZDAErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod.DataListingProjects(uRandomElement(mod.DataListingURLs()), null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.DataListingProjects(uRandomElement(mod.DataListingURLs()), ''), []);
	});

	context('remotestorage', function () {

		const uTable = function (inputData = {}) {
			const item = Object.assign({
				ZDAProjectName: Math.random().toString(),
				ZDAProjectBlurb: Math.random().toString(),
				ZDAProjectURL: Math.random().toString(),
			}, inputData);

			return `<table><tr><th></th></tr><tr><td><a rel=\"nofollow\" class=\"external text\" href=\"${ item.ZDAProjectURL }\">${ item.ZDAProjectName }</a></td><td>${ item.ZDAProjectBlurb }</td><td>${ Math.random().toString() }</td><td> <a rel=\"nofollow\" class=\"external text\" href=\"${ Math.random().toString() }\">${ Math.random().toString() }</a></td><td></td><td><ul><li>${ Math.random().toString() }</li></ul></td></tr></table><table><tr><td>${ Math.random().toString() }</td></tr></table>`;
		};
		
		it('parses table', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();

			deepEqual(mod.DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexRemoteStorage()], uTable({
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

			deepEqual(mod.DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexRemoteStorage()], uTable({
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

			return `<article><p>${ Math.random().toString() }</p><h2>${ Math.random().toString() }</h2><ul><li><a href=\"${ item.ZDAProjectURL }\">${ item.ZDAProjectName }</a> ${ item.ZDAProjectBlurb } <a href=\"${ item.ZDAProjectExtra }\">${ item.ZDAProjectExtra }</a></li></ul><h1 id=\"historical-solid-apps\">${ Math.random().toString() }</h1><ul><li><a href=\"${ Math.random().toString() }\">${ Math.random().toString() }</a> ${ Math.random().toString() }</li></ul><h1 id=\"apps-inclusion-and-exclusion-criteria\">Apps inclusion and exclusion criteria</h1><ul><li>${ Math.random().toString() }</li></ul></article>`;
		};
		
		it('parses article', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();
			const ZDAProjectExtra = Math.random().toString();
			const ZDAProjectURL = Math.random().toString();

			deepEqual(mod.DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexSolidProject()], uArticle({
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

			deepEqual(mod.DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexSolidProject()], uArticle({
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

			deepEqual(mod.DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexSolidProject()], uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: 'Copyright ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectName, ZDAProjectBlurb].join(' '));
		});
		
		it('hides (c)', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod.DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexSolidProject()], uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: '(c) ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectName, ZDAProjectBlurb].join(' '));
		});
		
		it('hides . Source', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod.DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexSolidProject()], uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: '. Source ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectName, ZDAProjectBlurb].join(' '));
		});
		
		it('hides combination ', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod.DataListingProjects(mod.DataListingURLs()[mod.DataFetchURLIndexSolidProject()], uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: 'Copyright (c) ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectName, ZDAProjectBlurb].join(' '));
		});
		
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
			DataObjects: (function () {
				return [item];
			}),
		}).DataProjectsJSON(), JSON.stringify([mod.DataProjectSchema(item)]));
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
			[Math.random().toString()]: Math.random().toString(),
		};

		_LifecycleModuleDidLoad({
			_ValueCache: ParamMap,
			OLSKCacheResultFetchRenew: (function () {
				item.push(...arguments);
			}),
		});

		deepEqual(item, mod.DataListingURLs().map(function (ParamKey, i) {
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

			deepEqual(item, mod.DataListingURLs());
		});
	
	});

	context('_ParamCallbackDidFinish', function () {

		it('calls _DataContentString', function () {
			const item = [];

			const _ValueCache = {
				[Math.random().toString()]: Math.random().toString(),
			};

			_LifecycleModuleDidLoad({
				_ValueCache,
				OLSKCacheWriteFile: (function () {
					item.push(Array.from(arguments));
				}),
			});

			deepEqual(item, mod.DataListingURLs().map(function () {
				return [_ValueCache, mod.DataCacheNamePrimary(), require('path').join(__dirname, '__cached')];
			}));
		});
	
	});

});
