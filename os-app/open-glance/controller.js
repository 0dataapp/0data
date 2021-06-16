const projects = require('../api-projects/controller.js');

const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/glance',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'ZDAGlanceRoute',
			OLSKRouteFunction: (function ZDAGlanceRoute (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), res.locals.OLSK_SPEC_UI() ? Object.assign({
					ZDAGlanceListData: [{}],
				}, Object.fromEntries(Array.from((new URLSearchParams(req.query)).entries()).map(function (e) {
					if (e[0] === 'ZDAGlanceListData') {
						e[1] = JSON.parse(e[1]);
					}

					return e;
				}))) : {
					ZDAGlanceListData: projects.DataProjects(),
				});
			}),
			OLSKRouteLanguageCodes: ['en'],
		}];
	},

};

Object.assign(exports, mod);
