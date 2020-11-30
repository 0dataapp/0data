exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/robots.txt',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'ZDARobotsRoute',
		OLSKRouteFunction (req, res, next) {
			return res.send(require('OLSKRobots').OLSKRobotsTXT([
				'ZDAVitrineRoute',
			].reduce(function (coll, item) {
				return coll.concat(res.locals.OLSKCanonicalFor(item)).concat((res.locals.OLSKRouteObjectFor(item).OLSKRouteLanguageCodes || []).map(function (e) {
					return res.locals.OLSKCanonicalLocalizedFor(item, {
						OLSKRoutingLanguage: e,
					});
				}));
			}, [])));
		},
	}];
};
