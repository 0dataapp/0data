const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

const ZDABank = require('../_shared/ZDABank/main.js');
import OLSKCache from 'OLSKCache';

describe('_DataBankObjects', function test__DataBankObjects() {

	it('throws if param1 not in ZDABankURLs', function () {
		throws(function () {
			mod._DataBankObjects(Math.random().toString(), Math.random().toString());
		}, /ZDAErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod._DataBankObjects(uRandomElement(ZDABank.ZDABankURLs()), null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod._DataBankObjects(uRandomElement(ZDABank.ZDABankURLs()), ''), []);
	});

	context('RemoteStorage', function test_RemoteStorage () {

		const uBank = function (inputData = {}) {
			const item = Object.assign({
				ZDAProjectURL: Math.random().toString(),
				ZDABankName: Math.random().toString(),
				ZDABankBlurb: Math.random().toString(),
			}, inputData);

			return `<table><tr><th></th></tr><tr><td><a rel="nofollow" class="external text" href="${ item.ZDAProjectURL }">${ item.ZDABankName }</a></td><td>${ item.ZDABankBlurb }</td><td>${ Math.random().toString() }</td><td> <a rel="nofollow" class="external text" href="${ Math.random().toString() }">${ Math.random().toString() }</a></td><td></td><td><ul><li>${ Math.random().toString() }</li></ul></td></tr></table><table><tr><td>${ Math.random().toString() }</td></tr></table>`;
		};
		
		it('parses data', function () {
			const ZDAProjectURL = Math.random().toString();
			const ZDABankName = Math.random().toString();
			const ZDABankBlurb = Math.random().toString();

			deepEqual(mod._DataBankObjects(ZDABank.ZDABankURLRemoteStorage(), uBank({
				ZDAProjectURL,
				ZDABankName,
				ZDABankBlurb,
			})), [{
				ZDAProjectURL,
				ZDAProjectBanks: {
					ZDABankRemoteStorage: {
						ZDABankName,
						ZDABankBlurb,
						ZDABankProtocol: ZDABank.ZDABankProtocolProperties().ZDABankRemoteStorage,
					},
				},
			}]);
		});
	
	});

	context('Fission', function test_Fission () {

		const uBank = function (inputData = {}) {
			const item = Object.assign({
				ZDAProjectURL: Math.random().toString(),
				ZDABankName: Math.random().toString(),
				ZDABankBlurb: Math.random().toString(),
			}, inputData);

			return `<article class="entry-content"><ul><li><a href="${ item.ZDAProjectURL }">${ item.ZDABankName }</a>: ${ item.ZDABankBlurb }</li></ul></article>`;
		};
		
		it('parses data', function () {
			const ZDAProjectURL = Math.random().toString();
			const ZDABankName = Math.random().toString();
			const ZDABankBlurb = Math.random().toString();

			deepEqual(mod._DataBankObjects(ZDABank.ZDABankURLFission(), uBank({
				ZDAProjectURL,
				ZDABankName,
				ZDABankBlurb,
			})), [{
				ZDAProjectURL,
				ZDAProjectBanks: {
					ZDABankFission: {
						ZDABankName,
						ZDABankBlurb,
						ZDABankProtocol: ZDABank.ZDABankProtocolProperties().ZDABankFission,
					},
				},
			}]);
		});
	
	});

	context('Awesome', function test_Awesome () {

		const uBank = function (inputData = {}) {
			const item = Object.assign({
				ZDAProjectURL: Math.random().toString(),
				ZDABankName: Math.random().toString(),
				ZDABankBlurb: Math.random().toString(),
			}, inputData);

			return `# Apps\n- [${ item.ZDABankName }](${ item.ZDAProjectURL }): ${ item.ZDABankBlurb }`;
		};
		
		it('parses data', function () {
			const ZDAProjectURL = Math.random().toString();
			const ZDABankName = Math.random().toString();
			const ZDABankBlurb = Math.random().toString();

			deepEqual(mod._DataBankObjects(ZDABank.ZDABankURLAwesome(), uBank({
				ZDAProjectURL,
				ZDABankName,
				ZDABankBlurb,
			})), [{
				ZDAProjectURL,
				ZDAProjectBanks: {
					ZDABankAwesome: {
						ZDABankName,
						ZDABankBlurb,
					},
				},
			}]);
		});
	
	});

	context('Unhosted', function test_Unhosted () {

		const uBank = function (inputData = {}) {
			const item = Object.assign({
				ZDAProjectURL: Math.random().toString(),
				ZDABankName: Math.random().toString(),
			}, inputData);

			return `<ul class="icons"><li>${ item._ZDABankImageHREF ? `<a href="${ item.ZDAProjectURL }"><img src="${ item._ZDABankImageHREF }" /></a>` : '' }<p><a href="${ item.ZDAProjectURL }">${ item.ZDABankName }</a></p></li></ul>`;
		};
		
		it('parses data', function () {
			const ZDAProjectURL = Math.random().toString();
			const ZDABankName = Math.random().toString();
			const _ZDABankImageHREF = '/' + Math.random().toString();

			deepEqual(mod._DataBankObjects(ZDABank.ZDABankURLUnhosted(), uBank({
				ZDAProjectURL,
				ZDABankName,
				_ZDABankImageHREF,
			})), [{
				ZDAProjectURL,
				ZDAProjectBanks: {
					ZDABankUnhosted: {
						ZDABankName,
						ZDABankImageURL: require('OLSKLink').OLSKLinkRelativeURL(ZDABank.ZDABankURLUnhosted(), _ZDABankImageHREF),
					},
				},
			}]);
		});
	
	});

	context('SolidProject', function test_SolidProject () {

		const uBank = function (inputData = {}) {
			const item = Object.assign({
				ZDAProjectURL: Math.random().toString(),
				ZDABankName: Math.random().toString(),
				ZDABankBlurb: Math.random().toString(),
				ZDABankExtra: Math.random().toString(),
			}, inputData);

			return `<article><h1>${ Math.random().toString() }</h1><h2>${ Math.random().toString() }</h2><table><tbody><tr><td><a href="${ item.ZDAProjectURL }">${ item.ZDABankName }</a></td><td>${ item.ZDABankBlurb } <a href="${ item.ZDABankExtra }">${ item.ZDABankExtra }</a></td></tr></tbody></table><h2 id="pod-management">${ Math.random().toString() }</h2><table><tbody><tr><td><a href="${ Math.random().toString() }">${ Math.random().toString() }</a></td><td>${ Math.random().toString() } <a href="${ Math.random().toString() }">${ Math.random().toString() }</a></td></tr></tbody></table><h1 id="historical-solid-apps">${ Math.random().toString() }</h1><ul><li><table><tbody><tr><td><a href="${ Math.random().toString() }">${ Math.random().toString() }</a></td><td>${ Math.random().toString() } <a href="${ Math.random().toString() }">${ Math.random().toString() }</a></td></tr></tbody></table></li></ul><h1 id="apps-inclusion-and-exclusion-criteria">Apps inclusion and exclusion criteria</h1><p>${ Math.random().toString() }</p></article>`;
		};
		
		it('parses data', function () {
			const ZDAProjectURL = Math.random().toString();
			const ZDABankName = Math.random().toString();
			const ZDABankBlurb = Math.random().toString();
			const ZDABankExtra = Math.random().toString();

			deepEqual(mod._DataBankObjects(ZDABank.ZDABankURLSolidProject(), uBank({
				ZDAProjectURL,
				ZDABankName,
				ZDABankBlurb,
				ZDABankExtra,
			})), [{
				ZDAProjectURL,
				ZDAProjectBanks: {
					ZDABankSolidProject: {
						ZDABankName,
						ZDABankBlurb: [ZDABankBlurb, ZDABankExtra].join(' '),
						ZDABankProtocol: ZDABank.ZDABankProtocolProperties().ZDABankSolidProject,
					},
				},
			}]);
		});
		
		it('hides Copyright', function () {
			const ZDABankName = Math.random().toString();
			const ZDABankBlurb = Math.random().toString();

			deepEqual(mod._DataBankObjects(ZDABank.ZDABankURLSolidProject(), uBank({
				ZDABankName,
				ZDABankBlurb,
				ZDABankExtra: 'Copyright ' + Math.random().toString(),
			})).shift().ZDAProjectBanks.ZDABankSolidProject.ZDABankBlurb, [ZDABankBlurb].join(' '));
		});
		
		it('hides (c)', function () {
			const ZDABankName = Math.random().toString();
			const ZDABankBlurb = Math.random().toString();

			deepEqual(mod._DataBankObjects(ZDABank.ZDABankURLSolidProject(), uBank({
				ZDABankName,
				ZDABankBlurb,
				ZDABankExtra: '(c) ' + Math.random().toString(),
			})).shift().ZDAProjectBanks.ZDABankSolidProject.ZDABankBlurb, [ZDABankBlurb].join(' '));
		});
		
		it('hides . Source', function () {
			const ZDABankName = Math.random().toString();
			const ZDABankBlurb = Math.random().toString();

			deepEqual(mod._DataBankObjects(ZDABank.ZDABankURLSolidProject(), uBank({
				ZDABankName,
				ZDABankBlurb,
				ZDABankExtra: '. Source ' + Math.random().toString(),
			})).shift().ZDAProjectBanks.ZDABankSolidProject.ZDABankBlurb, [ZDABankBlurb].join(' '));
		});
		
		it('hides combination ', function () {
			const ZDABankName = Math.random().toString();
			const ZDABankBlurb = Math.random().toString();

			deepEqual(mod._DataBankObjects(ZDABank.ZDABankURLSolidProject(), uBank({
				ZDABankName,
				ZDABankBlurb,
				ZDABankExtra: 'Copyright (c) ' + Math.random().toString(),
			})).shift().ZDAProjectBanks.ZDABankSolidProject.ZDABankBlurb, [ZDABankBlurb].join(' '));
		});
		
	});

});

describe('_DataFilterProject', function test__DataFilterProject() {

	it('returns true', function () {
		const item = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(mod._DataFilterProject(item), true);
	});

	context('ZDAProjectURL', function () {
		
		[
			'http://crypton.io/',
			'https://peercdn.com/',
			'http://cryptosphere.org/',
			'https://app.solidbase.info',
		].forEach(function (ZDAProjectURL) {
			
			it(`filters ${ ZDAProjectURL }`, function () {
				deepEqual(mod._DataFilterProject({
					ZDAProjectURL,
				}), false);
			});

		});
	
	});

	context('ZDABankName', function () {
		
		[
			'Hello World',
			'Cesium',
		].forEach(function (ZDABankName) {
			
			it(`filters ${ ZDABankName }`, function () {
				deepEqual(mod._DataFilterProject({
					ZDAProjectBanks: {
						[Math.random().toString()]: {
							ZDABankName,
						},
					},
				}), false);
			});

		});
	
	});

});

describe('_DataHotfixProject', function test__DataHotfixProject() {

	it('returns input', function () {
		const item = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(mod._DataHotfixProject(item), item);
	});

	context('ZDAProjectURL', function () {
		
		Object.entries({}).forEach(function ([key, value]) {
			
			it(`hotfixes ${ key }`, function () {
				deepEqual(mod._DataHotfixProject({
					ZDAProjectURL: key,
				}), {
					ZDAProjectURL: value,
				});
			});

		});
	
	});

});

describe('_DataMergeProjects', function test__DataMergeProjects() {

	const __DataMergeProjects = function (param1, param2) {
		const ZDAProjectURL = Math.random().toString();
		return mod._DataMergeProjects([Object.assign({
			ZDAProjectURL,
		}, param1), Object.assign({
			ZDAProjectURL,
		}, param2)]).map(function (e) {
			delete e.ZDAProjectURL;

			return e
		});
	};

	it('throws if not array', function () {
		throws(function () {
			mod._DataMergeProjects(null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns input', function () {
		const item = {
			ZDAProjectURL: Math.random().toString(),
		};
		deepEqual(mod._DataMergeProjects([item]), [item]);
	});

	it('excludes if no ZDAProjectURL', function () {
		deepEqual(mod._DataMergeProjects([{}]), []);
	});

	it('merges if ZDAProjectURL exact', function () {
		const ZDAProjectURL = Math.random().toString();
		deepEqual(mod._DataMergeProjects([{
			ZDAProjectURL,
		}, {
			ZDAProjectURL,
		}]), [{
			ZDAProjectURL,
		}]);
	});

	it('merges if ZDAProjectURL trailing slash', function () {
		const ZDAProjectURL = Math.random().toString();
		deepEqual(mod._DataMergeProjects([{
			ZDAProjectURL,
		}, {
			ZDAProjectURL: ZDAProjectURL + '/',
		}]), [{
			ZDAProjectURL,
		}]);
	});

	it('copies properties', function () {
		const alfa = Math.random().toString();
		const bravo = Math.random().toString();
		deepEqual(__DataMergeProjects({
			alfa
		}, {
			bravo
		}), [{
			alfa,
			bravo
		}]);
	});

	it('copies ZDAProjectBanks', function () {
		const alfa = Math.random().toString();
		const bravo = Math.random().toString();
		deepEqual(__DataMergeProjects({
			ZDAProjectBanks: {
				alfa,
			},
		}, {
			ZDAProjectBanks: {
				bravo,
			},
		}), [{
			ZDAProjectBanks: {
				alfa,
				bravo,
			},
		}]);
	});

});

describe('_DataFillProjects', function test__DataFillProjects() {

	it('throws if not array', function () {
		throws(function () {
			mod._DataFillProjects(null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns input', function () {
		const item = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(mod._DataFillProjects([item]), [item]);
	});

	context('ZDAProjectName', function () {
		
		it('copies ZDABankName', function () {
			const ZDABankName = Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				ZDAProjectBanks: {
					[Math.random().toString()]: {
						ZDABankName,
					},
				},
			}])[0].ZDAProjectName, ZDABankName);
		});

		it('select first ZDABankName', function () {
			const ZDABankName = Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				ZDAProjectBanks: {
					[Math.random().toString()]: {
						ZDABankName,
					},
					[Math.random().toString()]: {
						ZDABankName: Math.random().toString(),
					},
				},
			}])[0].ZDAProjectName, ZDABankName);
		});
	
	});

	context('ZDAProjectID', function () {
		
		it('copies ZDAProjectName', function () {
			const ZDAProjectID = Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				ZDAProjectName: ZDAProjectID,
			}])[0].ZDAProjectID, ZDAProjectID);
		});

		it('converts to lower case', function () {
			const ZDAProjectID = 'ALFA' + Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				ZDAProjectName: ZDAProjectID,
			}])[0].ZDAProjectID, ZDAProjectID.toLowerCase());
		});

		it('replaces spaces', function () {
			const ZDAProjectID = 'alfa ' + Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				ZDAProjectName: ZDAProjectID,
			}])[0].ZDAProjectID, ZDAProjectID.split(' ').join('-'));
		});


		it('throws if duplicate', function () {
			const ZDAProjectName = Math.random().toString();
			throws(function () {
				mod._DataFillProjects(mod._DataFillProjects([{
					ZDAProjectName,
				}, {
					ZDAProjectName,
				}]));
			}, /ZDAErrorInputNotValid/);
		});
	
	});

	context('ZDAProjectBlurb', function () {
		
		it('copies ZDABankBlurb', function () {
			const ZDABankBlurb = Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				ZDAProjectBanks: {
					[Math.random().toString()]: {
						ZDABankBlurb,
					},
				},
			}])[0].ZDAProjectBlurb, ZDABankBlurb);
		});

		it('select first ZDABankBlurb', function () {
			const ZDABankBlurb = Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				ZDAProjectBanks: {
					[Math.random().toString()]: {
						ZDABankBlurb,
					},
					[Math.random().toString()]: {
						ZDABankBlurb: Math.random().toString(),
					},
				},
			}])[0].ZDAProjectBlurb, ZDABankBlurb);
		});
	
	});

	context('ZDAProjectIconURL', function () {
		
		it('copies ZDABankImageURL', function () {
			const ZDABankImageURL = Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				ZDAProjectBanks: {
					[Math.random().toString()]: {
						ZDABankImageURL,
					},
				},
			}])[0].ZDAProjectIconURL, ZDABankImageURL);
		});

		it('select first ZDABankImageURL', function () {
			const ZDABankImageURL = Math.random().toString();
			deepEqual(mod._DataFillProjects([{
				ZDAProjectBanks: {
					[Math.random().toString()]: {
						ZDABankImageURL,
					},
					[Math.random().toString()]: {
						ZDABankImageURL: Math.random().toString(),
					},
				},
			}])[0].ZDAProjectIconURL, ZDABankImageURL);
		});
	
	});

});

