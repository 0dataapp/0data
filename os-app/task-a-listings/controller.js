const cheerio = require('cheerio');
const OLSKCache = require('OLSKCache');
const OLSKLink = require('OLSKLink');

const mod = {

	OLSKControllerSharedLocals () {
		return {
			ZDAGlanceProjectsCount () {
				return mod.DataListingProjects().length;
			},
			ZDAGlanceProjectsSourceURLs: mod.DataListingURLs(),
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

	DataListingURLs() {
		return process.env.ZDA_VITRINE_LISTING_URLS.split(',');
	},

	DataListingURLRemoteStorage () {
		return mod.DataListingURLs().filter(function (e) {
			return e.match(/remotestorage/);
		}).shift();
	},

	DataListingURLFission () {
		return mod.DataListingURLs().filter(function (e) {
			return e.match(/fission/);
		}).shift();
	},

	DataListingURLAwesome () {
		return mod.DataListingURLs().filter(function (e) {
			return e.match(/awesome/);
		}).shift();
	},

	DataListingURLUnhosted () {
		return mod.DataListingURLs().filter(function (e) {
			return e.match(/unhosted/);
		}).shift();
	},

	DataListingURLSolidProject () {
		return mod.DataListingURLs().filter(function (e) {
			return e.match(/solid/);
		}).shift();
	},

	_DataListingObjects (param1, param2) {
		if (!mod.DataListingURLs().includes(param1)) {
			throw new Error('ZDAErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		return Array.from(mod.DataListingURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: {
					[mod.DataListingURLRemoteStorage()]: function () {
						return cheerio('table', param2).first().find('tr:not(tr:first-of-type)').map(function () {
							return {
								ZDAProjectName: cheerio('td:nth-child(1)', this).text(),
								ZDAProjectBlurb: cheerio('td:nth-child(2)', this).text(),
								ZDAProjectURL: cheerio('td:nth-child(1) a', this).attr('href'),
								_ZDAProjectSupportsRemoteStorage: true,
							};
						});
					},
					[mod.DataListingURLFission()]: function () {
						return cheerio('.entry-content', param2).first().find('li').map(function () {
							return {
								ZDAProjectName: cheerio('a', this).text(),
								ZDAProjectURL: cheerio('a', this).attr('href'),
								ZDAProjectBlurb: cheerio(this).text().split(':').pop(),
								_ZDAProjectSupportsFission: true,
							};
						});
					},
					[mod.DataListingURLAwesome()]: function () {
						return cheerio('.entry-content', param2).first().find('li').map(function () {
							return {
								ZDAProjectName: cheerio('a', this).text(),
								ZDAProjectURL: cheerio('a', this).attr('href'),
								ZDAProjectBlurb: cheerio(this).text().split(':').pop(),
							};
						});
					},
					[mod.DataListingURLUnhosted()]: function () {
						return cheerio('.icons', param2).first().find('li').map(function () {
							return Object.assign({
								ZDAProjectName: cheerio('a', this).text(),
								ZDAProjectURL: cheerio('a', this).attr('href'),
							}, (function(inputData) {
									if (!inputData) {
										return {};
									}

									return {
										ZDAProjectIconURL: OLSKLink.OLSKLinkRelativeURL(item, inputData),
									};
								})(cheerio('img', this).attr('src')));
						});
					},
					[mod.DataListingURLSolidProject()]: function () {
						return cheerio('article', param2).first().find('table:not(#pod-management~table):not(#historical-solid-apps~ul>li>table) tbody tr').map(function () {
							return {
								ZDAProjectName: cheerio('td:nth-child(1) a', this).text(),
								ZDAProjectBlurb: (function(blurb) {
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
								ZDAProjectURL: cheerio('td:nth-child(1) a', this).attr('href') || '',
								_ZDAProjectSupportsSOLID: true,
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

	DataListingProjects () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return mod.DataListingURLs().reduce(function (coll, item) {
			return coll.concat(_mod._DataListingObjects(item, _mod._ValueCacheObject[item] || ''));
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

	SetupListingsCache () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		Object.assign(mod, Object.assign(_mod, {
			_ValueCacheObject: mod.DataListingURLs().reduce(function (coll, item) {
				return Object.assign(coll, {
					[item]: _mod._DataFoilOLSKDisk.OLSKDiskRead(OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(item))),
				});
			}, {}),
		}));
	},

	_SetupListing (inputData) {
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

	SetupListings () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		
		return Promise.all(mod.DataListingURLs().map(_mod._SetupListing));
	},

};

if (process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_script === 'olsk-express') {
	require('OLSKModule').OLSKModuleLifecycleSetup(mod);
}

Object.assign(exports, mod);
