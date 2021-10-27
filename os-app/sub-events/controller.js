const mod = {

	OLSKControllerSharedLocals () {
		return {
			ZDAVitrineEventsListDateFormat (inputData) {
				return require('luxon').DateTime.fromJSDate(inputData).toFormat('MMM dd');
			},
		};
	},

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/stub/ZDAVitrineEventsList',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: (function ZDAVitrineEventsListStubRoute (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), Object.assign({
					ZDAVitrineEventsListData: [],
				}, Object.fromEntries(Array.from((new URLSearchParams(req.query)).entries()).map(function (e) {
					if (e[0] === 'ZDAVitrineEventsListData') {
						(e[1] = JSON.parse(e[1])).forEach(function (e) {
							e.ZDAEventStart = new Date(e.ZDAEventStart);
						});
					}

					return e;
				}))));
			}),
			OLSKRouteSignature: 'ZDAVitrineEventsListStubRoute',
			OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
			OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
		}];
	},

};

Object.assign(exports, mod);
