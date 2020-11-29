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
    });
  });
};

const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'ZDAVitrineRoute',
			OLSKRouteFunction (req, res, next) {
				return res.OLSKLayoutRender(require('path').join(__dirname, 'ui-view'), {
					ZDAVitrineListData: [],
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

	DataFetchURLs() {
		return process.env.ZDA_VITRINE_FETCH_URLS.split(',');
	},

	_DataContentString (inputData) {
		return uGet(inputData);
	},

	// LIFECYCLE

	LifecycleModuleDidLoad () {
		const _this = this;
		return mod.DataFetchURLs().map(function (e) {
			return _this._DataFoilOLSKCache.OLSKCacheResultFetchRenew({
				ParamMap: _this._ValueCache,
				ParamKey: e,
				ParamCallback: (function () {
					return _this._DataContentString(e);
				}),
				ParamInterval: 1000 * 60 * 60 * 24,
				_ParamCallbackDidFinish: (function () {
					_this._DataFoilOLSKCache.OLSKCacheWriteFile(_this._ValueCache, require('path').basename(__dirname), require('path').join(__dirname, '__cached'));
				}),
			});
		})
	},

};

mod.LifecycleModuleDidLoad();

Object.assign(exports, mod);
