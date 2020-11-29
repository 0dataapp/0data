// How to get node.js HTTP request promise without a single dependency https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
const uGet = function (inputData) {
  return new Promise((resolve, reject) => {
    (inputData.startsWith('https') ? require('https') : require('http')).get(inputData, (response) => {
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

const cheerio = require('cheerio');

const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'ZDAVitrineRoute',
			OLSKRouteFunction (req, res, next) {
				return res.OLSKLayoutRender(require('path').join(__dirname, 'ui-view'), {
					ZDAVitrineListData: mod.DataObjects(),
				});
			},
			OLSKRouteLanguages: ['en'],
		}];
	},

	OLSKControllerUseLivereload () {
		return process.env.NODE_ENV === 'development';
	},

	// VALUE

	_ValueCache: require('OLSKCache').OLSKCacheReadFile(require('path').basename(__dirname), require('path').join(__dirname, '__cached')) || {},

	// DATA

	_DataFoilOLSKCache: require('OLSKCache'),

	DataListingURLs() {
		return process.env.ZDA_VITRINE_LISTING_URLS.split(',');
	},

	DataFetchURLIndexRemoteStorage() {
		return 0;
	},

	DataFetchURLIndexSolidProject() {
		return 1;
	},

	_DataContentString (inputData) {
		return uGet(inputData);
	},

	DataListingProjects (param1, param2) {
		if (!mod.DataListingURLs().includes(param1)) {
			throw new Error('ZDAErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		return Array.from(mod.DataListingURLs().reduce(function (coll, item, i) {
			return Object.assign(coll, {
				[item]: {
					[mod.DataFetchURLIndexRemoteStorage()]: (function () { // remotestorage
						return cheerio('table', param2).first().find('tr').map(function (e) {
							return {
								ZDAProjectName: cheerio('td:nth-child(1)', this).text(),
								ZDAProjectBlurb: cheerio('td:nth-child(2)', this).text(),
								ZDAProjectURL: cheerio('td:nth-child(1) a', this).attr('href'),
							};
						});
					}),
					[mod.DataFetchURLIndexSolidProject()]: (function () { // solidproject
						return cheerio('article', param2).first().find('ul:not(#historical-solid-apps~ul) li').map(function (e) {
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
					}),
				}[i],
			});
		}, {})[param1]());
	},

	DataObjects () {
		return mod.DataListingURLs().reduce(function (coll, item) {
			return coll.concat(mod.DataListingProjects(item, mod._ValueCache[item]));
		}, []);
	},

	DataProjectSchema (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ZDAErrorInputNotValid');
		}

		return Object.entries({
			ZDAProjectName: 'name',
			ZDAProjectBlurb: 'description',
			ZDAProjectURL: 'url',
		}).reduce(function (coll, item) {
			return !inputData[item[0]] ? coll : Object.assign(coll, {
				[item[1]]: inputData[item[0]],
			});
		}, {});
	},

	DataJSONResponse () {
		return JSON.stringify(this.DataObjects().map(mod.DataProjectSchema));
	},

	// LIFECYCLE

	LifecycleModuleDidLoad () {
		const _this = this;
		return mod.DataListingURLs().map(function (e) {
			return _this._DataFoilOLSKCache.OLSKCacheResultFetchRenew({
				ParamMap: _this._ValueCache,
				ParamKey: e,
				ParamCallback: (function () {
					return Promise.resolve(_this._DataContentString(e)).catch(function (error) {
						// TODO: Handle fetch error, maybe retry
					});
				}),
				ParamInterval: 1000 * 60 * 60 * 24,
				_ParamCallbackDidFinish: (function () {
					_this._DataFoilOLSKCache.OLSKCacheWriteFile(_this._ValueCache, require('path').basename(__dirname), require('path').join(__dirname, '__cached'));
				}),
			});
		})
	},

};

if (process.env.npm_lifecycle_script === 'olsk-express') {
	mod.LifecycleModuleDidLoad();
}

Object.assign(exports, mod);
