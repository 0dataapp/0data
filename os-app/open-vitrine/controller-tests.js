const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

describe('DataCacheNameListings', function test_DataCacheNameListings() {

	it('returns string', function () {
		deepEqual(mod.DataCacheNameListings(), 'cache-a-listings');
	});

});

describe('DataCacheNameDetails', function test_DataCacheNameDetails() {

	it('returns string', function () {
		deepEqual(mod.DataCacheNameDetails(), 'cache-b-details');
	});

});

describe('DataCacheNameProjects', function test_DataCacheNameProjects() {

	it('returns string', function () {
		deepEqual(mod.DataCacheNameProjects(), 'cache-c-projects');
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
				ZDAProjectBlurb
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
				ZDAProjectIconURL: mod._DataDetailPropertyCandidatesURL(mod.DataListingURLUnhosted(), _ZDAProjectImageHREF),
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

			return `<article><h1>${ Math.random().toString() }</h1><h2>${ Math.random().toString() }</h2><table><tbody><tr><td><a href="${ item.ZDAProjectURL }">${ item.ZDAProjectName }</a></td><td>${ item.ZDAProjectBlurb } <a href="${ item.ZDAProjectExtra }">${ item.ZDAProjectExtra }</a></td></tr></tbody></table><h2 id="pod-management">${ Math.random().toString() }</h2><table><tbody><tr><td><a href="${ Math.random().toString() }">${ Math.random().toString() }</a></td><td>${ Math.random().toString() } <a href="${ Math.random().toString() }">${ Math.random().toString() }</a></td></tr></tbody></table><h1 id="historical-solid-apps">${ Math.random().toString() }</h1><<ul><li><a href="${ Math.random().toString() }">${ Math.random().toString() }</a> ${ Math.random().toString() }</li></ul><h1 id="apps-inclusion-and-exclusion-criteria">Apps inclusion and exclusion criteria</h1><p>${ Math.random().toString() }</p></article>`;
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

	it('passes default value if cache empty', function () {
		deepEqual(_DataListedProjects({
			_DataListingObjects: mod._DataListingObjects,
		}), []);
	});

});

describe('_DataDetailPropertyCandidatesURL', function test__DataDetailPropertyCandidatesURL() {

	it('throws if param1 not string', function () {
		throws(function () {
			mod._DataDetailPropertyCandidatesURL(null, Math.random().toString());
		}, /ZDAErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod._DataDetailPropertyCandidatesURL(Math.random().toString(), null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns string', function () {
		const url = 'https://example.com';
		const path = Math.random().toString();
		deepEqual(mod._DataDetailPropertyCandidatesURL(url, path), url + '/' + path);
	});

	it('returns param2 if complete', function () {
		const path = 'https://alfa.bravo/' + Math.random().toString();
		deepEqual(mod._DataDetailPropertyCandidatesURL('https://example.com', path), path);
	});

	it('completes slash', function () {
		const url = 'https://example.com';
		const path = '/' + Math.random().toString();
		deepEqual(mod._DataDetailPropertyCandidatesURL(url, path), url + path);
	});

});

describe('_DataDetailPropertyCandidates', function test__DataDetailPropertyCandidates() {

	const __DataDetailPropertyCandidates = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueDetailsCache: {},
		}, inputData)._DataDetailPropertyCandidates(inputData.url || Math.random().toString());
	};

	it('returns object', function () {
		deepEqual(__DataDetailPropertyCandidates(), {});
	});

	it('parses apple-touch-icon', function () {
		const url = 'https://example.com';
		const path = uRandomElement('https://alfa.bravo/', Math.random().toString());
		const _ValueDetailsCache = {
			[url]: `<link rel="apple-touch-icon" href="${ path }"><link rel="apple-touch-icon-precomposed" href="${ Math.random().toString() }">`,
		};
		deepEqual(__DataDetailPropertyCandidates({
			url,
			_ValueDetailsCache,
		}), {
			ZDAProjectIconURL: mod._DataDetailPropertyCandidatesURL(url, path),
		});
	});

	it('parses apple-touch-icon-precomposed', function () {
		const url = 'https://example.com';
		const path = uRandomElement('https://alfa.bravo/', Math.random().toString());
		const _ValueDetailsCache = {
			[url]: `<link rel="apple-touch-icon-precomposed" href="${ path }">`,
		};
		deepEqual(__DataDetailPropertyCandidates({
			url,
			_ValueDetailsCache,
		}), {
			ZDAProjectIconURL: mod._DataDetailPropertyCandidatesURL(url, path),
		});
	});

	it('parses meta:description', function () {
		const url = 'https://example.com';
		const _ZDAProjectBlurb = Math.random().toString();
		const _ValueDetailsCache = {
			[url]: `<meta name="description" content="${ _ZDAProjectBlurb }">`,
		};
		deepEqual(__DataDetailPropertyCandidates({
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
		deepEqual(__DataDetailPropertyCandidates({
			url,
			_ValueDetailsCache,
		}), {
			_ZDAProjectBlurb,
		});
	});

});

describe('_DataDetailProperties', function test__DataDetailProperties() {
	
	const __DataDetailProperties = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_DataDetailPropertyCandidates: (function () {
				return {};
			}),
		}, inputData)._DataDetailProperties(inputData.object || {});
	};

	it('returns inputData', function () {
		const object = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(__DataDetailProperties({
			object,
		}), object);
	});

	it('calls _DataDetailPropertyCandidates', function () {
		const item = [];

		const object = {
			ZDAProjectURL: Math.random().toString(),
		};

		__DataDetailProperties({
			object,
			_DataDetailPropertyCandidates: (function () {
				item.push(...arguments);

				return {};
			}),
		});

		deepEqual(item, [object.ZDAProjectURL]);
	});

	context('_DataDetailPropertyCandidates', function () {
		
		it('assigns values', function () {
			const _DataDetailPropertyCandidates = {
				[Math.random().toString()]: Math.random().toString(),
			};

			deepEqual(__DataDetailProperties({
				_DataDetailPropertyCandidates: (function () {
					return _DataDetailPropertyCandidates;
				}),
			}), _DataDetailPropertyCandidates);
		});

		it('assigns underscore if not present', function () {
			const item = Math.random().toString();

			deepEqual(__DataDetailProperties({
				_DataDetailPropertyCandidates: (function () {
					return {
						['_' + item]: item,
					};
				}),
			}), {
				[item]: item,
			});
		});

		it('ignores underscore', function () {
			const item = Math.random().toString();
			
			deepEqual(__DataDetailProperties({
				object: {
					[item]: item,
				},
				_DataDetailPropertyCandidates: (function () {
					return {
						['_' + item]: Math.random().toString(),
					};
				}),
			}), {
				[item]: item,
			});
		});
	
	});

});

describe('DataDetailedProjects', function test_DataDetailedProjects() {
	
	const _DataDetailedProjects = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			DataListedProjects: (function () {}),
			_DataDetailProperties: (function () {
				return [...arguments].shift();
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

	it('maps _DataDetailProperties', function () {
		const project = {
			ZDAProjectURL: Math.random().toString(),
		};

		deepEqual(_DataDetailedProjects({
			DataListedProjects: (function () {
				return [project];
			}),
			_DataDetailProperties: (function () {
				return [...arguments].shift();
			}),
		}), [project]);
	});

});

describe('_DataImageURL', function test__DataImageURL() {

	const __DataImageURL = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilFS: Object.assign({
				existsSync: (function () {}),
			}, inputData),
		}, inputData)._DataImageURL(inputData.url || Math.random().toString());
	};

	it('calls existsSync', function () {
		const item = [];

		const url = Math.random().toString();

		__DataImageURL({
			url,
			existsSync: (function () {
				item.push(...arguments);
			}),
		});

		deepEqual(item, [require('path').join(mod._DataImageCacheDirectoryPath(), mod._DataImageFilename(url))]);
	});

	it('returns local URL if existsSync', function () {
		const url = Math.random().toString();

		deepEqual(__DataImageURL({
			url,
			existsSync: (function () {
				return true;
			}),
		}), require('path').join(mod._DataImageCacheDirectoryPath(), mod._DataImageFilename(url)).replace(require('path').join(__dirname, '../'), '/'));
	});

	it('returns null', function () {
		deepEqual(__DataImageURL({
			existsSync: (function () {
				return false;
			}),
		}), null);
	});

});

