const cheerio = require('cheerio');
const { JSDOM } = require('JSDOM');

// How to get node.js HTTP request promise without a single dependency https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
const uGet = function (inputData, pipePath) {
	const file = pipePath ? require('fs').createWriteStream(pipePath) : null;
  return new Promise((resolve, reject) => {
    (inputData.startsWith('https') ? require('https') : require('http')).get(inputData, (response) => {
    	if (response.statusCode === 301) {
    		return resolve(uGet(response.headers.location, pipePath))
    	}

      if (response.statusCode < 200 || response.statusCode > 299) {
      	return reject(new Error('Error: ' + response.statusCode));
      }

      const body = [];

      response.on('data', function (chunk) {
      	return body.push(chunk);
      });

      response.on('end', function () {
      	return resolve(body.join(''))
      });

      if (file) {
      	return response.pipe(file);
      }      
    }).on('error', reject);
  });
};

const uSerial = function (inputData) {
	return inputData.reduce(async function (coll, e) {
		return e.then(Array.prototype.concat.bind(await coll));
	}, Promise.resolve([]));
};

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
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'ZDAVitrineRoute',
			OLSKRouteFunction: (function ZDAVitrineRoute (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), {
					ZDAVitrineListData: res.locals.OLSK_SPEC_UI() ? [] : mod._ValueProjectsCache,
					ZDAVitrineProjectsSourceURLs: mod.DataListingURLs(),
				});
			}),
			OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
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

	// DATA

	_DataFoilOLSKCache: require('OLSKCache'),
	_DataFoilOLSKQueue: require('OLSKQueue'),
	_DataFoilOLSKDisk: require('OLSKDisk'),
	_DataFoilFS: require('fs'),
	_DataFoilNodeFetch: require('node-fetch'),

	_DataContentString: uGet,
	_DataContentImage: uGet,

	DataCacheNameListings() {
		return 'cache-a-listings';
	},

	DataCacheNameInfo() {
		return 'cache-b-info';
	},

	DataCacheNameDetails() {
		return 'cache-b-details';
	},

	DataCacheNameProjects() {
		return 'cache-c-projects';
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
										ZDAProjectIconURL: mod._DataDetailPropertyCandidatesURL(item, inputData),
									};
								})(cheerio('img', this).attr('src')));
						});
					},
					[mod.DataListingURLSolidProject()]: function () {
						return cheerio('article', param2).first().find('table:not(#pod-management~table) tbody tr').map(function () {
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

	_DataDetailPropertyCandidatesURL (url, path) {
		if (typeof url !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		if (typeof path !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		return (new URL(path, url)).href;
	},

	_DataInfoDOMPropertyCandidates (inputData) {
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

				return !href ? null : mod._DataDetailPropertyCandidatesURL(inputData.ParamURL, href);
			})(metadata['apple-touch-icon'] || metadata['apple-touch-icon-precomposed'])],
			['_ZDAProjectBlurb', metadata.description],
			['_ZDAProjectBlurb', metadata.title],
		].filter(function ([key, value]) {
			return !!value;
		});
	},

	_DataInfoDOMProperties (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof inputData.ParamProject !== 'object' || inputData.ParamProject === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		return this._DataInfoDOMPropertyCandidates(inputData).reduce(function (coll, [key, value]) {
			if (key.startsWith('_') && inputData.ParamProject[key.slice(1)]) {
				return coll;
			}

			if (key.startsWith('_')) {
				key = key.slice(1);
			}

			return Object.assign(coll, {
				[key]: value,
			});
		}, {});
	},

	_DataDetailPropertyCandidates (inputData) {
		if (!this._ValueDetailsCache ) {
			Object.assign(this, mod); // #hotfix-oldskool-middleware-this
		}

		return Object.fromEntries([
			['ZDAProjectIconURL', (function(href) {
				if (!href) {
					return;
				}

				return !href ? null : mod._DataDetailPropertyCandidatesURL(inputData, href);
			})(cheerio('link[rel="apple-touch-icon"]', this._ValueDetailsCache[inputData] || '').attr('href') || cheerio('link[rel="apple-touch-icon-precomposed"]', this._ValueDetailsCache[inputData] || '').attr('href'))],
			['_ZDAProjectBlurb', cheerio('meta[name="description"]', this._ValueDetailsCache[inputData] || '').attr('content')],
			['_ZDAProjectBlurb', cheerio('title', this._ValueDetailsCache[inputData] || '').text()],
		].filter(function ([key, value]) {
			return !!value;
		}));
	},

	_DataDetailProperties (inputData) {
		return Object.assign(inputData, Object.entries(this._DataDetailPropertyCandidates(inputData.ZDAProjectURL)).reduce(function (coll, [key, value]) {
			if (key.startsWith('_')) {
				if (inputData[key.slice(1)]) {
					return coll;
				}

				key = key.slice(1);
			}

			return Object.assign(coll, {
				[key]: value,
			});
		}, {}));
	},

	DataDetailedProjects () {
		return this.DataListingProjects().map(this._DataDetailProperties);
	},

	_DataImageURL (inputData) {
		const localURL = require('path').join(mod._DataImageCacheDirectoryPath(), mod._DataImageFilename(inputData));
		return this._DataFoilFS.existsSync(localURL) ? localURL.replace(require('path').join(__dirname, '../'), '/') : null;
	},

	DataImagedProjects () {
		const _this = this;
		return _this.DataDetailedProjects().map(function (e) {
			if (e.ZDAProjectIconURL) {
				e._ZDAProjectIconURLCachedPath = _this._DataImageURL(e.ZDAProjectIconURL);
			}

			return e;
		});
	},

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

	DataProjects () {
		if (!this.DataImagedProjects) {
			Object.assign(this, mod); // #hotfix-oldskool-middleware-this
		}

		return this.DataImagedProjects().sort(mod.DataProjectsSort);
	},

	DataProjectSchema (inputData) {
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
		return JSON.stringify(this._ValueProjectsCache.map(mod.DataProjectSchema));
	},

	_DataHash (inputData) {
		return require('crypto').createHash('md5').update(inputData).digest('hex');
	},

	_DataURLCacheFilename (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		const host = (new URL('', inputData)).host.replace('www.', '');

		return host + '.' + mod._DataHash(inputData) + '.html';
	},

	_DataListingURLCachePath (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		return require('path').join(__dirname, '__cached', mod.DataCacheNameListings(), inputData);
	},

	_DataInfoURLCachePath (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		return require('path').join(__dirname, '__cached', mod.DataCacheNameInfo(), inputData);
	},

	_DataImageFilename (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		const extension = require('path').extname(inputData);

		return mod._DataHash(inputData) + extension;
	},

	_DataImageCacheDirectoryPath () {
		return require('path').join(__dirname, '__cached', 'ui-assets');
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
		this._ValueListingsCache = mod.DataListingURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: _this._DataFoilOLSKDisk.OLSKDiskRead(mod._DataListingURLCachePath(mod._DataURLCacheFilename(item))),
			});
		}, {});
	},

	_SetupListing (inputData) {
		if (!this._DataFoilOLSKCache) {
			Object.assign(this, mod); // #hotfix-oldskool-middleware-this
		}

		const _this = this;
		return _this._DataFoilOLSKCache.OLSKCacheResultFetchRenew({
			ParamMap: _this._ValueListingsCache,
			ParamKey: inputData,
			ParamCallback: (function () {
				return _this._DataContentString(inputData);
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: (function () {
				return _this._DataFoilOLSKDisk.OLSKDiskWrite(mod._DataListingURLCachePath(mod._DataURLCacheFilename(inputData)), _this._ValueListingsCache[inputData]);
			}),
		});
	},

	SetupListings () {
		return Promise.all(mod.DataListingURLs().map(this._SetupListing));
	},

	SetupInfoCache () {
		this._ValueInfoCache = this._DataFoilOLSKCache.OLSKCacheReadFile(mod.DataCacheNameInfo(), require('path').join(__dirname, '__cached')) || {};
	},

	async _SetupInfoFetch (inputData) {
		if (!this._DataFoilNodeFetch) {
			Object.assign(this, mod); // #hotfix-oldskool-middleware-this
		}

		return Object.fromEntries(this._DataInfoDOMPropertyCandidates({
			ParamHTML: this._DataFoilOLSKDisk.OLSKDiskWrite(mod._DataInfoURLCachePath(mod._DataURLCacheFilename(inputData)), await (await this._DataFoilNodeFetch(inputData)).text()),
			ParamURL: inputData,
		}));
	},

	_SetupInfo (inputData) {
		if (!this._DataFoilOLSKCache) {
			Object.assign(this, mod); // #hotfix-oldskool-middleware-this
		}

		const _this = this;
		return _this._DataFoilOLSKCache.OLSKCacheResultFetchRenew({
			ParamMap: _this._ValueInfoCache,
			ParamKey: inputData,
			ParamCallback: (function () {
				return _this._ValueFetchQueue.OLSKQueueAdd(function () {
					return _this._SetupInfoFetch(inputData);
				});
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: (function () {
				return _this._DataFoilOLSKCache.OLSKCacheWriteFile(_this._ValueInfoCache, mod.DataCacheNameInfo(), require('path').join(__dirname, '__cached'));
			}),
		});
	},

	SetupInfos () {
		const _this = this;
		return Promise.all(this.DataListingProjects().map(function (e) {
			return _this._SetupInfo(e.ZDAProjectURL);
		}));
	},

	SetupDetailsCache () {
		this._ValueDetailsCache = this._DataFoilOLSKCache.OLSKCacheReadFile(mod.DataCacheNameDetails(), require('path').join(__dirname, '__cached')) || {};
	},

	_SetupDetail (inputData) {
		if (!this._DataFoilOLSKCache) {
			Object.assign(this, mod); // #hotfix-oldskool-middleware-this
		}

		const _this = this;
		return _this._DataFoilOLSKCache.OLSKCacheResultFetchRenew({
			ParamMap: _this._ValueDetailsCache,
			ParamKey: inputData,
			ParamCallback: (function () {
				return _this._ValueFetchQueue.OLSKQueueAdd(function () {
					return _this._DataContentString(inputData);
				});
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: (function () {
				return _this._DataFoilOLSKCache.OLSKCacheWriteFile(_this._ValueDetailsCache, mod.DataCacheNameDetails(), require('path').join(__dirname, '__cached'));
			}),
		});
	},

	SetupDetails () {
		const _this = this;
		return Promise.all(_this.DataListingProjects().map(function (e) {
			return _this._SetupDetail(e.ZDAProjectURL);
		}));
	},

	SetupProjectsCache () {
		this._ValueProjectsCache = this._DataFoilOLSKCache.OLSKCacheReadFile(mod.DataCacheNameProjects(), require('path').join(__dirname, '__cached')) || [];
	},

	SetupProjects () {
		const _this = this;
		return _this._DataFoilOLSKCache.OLSKCacheResultFetchRenew({
			ParamMap: _this,
			ParamKey: '_ValueProjectsCache',
			ParamCallback: _this.DataProjects,
			ParamInterval: 1000 * 60,
			_ParamCallbackDidFinish: (function () {
				return _this._DataFoilOLSKCache.OLSKCacheWriteFile(_this._ValueProjectsCache, mod.DataCacheNameProjects(), require('path').join(__dirname, '__cached'));
			}),
		});
	},

	_SetupImage (inputData) {
		if (!this._ValueFetchQueue) {
			Object.assign(this, mod); // #hotfix-oldskool-middleware-this
		}

		const _this = this;
		return _this._ValueFetchQueue.OLSKQueueAdd(function () {
			return _this._DataContentImage(inputData, require('path').join(mod._DataImageCacheDirectoryPath(), mod._DataImageFilename(inputData)));
		});
	},

	SetupImages () {
		const _this = this;
		return _this._ValueProjectsCache.filter(function (e) {
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
