const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/stub/ZDAGlanceList',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: (function ZDAGlanceListStubRoute (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), Object.assign({
					ZDAGlanceListData: [],
				}, Object.fromEntries(Array.from((new URLSearchParams(req.query)).entries()).map(function (e) {
					if (e[0] === 'ZDAGlanceListData') {
						e[1] = JSON.parse(e[1]);
					}

					return e;
				}))));
			}),
			OLSKRouteSignature: 'ZDAGlanceListStubRoute',
			OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
			OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
		}];
	},

};

Object.assign(exports, mod);
