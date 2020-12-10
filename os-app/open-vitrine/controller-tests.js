const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

describe('DataCacheNameListings', function test_DataCacheNameListings() {

	it('returns string', function () {
		deepEqual(mod.DataCacheNameListings(), 'cache-alfa-listings');
	});

});

describe('DataCacheNameDetails', function test_DataCacheNameDetails() {

	it('returns string', function () {
		deepEqual(mod.DataCacheNameDetails(), 'cache-bravo-details');
	});

});

describe('DataCacheNameProjects', function test_DataCacheNameProjects() {

	it('returns string', function () {
		deepEqual(mod.DataCacheNameProjects(), 'cache-charlie-projects');
	});

});

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
				ZDAProjectIconURL: mod._DataDetailPropertiesURL(mod.DataListingURLUnhosted(), _ZDAProjectImageHREF),
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

			return `<article><p>${ Math.random().toString() }</p><h2>${ Math.random().toString() }</h2><ul><li><a href="${ item.ZDAProjectURL }">${ item.ZDAProjectName }</a> ${ item.ZDAProjectBlurb } <a href="${ item.ZDAProjectExtra }">${ item.ZDAProjectExtra }</a></li></ul><h1 id="historical-solid-apps">${ Math.random().toString() }</h1><ul><li><a href="${ Math.random().toString() }">${ Math.random().toString() }</a> ${ Math.random().toString() }</li></ul><h1 id="apps-inclusion-and-exclusion-criteria">Apps inclusion and exclusion criteria</h1><ul><li>${ Math.random().toString() }</li></ul></article>`;
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
				ZDAProjectBlurb: [ZDAProjectName, ZDAProjectBlurb, ZDAProjectExtra].join(' '),
				ZDAProjectURL,
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
				ZDAProjectBlurb: [ZDAProjectName, ZDAProjectBlurb, ZDAProjectExtra].join(' '),
				ZDAProjectURL,
			}]);
		});
		
		it('hides Copyright', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataListingObjects(mod.DataListingURLSolidProject(), uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: 'Copyright ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectName, ZDAProjectBlurb].join(' '));
		});
		
		it('hides (c)', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataListingObjects(mod.DataListingURLSolidProject(), uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: '(c) ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectName, ZDAProjectBlurb].join(' '));
		});
		
		it('hides . Source', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataListingObjects(mod.DataListingURLSolidProject(), uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: '. Source ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectName, ZDAProjectBlurb].join(' '));
		});
		
		it('hides combination ', function () {
			const ZDAProjectName = Math.random().toString();
			const ZDAProjectBlurb = Math.random().toString();

			deepEqual(mod._DataListingObjects(mod.DataListingURLSolidProject(), uArticle({
				ZDAProjectName,
				ZDAProjectBlurb,
				ZDAProjectExtra: 'Copyright (c) ' + Math.random().toString(),
			})).shift().ZDAProjectBlurb, [ZDAProjectName, ZDAProjectBlurb].join(' '));
		});
		
	});

});

