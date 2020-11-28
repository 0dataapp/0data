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

	// DATA

	DataFetchURLs() {
		return process.env.ZDA_VITRINE_FETCH_URLS.split(',');
	},

};

Object.assign(exports, mod);
