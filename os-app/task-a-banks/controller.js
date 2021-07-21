const cheerio = require('cheerio');
const OLSKCache = require('OLSKCache');
const ZDABank = require('../_shared/ZDABank/main.js');

const mod = {

	OLSKControllerSharedLocals () {
		return {
			ZDAGlanceProjectsCount () {
				return mod.DataBankProjects().length;
			},
			ZDAGlanceProjectsSourceURLs: ZDABank.ZDABankURLs(),
		}
	},

	_ValueCacheObject: {},

	// DATA

	_DataFoilOLSKCache: OLSKCache,
	_DataFoilOLSKQueue: require('OLSKQueue'),
	_DataFoilOLSKDisk: require('OLSKDisk'),
	_DataFoilFS: require('fs'),

	async _DataContentString (inputData) {
		return (await require('node-fetch')(inputData)).text();
	},

	_DataBankObjects (param1, param2) {
		if (!ZDABank.ZDABankURLs().includes(param1)) {
			throw new Error('ZDAErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		return Array.from(ZDABank.ZDABankURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: {
					[ZDABank.ZDABankURLRemoteStorage()]: function () {
						return cheerio('table', param2).first().find('tr:not(tr:first-of-type)').map(function () {
							return {
								ZDAProjectURL: cheerio('td:nth-child(1) a', this).attr('href'),
								ZDAProjectBanks: {
									ZDABankRemoteStorage: {
										ZDABankName: cheerio('td:nth-child(1)', this).text(),
										ZDABankBlurb: cheerio('td:nth-child(2)', this).text(),
										ZDABankProtocol: ZDABank.ZDABankProtocolProperties().ZDABankRemoteStorage,
									},
								},
							};
						});
					},
					[ZDABank.ZDABankURLFission()]: function () {
						return cheerio('.entry-content', param2).first().find('li').map(function () {
							return {
								ZDAProjectURL: cheerio('a', this).attr('href'),
								ZDAProjectBanks: {
									ZDABankFission: {
										ZDABankName: cheerio('a', this).text(),
										ZDABankBlurb: cheerio(this).text().split(': ').pop(),
										ZDABankProtocol: ZDABank.ZDABankProtocolProperties().ZDABankFission,
									},
								},
							};
						});
					},
					[ZDABank.ZDABankURLAwesome()]: function () {
						return cheerio('.entry-content', param2).first().find('li').map(function () {
							return {
								ZDAProjectURL: cheerio('a', this).attr('href'),
								ZDAProjectBanks: {
									ZDABankAwesome: {
										ZDABankName: cheerio('a', this).text(),
										ZDABankBlurb: cheerio(this).text().split(': ').pop(),
									},
								},
							};
						});
					},
					[ZDABank.ZDABankURLUnhosted()]: function () {
						return cheerio('.icons', param2).first().find('li').map(function () {
							return {
								ZDAProjectURL: cheerio('a', this).attr('href'),
								ZDAProjectBanks: {
									ZDABankUnhosted: Object.assign({
										ZDABankName: cheerio('a', this).text(),
									}, (function(inputData) {
										if (!inputData) {
											return {};
										}

										return {
											ZDABankIconURL: require('OLSKLink').OLSKLinkRelativeURL(item, inputData),
										};
									})(cheerio('img', this).attr('src'))),
								},
							};
						});
					},
					[ZDABank.ZDABankURLSolidProject()]: function () {
						return cheerio('article', param2).first().find('table:not(#pod-management~table):not(#historical-solid-apps~ul>li>table) tbody tr').map(function () {
							return {
								ZDAProjectURL: cheerio('td:nth-child(1) a', this).attr('href') || '',
								ZDAProjectBanks: {
									ZDABankSolidProject: {
										ZDABankName: cheerio('td:nth-child(1) a', this).text(),
										ZDABankBlurb: (function(blurb) {
											if (blurb.includes('(c) ')) {
												blurb = blurb.slice(0, blurb.indexOf('(c) '));
											}

											if (blurb.includes('Copyright ')) {
												blurb = blurb.slice(0, blurb.indexOf('Copyright '));
											}

											if (blurb.includes('. Source ')) {
												blurb = blurb.slice(0, blurb.indexOf('. Source '));
											}

											return blurb;
										})(cheerio('td:nth-child(2)', this).text()).trim(),
										ZDABankProtocol: ZDABank.ZDABankProtocolProperties().ZDABankSolidProject,
									},
								},
							};
						});
					},
				}[item],
			});
		}, {})[param1]()).map(function (e) {
			return Object.fromEntries(Object.entries(e).map(function (e) {
				return e.map(function (e) {
					if (typeof e !== 'string') {
						return e;
					}
					
					return e.trim();
				});
			}));
		});
	},

	_DataFilterProject (e) {
		if (e.ZDAProjectBanks && Object.values(e.ZDAProjectBanks).filter(function (e) {
			return [
				'Hello World',
			].includes(e.ZDABankName);
		}).length) {
			return false;
		}

		if ([
			'http://crypton.io/',
			'https://peercdn.com/',
			'http://cryptosphere.org/',
		].includes(e.ZDAProjectURL)) {
			return false;
		}

		return true;
	},

	DataBankProjects () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return ZDABank.ZDABankURLs().reduce(function (coll, item) {
			return coll.concat(_mod._DataBankObjects(item, _mod._ValueCacheObject[item] || ''));
		}, []).reduce(function (coll, item) {
			if (coll.urls.includes(item.ZDAProjectURL)) {
				const e = coll.objects.filter(function (e) {
					return e.ZDAProjectURL === item.ZDAProjectURL;
				}).shift();
				
				Object.assign(e, Object.assign(item, e));

				return coll;
			}

			coll.urls.push(item.ZDAProjectURL);
			coll.objects.push(item);

			return coll;
		}, {
			urls: [],
			objects: [],
		}).objects;
	},

	// SETUP

	SetupFetchQueue () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		_mod._ValueFetchQueue = _mod._DataFoilOLSKQueue.OLSKQueueAPI();
	},

	SetupBanksCache () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		Object.assign(mod, Object.assign(_mod, {
			_ValueCacheObject: ZDABank.ZDABankURLs().reduce(function (coll, item) {
				return Object.assign(coll, {
					[item]: _mod._DataFoilOLSKDisk.OLSKDiskRead(OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(item))),
				});
			}, {}),
		}));
	},

	_SetupBank (inputData) {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		return _mod._DataFoilOLSKCache.OLSKCacheResultFetchRenew({
			ParamMap: _mod._ValueCacheObject,
			ParamKey: inputData,
			ParamCallback: (function () {
				return _mod._DataContentString(inputData);
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: (function () {
				return _mod._DataFoilOLSKDisk.OLSKDiskWrite(OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(inputData)), _mod._ValueCacheObject[inputData]);
			}),
		});
	},

	SetupBanks () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		
		return Promise.all(ZDABank.ZDABankURLs().map(_mod._SetupBank));
	},

};

if (process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_script === 'olsk-express') {
	require('OLSKModule').OLSKModuleLifecycleSetup(mod);
}

Object.assign(exports, mod);