describe('DataListedProjects', function test_DataListedProjects() {
	
	const _DataListedProjects = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueListingsCache: {},
			_DataListingObjects: (function () {}),
		}, inputData).DataListedProjects();
	};

	it('calls _DataListingObjects', function () {
		const item = [];

		const _ValueListingsCache = mod.DataListingURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: Math.random().toString(),
			});
		}, {});
		
		_DataListedProjects({
			_ValueListingsCache,
			_DataListingObjects: (function () {
				item.push([...arguments]);

				return [];
			}),
		});

		deepEqual(item, mod.DataListingURLs().map(function (e) {
			return [e, _ValueListingsCache[e]];
		}));
	});

	it('returns _DataListingObjects', function () {
		deepEqual(_DataListedProjects({
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

	it('filters if ZDAProjectURL duplicate', function () {
		const item = {
			ZDAProjectURL: Math.random().toString(),
		};

		deepEqual(_DataListedProjects({
			_DataListingObjects: (function () {
				return [item, item];
			}),
		}), [item]);
	});

	it('passses default value if cache empty', function () {
		deepEqual(_DataListedProjects({
			_DataListingObjects: mod._DataListingObjects,
		}), []);
	});

});

describe('_DataDetailPropertiesURL', function test__DataDetailPropertiesURL() {

	it('throws if param1 not string', function () {
		throws(function () {
			mod._DataDetailPropertiesURL(null, Math.random().toString());
		}, /ZDAErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod._DataDetailPropertiesURL(Math.random().toString(), null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns string', function () {
		const url = 'https://example.com';
		const path = Math.random().toString();
		deepEqual(mod._DataDetailPropertiesURL(url, path), url + '/' + path);
	});

	it('returns param2 if complete', function () {
		const path = 'https://alfa.bravo/' + Math.random().toString();
		deepEqual(mod._DataDetailPropertiesURL('https://example.com', path), path);
	});

	it('completes slash', function () {
		const url = 'https://example.com';
		const path = '/' + Math.random().toString();
		deepEqual(mod._DataDetailPropertiesURL(url, path), url + path);
	});

});

describe('_DataDetailProperties', function test__DataDetailProperties() {

	const __DataDetailProperties = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueDetailsCache: {},
		}, inputData)._DataDetailProperties(inputData.url || Math.random().toString());
	};

	it('returns object', function () {
		deepEqual(__DataDetailProperties(), {});
	});

	it('parses apple-touch-icon', function () {
		const url = 'https://example.com';
		const path = uRandomElement('https://alfa.bravo/', Math.random().toString());
		const _ValueDetailsCache = {
			[url]: `<link rel="apple-touch-icon" href="${ path }"><link rel="apple-touch-icon-precomposed" href="${ Math.random().toString() }">`,
		};
		deepEqual(__DataDetailProperties({
			url,
			_ValueDetailsCache,
		}), {
			ZDAProjectIconURL: mod._DataDetailPropertiesURL(url, path),
		});
	});

	it('parses apple-touch-icon-precomposed', function () {
		const url = 'https://example.com';
		const path = uRandomElement('https://alfa.bravo/', Math.random().toString());
		const _ValueDetailsCache = {
			[url]: `<link rel="apple-touch-icon-precomposed" href="${ path }">`,
		};
		deepEqual(__DataDetailProperties({
			url,
			_ValueDetailsCache,
		}), {
			ZDAProjectIconURL: mod._DataDetailPropertiesURL(url, path),
		});
	});

	it('parses meta:description', function () {
		const url = 'https://example.com';
		const _ZDAProjectBlurb = Math.random().toString();
		const _ValueDetailsCache = {
			[url]: `<meta name="description" content="${ _ZDAProjectBlurb }">`,
		};
		deepEqual(__DataDetailProperties({
			url,
			_ValueDetailsCache,
		}), {
			_ZDAProjectBlurb,
		});
	});

	it('parses title', function () {
		const url = 'https://example.com';
		const _ZDAProjectBlurb = Math.random().toString();
		const _ValueDetailsCache = {
			[url]: `<title>${ _ZDAProjectBlurb }</title>`,
		};
		deepEqual(__DataDetailProperties({
			url,
			_ValueDetailsCache,
		}), {
			_ZDAProjectBlurb,
		});
	});

});

describe('DataDetailedProjects', function test_DataDetailedProjects() {
	
	const _DataDetailedProjects = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			DataListedProjects: (function () {}),
			_DataDetailProperties: (function () {
				return {};
			}),
		}, inputData).DataDetailedProjects();
	};

	it('returns DataListedProjects', function () {
		const item = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(_DataDetailedProjects({
			DataListedProjects: (function () {
				return [item];
			}),
		}), [item]);
	});

	it('calls _DataDetailProperties', function () {
		const item = [];

		const project = {
			ZDAProjectURL: Math.random().toString(),
		};

		_DataDetailedProjects({
			DataListedProjects: (function () {
				return [project];
			}),
			_DataDetailProperties: (function () {
				item.push(...arguments);

				return {};
			}),
		});

		deepEqual(item, [project.ZDAProjectURL]);
	});

	context('_DataDetailProperties', function () {
		
		it('assigns values', function () {
			const _DataDetailProperties = {
				[Math.random().toString()]: Math.random().toString(),
			};

			deepEqual(_DataDetailedProjects({
				DataListedProjects: (function () {
					return [{}];
				}),
				_DataDetailProperties: (function () {
					return _DataDetailProperties;
				}),
			}), [_DataDetailProperties]);
		});

		it('assigns underscore if not present', function () {
			const item = Math.random().toString();

			deepEqual(_DataDetailedProjects({
				DataListedProjects: (function () {
					return [{}];
				}),
				_DataDetailProperties: (function () {
					return {
						['_' + item]: item,
					};
				}),
			}), [{
				[item]: item,
			}]);
		});

		it('ignores underscore', function () {
			const item = Math.random().toString();
			
			deepEqual(_DataDetailedProjects({
				DataListedProjects: (function () {
					return [{
						[item]: item,
					}];
				}),
				_DataDetailProperties: (function () {
					return {
						['_' + item]: Math.random().toString(),
					};
				}),
			}), [{
				[item]: item,
			}]);
		});
	
	});

});