describe('DataBankProjects', function test_DataBankProjects() {
	
	const _DataBankProjects = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueCacheObject: {},
			_DataBankObjects: (function () {
				return [];
			}),
		}, inputData).DataBankProjects();
	};

	it('calls _DataBankObjects', function () {
		const item = [];

		const _ValueCacheObject = ZDABank.ZDABankURLs().reduce(function (coll, item) {
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

		deepEqual(item, ZDABank.ZDABankURLs().map(function (e) {
			return [e, _ValueCacheObject[e]];
		}));
	});

	it('trims properties', function () {
		const item = Math.random().toString();
		deepEqual(_DataBankProjects({
			_DataBankObjects: (function () {
				return [{
					ZDAProjectURL: arguments[0],
					[item]: ' ' + item + ' ',
				}];
			}),
		}), ZDABank.ZDABankURLs().reduce(function (coll, ZDAProjectURL) {
			return coll.concat({
				ZDAProjectURL,
				[item]: item,
			});
		}, []));
	});

	it('passes default value if cache empty', function () {
		deepEqual(_DataBankProjects({
			_DataBankObjects: mod._DataBankObjects,
		}), []);
	});

	it('calls _DataMergeProjects', function () {
		const item = Math.random().toString();
		deepEqual(_DataBankProjects({
			_DataBankObjects: (function () {
				return [{
					ZDAProjectURL: arguments[0],
					item,
				}];
			}),
			_DataMergeProjects: (function () {
				return [...arguments];
			}),
		}), [ZDABank.ZDABankURLs().reduce(function (coll, ZDAProjectURL) {
			return coll.concat({
				ZDAProjectURL,
				item,
			});
		}, [])]);
	});

	it('returns _DataFillProjects', function () {
		const item = {
			[Math.random().toString()]: Math.random().toString(),
		};
		deepEqual(_DataBankProjects({
			_DataMergeProjects: (function () {
				return [item];
			}),
			_DataFillProjects: (function () {
				return [...arguments].concat(item);
			}),
		}), [[item], item]);
	});

});

