const cheerio = require('cheerio');

// How to get node.js HTTP request promise without a single dependency https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
const uGet = function (inputData) {
  return new Promise((resolve, reject) => {
    (inputData.startsWith('https') ? require('https') : require('http')).get(inputData, (response) => {
    	if (response.statusCode === 301) {
    		return resolve(uGet(response.headers.location))
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
    }).on('error', reject);
  });
};

const uSerial = function (inputData) {
	return inputData.reduce(async function (coll, e) {
		return e.then(Array.prototype.concat.bind(await coll));
	}, Promise.resolve([]));
};

const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'ZDAVitrineRoute',
			OLSKRouteFunction: (function ZDAVitrineRoute (req, res, next) {
				return res.OLSKLayoutRender(require('path').join(__dirname, 'ui-view'), {
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
	_DataFoilQueue: require('queue'),
	_DataFoilFS: require('fs'),

	DataCacheNameListings() {
		return 'cache-a-listings';
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

	_DataContentString (inputData) {
		return uGet(inputData);
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
										ZDAProjectIconURL: mod._DataDetailPropertiesURL(item, inputData),
									};
								})(cheerio('img', this).attr('src')));
						});
					},
					[mod.DataListingURLSolidProject()]: function () {
						return cheerio('article', param2).first().find('ul:not(#historical-solid-apps~ul) li').map(function () {
							return {
								ZDAProjectName: cheerio('a:nth-child(1)', this).text(),
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
								})(cheerio(this).text()).trim(),
								ZDAProjectURL: cheerio('a:nth-child(1)', this).attr('href'),
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

	DataListedProjects () {
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

	_DataDetailPropertiesURL (url, path) {
		if (typeof url !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		if (typeof path !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		return (new URL(path, url)).href;
	},

	_DataDetailProperties (inputData) {
		return Object.fromEntries([
			['ZDAProjectIconURL', (function(href) {
				if (!href) {
					return;
				}

				return !href ? null : mod._DataDetailPropertiesURL(inputData, href);
			})(cheerio('link[rel="apple-touch-icon"]', this._ValueDetailsCache[inputData] || '').attr('href') || cheerio('link[rel="apple-touch-icon-precomposed"]', this._ValueDetailsCache[inputData] || '').attr('href'))],
			['_ZDAProjectBlurb', cheerio('meta[name="description"]', this._ValueDetailsCache[inputData] || '').attr('content')],
			['_ZDAProjectBlurb', cheerio('title', this._ValueDetailsCache[inputData] || '').text()],
		].filter(function (e) {
			return !!e[1];
		}));
	},

	DataDetailedProjects () {
		const _this = this;
		return _this.DataListedProjects().map(function (e) {
			return Object.assign(e, Object.entries(_this._DataDetailProperties(e.ZDAProjectURL)).reduce(function (coll, item) {
				if (item[0].startsWith('_')) {
					if (e[item[0].slice(1)]) {
						return coll;
					}

					item[0] = item[0].slice(1);
				}

				return Object.assign(coll, {
					[item[0]]: item[1],
				});
			}, {}));
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
			return unmatched.reduce(function (coll, item) {
				return coll + !!b[item];
			}, 0) - unmatched.reduce(function (coll, item) {
				return coll + !!a[item];
			}, 0);
		}

		return 0;
	},

	DataProjects () {
		if (!this.DataDetailedProjects) {
			Object.assign(this, mod); // #hotfix-oldskool-middleware-this
		}

		const _this = this;
		return _this.DataDetailedProjects().sort(mod.DataProjectsSort);
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

	_DataImageFilenameHash (inputData) {
		return require('crypto').createHash('md5').update(inputData).digest('hex');
	},

	_DataImageFilename (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		const extension = require('path').extname(inputData);

		return mod._DataImageFilenameHash(require('path').basename(inputData, extension)) + extension;
	},

	// SETUP

	_SetupMethods () {
		return Object.keys(this).filter(function (e) {
			return e.match(/^Setup/);
		});
	},

	SetupListingsCache () {
		this._ValueListingsCache = this._DataFoilOLSKCache.OLSKCacheReadFile(mod.DataCacheNameListings(), require('path').join(__dirname, '__cached')) || {};
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
				return Promise.resolve(_this._DataContentString(inputData)).catch(function (error) {
					// TODO: Handle fetch error, maybe retry
				});
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: (function () {
				return _this._DataFoilOLSKCache.OLSKCacheWriteFile(_this._ValueListingsCache, mod.DataCacheNameListings(), require('path').join(__dirname, '__cached'));
			}),
		});
	},

	SetupListings () {
		return Promise.all(mod.DataListingURLs().map(this._SetupListing));
	},

	SetupDetailsCache () {
		this._ValueDetailsCache = this._DataFoilOLSKCache.OLSKCacheReadFile(mod.DataCacheNameDetails(), require('path').join(__dirname, '__cached')) || {};
	},

	SetupDetailsQueue () {
		this._ValueDetailsQueue = this._DataFoilQueue({
			concurrency: 1,
			autostart: true,
		});
	},

	_SetupDetailContent (inputData) {
		const _this = this;

		return new Promise(function (res) {
			_this._ValueDetailsQueue.push(async function (_queue_callback) {
				try {
					return _queue_callback(null, res(await _this._DataContentString(inputData)));
				} catch (error) {
					// TODO: Handle fetch error, maybe retry
				}
			});
		});
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
				return Promise.resolve(_this._SetupDetailContent(inputData)).catch(function (error) {
					// TODO: Handle fetch error, maybe retry
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
		return Promise.all(_this.DataListedProjects().map(function (e) {
			return _this._SetupDetail(e.ZDAProjectURL);
		}));
	},

	SetupProjectsCache () {
		this._ValueProjectsCache = this._DataFoilOLSKCache.OLSKCacheReadFile(mod.DataCacheNameProjects(), require('path').join(__dirname, '__cached'));
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

	SetupImagesQueue () {
		this._ValueImagesQueue = this._DataFoilQueue({
			concurrency: 1,
			autostart: true,
		});
	},

	_SetupImageContent (inputData) {
		const _this = this;

		return new Promise(function (res) {
			_this._ValueImagesQueue.push(async function (_queue_callback) {
				try {
					return _queue_callback(null, res(await _this._DataContentString(inputData)));
				} catch (error) {
					// TODO: Handle fetch error, maybe retry
				}
			});
		});
	},

	async _SetupImage (inputData) {
		if (!this._DataFoilOLSKCache) {
			Object.assign(this, mod); // #hotfix-oldskool-middleware-this
		}

		return this._DataFoilFS.writeFileSync(require('path').join(__dirname, '__cached', 'ui-assets', mod._DataImageFilename(inputData)), await this._SetupImageContent(inputData));
	},

	// LIFECYCLE

	LifecycleModuleDidLoad () {
		const _this = this;
		
		return uSerial(_this._SetupMethods().map(function (e) {
			return Promise.resolve(_this[e]());
		}));
	},

};

if (process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_script === 'olsk-express') {
	mod.LifecycleModuleDidLoad();
}

Object.assign(exports, mod);