describe('DataProjectsSort', function test_DataProjectsSort() {
	
	it('bumps ZDAProjectIconURL', function () {
		const item1 = {
			ZDAProjectURL: Math.random().toString(),
		};
		const item2 = {
			ZDAProjectURL: Math.random().toString(),
			ZDAProjectIconURL: Math.random().toString(),
		};

		deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
	});

	it('bumps ZDAProjectIconURL + ZDAProjectBlurb', function () {
		const item1 = {
			ZDAProjectURL: Math.random().toString(),
			ZDAProjectIconURL: Math.random().toString(),
		};
		const item2 = {
			ZDAProjectURL: Math.random().toString(),
			ZDAProjectBlurb: Math.random().toString(),
			ZDAProjectIconURL: Math.random().toString(),
		};

		deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
	});

});

describe('DataProjects', function test_DataProjects() {
	
	const _DataProjects = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			DataDetailedProjects: (function () {}),
		}, inputData).DataProjects();
	};

	it('returns DataDetailedProjects', function () {
		const item = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(_DataProjects({
			DataDetailedProjects: (function () {
				return [item];
			}),
		}), [item]);
	});

	it('sorts with DataProjectsSort', function () {
		const item1 = {
			ZDAProjectURL: Math.random().toString(),
		};
		const item2 = {
			ZDAProjectURL: Math.random().toString(),
			ZDAProjectIconURL: Math.random().toString(),
		};

		deepEqual(_DataProjects({
			DataDetailedProjects: (function () {
				return [item1, item2];
			}),
		}), [item2, item1]);
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

	it('maps ZDAProjectIconURL', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectSchema({
			ZDAProjectIconURL: item,
		}), {
			image: item,
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
			_ValueProjectsCache: [item],
		}).DataProjectsJSON(), JSON.stringify([mod.DataProjectSchema(item)]));
	});

});

describe('_SetupMethods', function test__SetupMethods() {

	it('returns array', function () {
		const signature = 'Setup' + uRandomInt();

		deepEqual(Object.assign(Object.assign({}, mod), {
			[signature]: function () {},
		})._SetupMethods(), Object.keys(mod).filter(function (e) {
			return e.match(/^Setup/);
		}).concat(signature));
	});

});

