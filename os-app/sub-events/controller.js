const mod = {

	OLSKControllerSharedLocals () {
		return {
			ZDAGlanceEventsListDateFormat (inputData) {
				return require('luxon').DateTime.fromJSDate(inputData).toFormat('yyyy.dd')
			},
		}
	},

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/stub/ZDAGlanceEventsList',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: (function ZDAGlanceEventsListStubRoute (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), Object.assign({
					ZDAGlanceEventsListData: [],
				}, Object.fromEntries(Array.from((new URLSearchParams(req.query)).entries()).map(function (e) {
					if (e[0] === 'ZDAGlanceEventsListData') {
						(e[1] = JSON.parse(e[1])).forEach(function (e) {
							e.ZDAEventStart = new Date(e.ZDAEventStart);
						});
					}

					return e;
				}))));
			}),
			OLSKRouteSignature: 'ZDAGlanceEventsListStubRoute',
			OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
			OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
		}];
	},

};

Object.assign(exports, mod);