describe('_DataBankProtocolObjects', function test__DataBankProtocolObjects() {

	const uBank = function (inputData = {}) {
		const item = Object.assign({
			ZDAProtocolURL: Math.random().toString(),
			ZDAProtocolName: Math.random().toString(),
			ZDAProtocolIconURL: Math.random().toString(),
		}, inputData);

		return `# Protocols\n<table><tr><td><a href="${ item.ZDAProtocolURL }"><img src="${ item.ZDAProtocolIconURL }" /></a></td><td>\n${ item.ZDAProtocolName }\n</td></tr></table>\n#`;
	};

	it('throws if not string', function () {
		throws(function () {
			mod._DataBankProtocolObjects(null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod._DataBankProtocolObjects(''), []);
	});

	it('parses data', function () {
		const ZDAProtocolURL = Math.random().toString();
		const ZDAProtocolName = Math.random().toString();
		const ZDAProtocolIconURL = Math.random().toString();

		deepEqual(mod._DataBankProtocolObjects(uBank({
			ZDAProtocolURL,
			ZDAProtocolName,
			ZDAProtocolIconURL,
		})), [{
			ZDAProtocolURL,
			ZDAProtocolName,
			ZDAProtocolIconURL,
		}]);
	});

});

describe('DataBankProtocols', function test_DataBankProtocols() {

	const _DataBankProtocols = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataBankProtocolObjects: (function () {}),
		}, inputData);
		return _mod.DataBankProtocols() || _mod;
	};

	it('calls _DataBankProtocolObjects', function () {
		const item = Math.random().toString();
		deepEqual(uCapture(function (_DataBankProtocolObjects) {
			_DataBankProtocols({
				_ValueCacheObject: {
					[ZDABank.ZDABankURLAwesome()]: item,
				},
				_DataBankProtocolObjects,
			})
		}), [item]);
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

		deepEqual(items, ZDABank.ZDABankURLs().map(OLSKCache.OLSKCacheURLBasename).map(function (e) {
			return OLSKCache.OLSKCachePath(__dirname, e);
		}));
	});

	it('sets _ValueCacheObject', function () {
		const OLSKDiskRead = uRandomElement(Math.random().toString(), null);

		deepEqual(_SetupBanksCache({
			OLSKDiskRead: (function () {
				return OLSKDiskRead;
			}),
		})._ValueCacheObject, ZDABank.ZDABankURLs().reduce(function (coll, item) {
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
		}), ZDABank.ZDABankURLs());
	});

});