describe('SetupListingsCache', function test_SetupListingsCache() {

	const _SetupListingsCache = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKCache: Object.assign({
				OLSKCacheReadFile: (function () {}),
			}, inputData),
		});
		return _mod.SetupListingsCache() || _mod;
	};

	it('calls OLSKCacheReadFile', function () {
		const items = [];

		_SetupListingsCache({
			OLSKCacheReadFile: (function () {
				items.push(...arguments);
			}),
		});

		deepEqual(items, [mod.DataCacheNameListings(), require('path').join(__dirname, '__cached')]);
	});

	it('sets _ValueListingsCache', function () {
		const OLSKCacheReadFile = uRandomElement(Math.random().toString(), null);

		deepEqual(_SetupListingsCache({
			OLSKCacheReadFile: (function () {
				return OLSKCacheReadFile;
			}),
		})._ValueListingsCache, OLSKCacheReadFile || {});
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
		const _ValueListingsCache = {
			[Math.random().toString()]: Math.random().toString(),
		};

		const item = __SetupListing({
			url,
			_ValueListingsCache,
			OLSKCacheResultFetchRenew: (function () {
				return [...arguments];
			}),
		}).pop();

		deepEqual(item, {
			ParamMap: _ValueListingsCache,
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

		it('calls OLSKCacheWriteFile', async function () {
			const _ValueListingsCache = {
				[Math.random().toString()]: Math.random().toString(),
			};

			deepEqual(await __SetupListing({
				_ValueListingsCache,
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData._ParamCallbackDidFinish();
				}),
				OLSKCacheWriteFile: (function () {
					return [...arguments];
				}),
			}), [_ValueListingsCache, mod.DataCacheNameListings(), require('path').join(__dirname, '__cached')]);
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

describe('SetupDetailsCache', function test_SetupDetailsCache() {

	const _SetupDetailsCache = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKCache: Object.assign({
				OLSKCacheReadFile: (function () {}),
			}, inputData),
		});
		return _mod.SetupDetailsCache() || _mod;
	};

	it('calls OLSKCacheReadFile', function () {
		const items = [];

		_SetupDetailsCache({
			OLSKCacheReadFile: (function () {
				items.push(...arguments);
			}),
		});

		deepEqual(items, [mod.DataCacheNameDetails(), require('path').join(__dirname, '__cached')]);
	});

	it('sets _ValueDetailsCache', function () {
		const OLSKCacheReadFile = uRandomElement(Math.random().toString(), null);

		deepEqual(_SetupDetailsCache({
			OLSKCacheReadFile: (function () {
				return OLSKCacheReadFile;
			}),
		})._ValueDetailsCache, OLSKCacheReadFile || {});
	});

});

describe('SetupDetailsQueue', function test_SetupDetailsQueue() {

	const _SetupDetailsQueue = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilQueue: (function () {}),
		}, inputData);
		return _mod.SetupDetailsQueue() || _mod;
	};

	it('calls _DataFoilQueue', function () {
		deepEqual(_SetupDetailsQueue({
			_DataFoilQueue: (function () {
				return [...arguments];
			}),
		})._ValueDetailsQueue, [{
			concurrency: 1,
			autostart: true,
		}]);
	});

	it('sets _ValueDetailsQueue', function () {
		const _DataFoilQueue = Math.random().toString();

		deepEqual(_SetupDetailsQueue({
			_DataFoilQueue: (function () {
				return _DataFoilQueue;
			}),
		})._ValueDetailsQueue, _DataFoilQueue);
	});

});

describe('_SetupDetailContent', function test__SetupDetailContent() {

	const __SetupDetailContent = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueDetailsQueue: {
				push: (function (callback) {
					if (inputData._queue_inspect) {
						inputData._queue_inspect(callback);
					}

					return callback(inputData._queue_callback);
				}),
			},
			_DataContentString: (function () {}),
		}, inputData)._SetupDetailContent(inputData.url || Math.random().toString());
	};

	it('returns promise', async function () {
		deepEqual(__SetupDetailContent() instanceof Promise, true);
	});

	it('calls _ValueDetailsQueue.push', async function () {
		const item = [];

		await __SetupDetailContent({
			_queue_inspect: (function () {
				item.push(...arguments);
			}),
		});

		deepEqual(typeof item.pop(), 'function');
	});

	it('calls _DataContentString via function', async function () {
		const item = [];

		const url = Math.random().toString();

		await __SetupDetailContent({
			url,
			_DataContentString: (function () {
				item.push(...arguments);
			}),
		});

		deepEqual(item, [url]);
	});

	it('calls _queue_callback', async function () {
		const item = [];

		const _queue_callback = Math.random().toString();

		await __SetupDetailContent({
			_queue_callback: (function () {
				item.push(...arguments, _queue_callback);
			}),
		});

		deepEqual(item, [null, undefined, _queue_callback]);
	});

});