describe('DataImagedProjects', function test_DataImagedProjects() {
	
	const _DataImagedProjects = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			DataDetailedProjects: (function () {}),
		}, inputData).DataImagedProjects();
	};

	it('returns DataDetailedProjects', function () {
		const item = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(_DataImagedProjects({
			DataDetailedProjects: (function () {
				return [item];
			}),
		}), [item]);
	});

	it('maps _DataImageURL to _ZDAProjectIconURLCachedPath', function () {
		const ZDAProjectIconURL = Math.random().toString();
		const _DataImageURL = Math.random().toString();

		deepEqual(_DataImagedProjects({
			DataDetailedProjects: (function () {
				return [{
					ZDAProjectIconURL,
				}];
			}),
			_DataImageURL: (function () {
				return _DataImageURL;
			}),
		}), [{
			ZDAProjectIconURL,
			_ZDAProjectIconURLCachedPath: _DataImageURL,
		}]);
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
			DataImagedProjects: (function () {}),
		}, inputData).DataProjects();
	};

	it('returns DataImagedProjects', function () {
		const item = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(_DataProjects({
			DataImagedProjects: (function () {
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
			DataImagedProjects: (function () {
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

describe('_DataURLCacheFilename', function test__DataURLCacheFilename() {

	it('throws if not string', function () {
		throws(function () {
			mod._DataURLCacheFilename(null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns string', function () {
		const host = uRandomElement('www.example.com', 'www.alfa.bravo');
		const filename = Date.now().toString();
		const item = 'https://' + host + '/' + filename;

		deepEqual(mod._DataURLCacheFilename(item), host.replace('www.', '') + '.' + mod._DataHash(item));
	});

});

describe('_DataImageFilename', function test__DataImageFilename() {

	it('throws if not string', function () {
		throws(function () {
			mod._DataImageFilename(null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns string', function () {
		const extension = '.' + uRandomElement('png', 'jpg', 'gif');
		const filename = Date.now().toString();
		const item = 'https://example.com/' + filename + extension;

		deepEqual(mod._DataImageFilename(item), mod._DataHash(item) + extension);
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

describe('_SetupDetail', function test__SetupDetail() {

	const __SetupDetail = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_ValueFetchQueue: Object.assign({}, inputData),
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

		it('calls OLSKQueueAdd', async function () {
			const url = Math.random().toString();

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

		it('calls _DataContentString', async function () {
			const url = Math.random().toString();

			deepEqual(await __SetupDetail({
				url,
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData.ParamCallback();
				}),
				OLSKQueueAdd: (function (inputData) {
					return inputData();
				}),
				_DataContentString: (function () {
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
		})._ValueProjectsCache, OLSKCacheReadFile || []);
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

describe('SetupImages', function test_SetupImages() {

	const _SetupImages = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueFetchQueue: Object.assign({}, inputData),
			_ValueProjectsCache: [],
			_DataContentImage: (function () {}),
		}, inputData).SetupImages();
	};

	it('calls OLSKQueueAdd', async function () {
		const ZDAProjectIconURL = Math.random().toString();

		deepEqual(await _SetupImages({
			_ValueProjectsCache: [{
				ZDAProjectIconURL,
			}],
			OLSKQueueAdd: (function () {
				return [...arguments].map(function (e) {
					return typeof e;
				});
			}),
		}), [['function']]);
	});

	it('calls _DataContentImage', async function () {
		const ZDAProjectIconURL = Math.random().toString();

		deepEqual(await _SetupImages({
			_ValueProjectsCache: [{
				ZDAProjectIconURL,
			}],
			OLSKQueueAdd: (function (inputData) {
				return inputData();
			}),
			_DataContentImage: (function () {
				return [...arguments];
			}),
		}), [[ZDAProjectIconURL, require('path').join(mod._DataImageCacheDirectoryPath(), mod._DataImageFilename(ZDAProjectIconURL))]]);
	});

	it('ignores if no ZDAProjectIconURL', async function () {
		deepEqual(await _SetupImages({
			_ValueProjectsCache: [{}],
		}), []);
	});

	it('ignores if already local', async function () {
		const ZDAProjectIconURL = Math.random().toString();
		deepEqual(await _SetupImages({
			_ValueProjectsCache: [{
				ZDAProjectIconURL: Math.random().toString(),
				_ZDAProjectIconURLCachedPath: Math.random().toString(),
			}],
			_DataContentImage: (function () {
				return [...arguments];
			}),
		}), []);
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
