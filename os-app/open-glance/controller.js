const cheerio = require('cheerio');
const { JSDOM } = require('JSDOM');

const uSerial2 = function (inputData) {
	return inputData.reduce(async function (coll, e) {
		return (await coll).concat(await new Promise(function (res, rej) {
			try {
				res(e());
			} catch (error) {
				rej(error);
			}
		}));
	}, Promise.resolve([]));
};

const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/glance',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'ZDAGlanceRoute',
			OLSKRouteFunction: (function ZDAGlanceRoute (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), {
					ZDAGlanceListData: res.locals.OLSK_SPEC_UI() ? [] : mod.DataProjects(),
				});
			}),
			OLSKRouteLanguageCodes: ['en'],
		}, {
			OLSKRoutePath: '/projects.json',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'ZDAProjectsJSONRoute',
			OLSKRouteFunction: (function ZDAProjectsJSONRoute (req, res, next) {
				return res.send(mod.DataProjectsJSON());
			}),
		}];
	},

	OLSKControllerUseLivereload () {
		return process.env.NODE_ENV === 'development';
	},

	OLSKControllerSharedLocals () {
		return {
			ZDAGlanceProjectsCount () {
				return mod.DataListingProjects().length;
			},
			ZDAGlanceProjectsSourceURLs: mod.DataListingURLs()
		}
	},

	_ValueListingsCache: {},
	_ValueCandidatesCache: {},

	// DATA

	_DataFoilOLSKCache: require('OLSKCache'),
	_DataFoilOLSKQueue: require('OLSKQueue'),
	_DataFoilOLSKDisk: require('OLSKDisk'),
	_DataFoilFS: require('fs'),

	async _DataContentString (inputData) {
		return (await require('node-fetch')(inputData)).text();
	},

	async _DataContentImage (url, file) {
		const {createWriteStream} = require('fs');
		const {pipeline} = require('stream');
		const {promisify} = require('util');
		const fetch = require('node-fetch');

		const streamPipeline = promisify(pipeline);

		const response = await fetch(url);

		if (!response.ok)
			throw new Error(`unexpected response ${response.statusText}`);

		await streamPipeline(response.body, createWriteStream(file));
	},

	_DataHash (inputData) {
		return require('crypto').createHash('md5').update(inputData).digest('hex');
	},

	DataRelativeURL (url, path) {
		if (typeof url !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		if (typeof path !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		return (new URL(path, url)).href;
	},

	// * CACHE

	DataCacheNameListings() {
		return 'cache-a-listings';
	},

	DataCacheNameDetails() {
		return 'cache-b-details';
	},

	DataCacheFilenameURL (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		const host = (new URL('', inputData)).host.replace('www.', '');

		return host + '.' + mod._DataHash(inputData);
	},

	DataCacheFilenameImage (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		const extension = require('path').extname(inputData).split('?').shift();

		return mod.DataCacheFilenameURL(inputData) + extension;
	},

	DataCachePathListings (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		return require('path').join(__dirname, '__cached', mod.DataCacheNameListings(), inputData);
	},

	DataCachePathDetails (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		return require('path').join(__dirname, '__cached', mod.DataCacheNameDetails(), inputData);
	},

	DataCachePathImages () {
		return require('path').join(__dirname, '__cached', 'ui-assets');
	},

	DataCacheImageLocalPath (inputData) {
		const localURL = require('path').join(mod.DataCachePathImages(), mod.DataCacheFilenameImage(inputData));
		return this._DataFoilFS.existsSync(localURL) ? localURL.replace(require('path').join(__dirname, '../'), '/') : null;
	},

	// * LISTING

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
							};
						});
					},
					[mod.DataListingURLFission()]: function () {
						return cheerio('.entry-content', param2).first().find('li').map(function () {
							return {
								ZDAProjectName: cheerio('a', this).text(),
								ZDAProjectURL: cheerio('a', this).attr('href'),
								ZDAProjectBlurb: cheerio(this).text().split(':').pop(),
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
										ZDAProjectIconURL: mod.DataRelativeURL(item, inputData),
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
							};
						});
					},
				}[item],
			});
		}, {})[param1]()).map(function (e) {
			return Object.fromEntries(Object.entries(e).map(function (e) {
				return e.map(function (e) {
					return e.trim();
				});
			}));
		});
	},

	DataListingProjects () {
		const _this = this;
		return mod.DataListingURLs().reduce(function (coll, item) {
			return coll.concat(_this._DataListingObjects(item, _this._ValueListingsCache[item] || ''));
		}, []).reduce(function (coll, item) {
			if (coll.urls.includes(item.ZDAProjectURL)) {
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

	// * DETAILS

	_DataDetailsDOMPropertyCandidates (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof inputData.ParamHTML !== 'string') {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof inputData.ParamURL !== 'string') {
			throw new Error('ZDRErrorInputNotValid');
		}

		const metadata = require('OLSKDOM').OLSKDOMMetadata(inputData.ParamHTML, {
			JSDOM: JSDOM.fragment,
		});

		return [
			['ZDAProjectIconURL', (function(href) {
				if (!href) {
					return;
				}

				return !href ? null : mod.DataRelativeURL(inputData.ParamURL, href);
			})(metadata['apple-touch-icon'] || metadata['apple-touch-icon-precomposed'])],
			['_ZDAProjectBlurb', metadata.description],
			['_ZDAProjectBlurb', metadata.title],
		].filter(function ([key, value]) {
			return !!value;
		});
	},

	// * PROJECTS

	DataProjectsSort (a, b) {
		const unmatched = [
			'ZDAProjectIconURL',
			'ZDAProjectBlurb',
		].filter(function (e) {
			return a[e] !== b[e];
		});

		if (unmatched.length) {
			return uDescending(unmatched.reduce(function (coll, item) {
				return coll + !!a[item];
			}, 0), unmatched.reduce(function (coll, item) {
				return coll + !!b[item];
			}, 0));
		}

		return 0;
	},

	_DataProjectImageProperty (inputData) {
		const _this = this;

		if (inputData.ZDAProjectIconURL) {
			inputData._ZDAProjectIconURLCachedPath = _this.DataCacheImageLocalPath(inputData.ZDAProjectIconURL);
		}

		return inputData;
	},

	_DataProjectProperties (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		return Object.entries(this._ValueCandidatesCache[inputData.ZDAProjectURL] || {}).reduce(function (coll, [key, value]) {
			if (key.startsWith('_') && coll[key.slice(1)]) {
				return coll;
			}

			if (key.startsWith('_')) {
				key = key.slice(1);
			}

			return Object.assign(coll, {
				[key]: value,
			});
		}, inputData);
	},

	DataProjects () {
		const _this = this;
		return _this.DataListingProjects().map(function (e) {
			return _this._DataProjectProperties(e);
		}).map(function (e) {
			return _this._DataProjectImageProperty(e);
		}).sort(mod.DataProjectsSort);
	},

	// * JSON

	DataProjectJSONSchema (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ZDAErrorInputNotValid');
		}

		return Object.entries({
			ZDAProjectName: 'name',
			ZDAProjectBlurb: 'description',
			ZDAProjectURL: 'url',
			ZDAProjectIconURL: 'image',
		}).reduce(function (coll, item) {
			return !inputData[item[0]] ? coll : Object.assign(coll, {
				[item[1]]: inputData[item[0]],
			});
		}, {});
	},

	DataProjectsJSON () {
		return JSON.stringify(this.DataProjects().map(mod.DataProjectJSONSchema));
	},

	// SETUP

	_SetupMethods () {
		return Object.keys(this).filter(function (e) {
			return e.match(/^Setup/);
		});
	},

	SetupFetchQueue () {
		if (!this._DataFoilOLSKQueue) {
			Object.assign(this, mod); // #hotfix-oldskool-middleware-this
		}
		
		this._ValueFetchQueue = this._DataFoilOLSKQueue.OLSKQueueAPI();
	},

	SetupListingsCache () {
		const _this = this;
		Object.assign(mod, Object.assign(this, {
			_ValueListingsCache: mod.DataListingURLs().reduce(function (coll, item) {
				return Object.assign(coll, {
					[item]: _this._DataFoilOLSKDisk.OLSKDiskRead(mod.DataCachePathListings(mod.DataCacheFilenameURL(item))),
				});
			}, {}),
		}));
	},

	_SetupListing (inputData) {
		const _this = this;
		return _this._DataFoilOLSKCache.OLSKCacheResultFetchRenew({
			ParamMap: _this._ValueListingsCache,
			ParamKey: inputData,
			ParamCallback: (function () {
				return _this._DataContentString(inputData);
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: (function () {
				return _this._DataFoilOLSKDisk.OLSKDiskWrite(mod.DataCachePathListings(mod.DataCacheFilenameURL(inputData)), _this._ValueListingsCache[inputData]);
			}),
		});
	},

	SetupListings () {
		return Promise.all(mod.DataListingURLs().map(this._SetupListing));
	},

	SetupDetailsCache () {
		Object.assign(mod, Object.assign(this, {
			_ValueCandidatesCache: this._DataFoilOLSKCache.OLSKCacheReadFile(mod.DataCacheNameDetails(), require('path').join(__dirname, '__cached')) || {},
		}));
	},

	async _SetupDetailCandidates (inputData) {
		return Object.fromEntries(this._DataDetailsDOMPropertyCandidates({
			ParamHTML: this._DataFoilOLSKDisk.OLSKDiskWrite(mod.DataCachePathDetails(mod.DataCacheFilenameURL(inputData)), await this._DataContentString(inputData)),
			ParamURL: inputData,
		}));
	},

	_SetupDetail (inputData) {
		const _this = this;
		return _this._DataFoilOLSKCache.OLSKCacheResultFetchRenew({
			ParamMap: _this._ValueCandidatesCache,
			ParamKey: inputData,
			ParamCallback: (function () {
				return _this._ValueFetchQueue.OLSKQueueAdd(function () {
					return _this._SetupDetailCandidates(inputData);
				});
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: (function () {
				return _this._DataFoilOLSKCache.OLSKCacheWriteFile(_this._ValueCandidatesCache, mod.DataCacheNameDetails(), require('path').join(__dirname, '__cached'));
			}),
		});
	},

	SetupDetails () {
		const _this = this;
		return this.DataListingProjects().map(function (e) {
			return _this._SetupDetail(e.ZDAProjectURL);
		})
	},

	_SetupImage (inputData) {
		const _this = this;
		return _this._ValueFetchQueue.OLSKQueueAdd(function () {
			return _this._DataContentImage(inputData, require('path').join(mod.DataCachePathImages(), mod.DataCacheFilenameImage(inputData)));
		});
	},

	SetupImages () {
		const _this = this;
		return _this.DataProjects().filter(function (e) {
			return e.ZDAProjectIconURL && !e._ZDAProjectIconURLCachedPath;
		}).map(function (e) {
			return _this._SetupImage(e.ZDAProjectIconURL);
		});
	},

	// LIFECYCLE

	LifecycleModuleDidLoad () {
		const _this = this;
		
		return uSerial2(_this._SetupMethods().map(function (e) {
			return _this[e];
		}));
	},

};

if (process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_script === 'olsk-express') {
	mod.LifecycleModuleDidLoad();
}

Object.assign(exports, mod);