describe('_SetupDetail', function test__SetupDetail() {

	const __SetupDetail = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_SetupDetailContent: (function () {}),

			_DataFoilOLSKCache: Object.assign({
				OLSKCacheResultFetchRenew: (function () {}),
				OLSKCacheWriteFile: (function () {}),
			}, inputData),
		}, inputData)._SetupDetail(inputData.url || Math.random().toString());
	};

	it('calls OLSKCacheResultFetchRenew', function () {
		const url = Math.random().toString();
		const _ValueDetailsCache = {
			[Math.random().toString()]: Math.random().toString(),
		};

		const item = __SetupDetail({
			url,
			_ValueDetailsCache,
			OLSKCacheResultFetchRenew: (function () {
				return [...arguments];
			}),
		}).pop();

		deepEqual(item, {
			ParamMap: _ValueDetailsCache,
			ParamKey: url,
			ParamCallback: item.ParamCallback,
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: item._ParamCallbackDidFinish,
		});
	});

	context('ParamCallback', function () {

		it('calls _SetupDetailContent', async function () {
			const url = Math.random().toString();

			deepEqual(await __SetupDetail({
				url,
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData.ParamCallback();
				}),
				_SetupDetailContent: (function () {
					return [...arguments];
				}),
			}), [url]);
		});
	
	});

	context('_ParamCallbackDidFinish', function () {

		it('calls OLSKCacheWriteFile', async function () {
			const _ValueDetailsCache = {
				[Math.random().toString()]: Math.random().toString(),
			};

			deepEqual(await __SetupDetail({
				_ValueDetailsCache,
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData._ParamCallbackDidFinish();
				}),
				OLSKCacheWriteFile: (function () {
					return [...arguments];
				}),
			}), [_ValueDetailsCache, mod.DataCacheNameDetails(), require('path').join(__dirname, '__cached')]);
		});
	
	});

});

describe('SetupDetails', function test_SetupDetails() {

	const _SetupDetails = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			DataListedProjects: (function () {
				return [];
			}),
			_SetupDetail: (function () {}),
		}, inputData).SetupDetails();
	};

	it('calls _SetupDetail', async function () {
		const ZDAProjectURL = Math.random().toString();
		deepEqual(await _SetupDetails({
			DataListedProjects: (function () {
				return [{
					ZDAProjectURL,
				}];
			}),
			_SetupDetail: (function () {
				return [...arguments];
			}),
		}), [[ZDAProjectURL]]);
	});

});

describe('SetupProjectsCache', function test_SetupProjectsCache() {

	const _SetupProjectsCache = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKCache: Object.assign({
				OLSKCacheReadFile: (function () {}),
			}, inputData),
		});
		return _mod.SetupProjectsCache() || _mod;
	};

	it('calls OLSKCacheReadFile', function () {
		const items = [];

		_SetupProjectsCache({
			OLSKCacheReadFile: (function () {
				items.push(...arguments);
			}),
		});

		deepEqual(items, [mod.DataCacheNameProjects(), require('path').join(__dirname, '__cached')]);
	});

	it('sets _ValueProjectsCache', function () {
		const OLSKCacheReadFile = uRandomElement(Math.random().toString(), null);

		deepEqual(_SetupProjectsCache({
			OLSKCacheReadFile: (function () {
				return OLSKCacheReadFile;
			}),
		})._ValueProjectsCache, OLSKCacheReadFile);
	});

});

describe('SetupProjects', function test_SetupProjects() {

	const _SetupProjects = function (inputData) {
		return Object.assign(inputData._mod || {}, Object.assign({}, mod), {
			DataProjects: (function () {}),

			_DataFoilOLSKCache: Object.assign({
				OLSKCacheResultFetchRenew: (function () {}),
				OLSKCacheWriteFile: (function () {}),
			}, inputData),
		}, inputData).SetupProjects();
	};

	it('calls OLSKCacheResultFetchRenew', function () {
		const _mod = {
			[Math.random().toString()]: Math.random().toString(),
		};
		const DataProjects = (function () {});

		const item = _SetupProjects({
			_mod,
			DataProjects,
			OLSKCacheResultFetchRenew: (function () {
				return [...arguments];
			}),
		}).pop();

		deepEqual(item, {
			ParamMap: _mod,
			ParamKey: '_ValueProjectsCache',
			ParamCallback: DataProjects,
			ParamInterval: 1000 * 60,
			_ParamCallbackDidFinish: item._ParamCallbackDidFinish,
		});
	});

	context('_ParamCallbackDidFinish', function () {

		it('calls OLSKCacheWriteFile', async function () {
			const _ValueProjectsCache = {
				[Math.random().toString()]: Math.random().toString(),
			};

			deepEqual(await _SetupProjects({
				_ValueProjectsCache,
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData._ParamCallbackDidFinish();
				}),
				OLSKCacheWriteFile: (function () {
					return [...arguments];
				}),
			}), [_ValueProjectsCache, mod.DataCacheNameProjects(), require('path').join(__dirname, '__cached')]);
		});
	
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
		const signature = 'Setup' + uRandomInt();

		deepEqual(await _LifecycleModuleDidLoad({
			[signature]: function () {
				return signature;
			},
		}), mod._SetupMethods().concat(signature));
	});

});
