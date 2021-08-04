const cheerio = require('cheerio');
const OLSKCache = require('OLSKCache');
const ZDABank = require('../_shared/ZDABank/main.js');

const mod = {

	OLSKControllerSharedLocals () {
		return {
			ZDAGlanceProjectsCount () {
				return mod.DataBankProjects().length;
			},
			ZDAProtocols () {
				return mod.DataBankProtocols();
			},
			ZDATools () {
				return mod.DataBankTools();
			},
		}
	},

	// DATA

	_DataFoilOLSKCache: OLSKCache,
	_DataFoilOLSKQueue: require('OLSKQueue'),
	_DataFoilOLSKDisk: require('OLSKDisk'),
	_DataFoilFS: require('fs'),
	_DataFoilImages: require('../task-c-images/controller.js'),

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
						return param2.split('# Apps').pop().split('#').shift().trim().split('\n-').filter(function (e) {
							return !!e;
						}).map(function (e) {
							return {
								ZDAProjectURL: e.match(/\(.*\)/)[0].slice(1, -1),
								ZDAProjectBanks: {
									ZDABankAwesome: {
										ZDABankName: e.match(/\[.*\]/)[0].slice(1, -1),
										ZDABankBlurb: e.split(': ').pop(),
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
											ZDABankImageURL: require('OLSKLink').OLSKLinkRelativeURL(item, inputData),
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
				'Cesium',
			].includes(e.ZDABankName);
		}).length) {
			return false;
		}

		if ([
			'http://crypton.io/',
			'https://peercdn.com/',
			'http://cryptosphere.org/',
			'https://app.solidbase.info',
		].includes(e.ZDAProjectURL)) {
			return false;
		}

		return true;
	},

	_DataHotfixProject (e) {
		Object.entries({
			ZDAProjectURL: {},
		}).forEach(function ([key, changes]) {
			Object.entries(changes).forEach(function ([source, destination]) {
				if (e[key] === source) {
					e[key] = destination;
				}
			});
		});
		
		return e;
	},

	_DataMergeProjects (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('ZDAErrorInputNotValid');
		}

		return Object.values(inputData.filter(mod._DataFilterProject).reduce(function (coll, item) {
			mod._DataHotfixProject(item);

			let id = require('OLSKLink').OLSKLinkCompareURL(item.ZDAProjectURL || '');

			const match = coll[id || Math.random().toString()] || {};

			if (match.ZDAProjectURL) {
				id = require('OLSKLink').OLSKLinkCompareURL(item.ZDAProjectURL = match.ZDAProjectURL);
			}

			if (!id) {
				return coll;
			}

			const ZDAProjectBanks = Object.assign(match.ZDAProjectBanks || {}, item.ZDAProjectBanks || {});
			
			return Object.assign(coll, {
				[id]: Object.assign(item, Object.assign(match, item), match.ZDAProjectBanks ? {
					ZDAProjectBanks,
				} : {}),
			});
		}, {}));
	},

	_DataFillProjects (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('ZDAErrorInputNotValid');
		}

		const ids = [];
		
		return inputData.map(function (e) {
			return Object.assign(e, Object.entries({
				ZDABankName: 'ZDAProjectName',
				ZDABankBlurb: 'ZDAProjectBlurb',
				ZDABankImageURL: 'ZDAProjectIconURL',
			}).reduce(function (coll, [source, destination]) {
				const raw = Object.values(e.ZDAProjectBanks || {}).map(function (e) {
					return e[source];
				}).filter(function (e) {
					return !!e;
				});
				const data = raw[0];

				if (data) {
					coll[destination] = destination === 'ZDAProjectTags' ? mod.__DataTidyTags((coll[destination] || []).concat(...raw)) : data;
				}
				
				return coll;
			}, {}));
		}).map(function (e) {
			return Object.assign(e, e.ZDAProjectName ? {
				ZDAProjectID: (function(inputData) {
					if (ids.includes(inputData)) {
						throw new Error('ZDAErrorInputNotValid');
					}

					ids.push(inputData);

					return inputData;
				})(e.ZDAProjectName.toLowerCase().split(' ').join('-')),
			} : {});
		});
	},

	DataBankProjects () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod._DataFillProjects(_mod._DataMergeProjects(ZDABank.ZDABankURLs().reduce(function (coll, item) {
			return coll.concat(_mod._DataBankObjects(item, _mod._OLSKCacheResultMap[item] || '').map(require('OLSKObject').OLSKObjectTrim));
		}, [])));
	},

	_DataBankProtocolObjects (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		return Array.from(cheerio('table', inputData.split('# Protocols').pop().split('#').shift().trim()).first().find('tr').map(function () {
			return {
				ZDAProtocolURL: cheerio('a', this).attr('href'),
				ZDAProtocolName: cheerio('td:nth-child(2)', this).text().trim(),
				ZDAProtocolIconURL: cheerio('img', this).attr('src'),
			};
		}));
	},

	DataBankProtocols () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		if (process.env.OLSK_SPEC_MOCHA_INTERFACE) {
			mod.SetupBanks();
		}

		return _mod._DataBankProtocolObjects(_mod._OLSKCacheResultMap[ZDABank.ZDABankURLAwesome()]).map(function (e) {
			return Object.assign(e, {
				_ZDAProtocolIconURLCachedPath: _mod._DataFoilImages.DataCacheLocalPath(e.ZDAProtocolIconURL),
			});
		});
	},

	_DataBankToolObjects (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		return inputData.split('# Tools').pop().split('#').shift().trim().split('\n-').filter(function (e) {
			return !!e;
		}).map(function (e) {
			return {
				ZDAToolURL: e.match(/\(.*\)/)[0].slice(1, -1),
				ZDAToolName: e.match(/\[.*\]/)[0].slice(1, -1),
				ZDAToolBlurb: e.split(': ').pop(),
			};
		});
	},

	DataBankTools () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		if (process.env.OLSK_SPEC_MOCHA_INTERFACE) {
			mod.SetupBanks();
		}

		return _mod._DataBankToolObjects(_mod._OLSKCacheResultMap[ZDABank.ZDABankURLAwesome()]);
	},

	// SETUP

	_SetupBank (inputData) {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod._DataFoilOLSKCache.OLSKCacheQueuedFetch({
			ParamMod: mod,
			ParamKey: inputData,
			ParamCallback: (function () {
				return _mod._DataContentString(inputData);
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			ParamFileURLs: ZDABank.ZDABankURLs(),
			ParamFileDirectory: __dirname,
			OLSKQueue: _mod._DataFoilOLSKQueue,
			OLSKDisk: _mod._DataFoilOLSKDisk,
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
