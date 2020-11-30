const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/stub/ZDAVitrineList',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: (function ZDAVitrineListStubRoute (req, res, next) {
				return res.OLSKLayoutRender(require('path').join(__dirname, 'ui-view'), Object.assign({
					ZDAVitrineListData: [],
				}, Object.fromEntries(Array.from((new URLSearchParams(req.query)).entries()).map(function (e) {
					if (e[0] === 'ZDAVitrineListData') {
						e[1] = JSON.parse(e[1]);
					}

					return e;
				}))));
			}),
			OLSKRouteSignature: 'ZDAVitrineListStubRoute',
			OLSKRouteLanguageCodes: ['en'],
			OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
		}];
	},

};

Object.assign(exports, mod);
