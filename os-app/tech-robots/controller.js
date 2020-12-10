exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/robots.txt',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'ZDARobotsRoute',
		OLSKRouteFunction (req, res, next) {
			return res.send(require('OLSKRobots').OLSKRobotsTXT([
				'ZDAVitrineRoute',
				'ZDAProjectsJSONRoute',
			].reduce(function (coll, item) {
				return coll.concat(res.locals.OLSKCanonical(item)).concat((res.locals.OLSKRouteObjectFor(item).OLSKRouteLanguageCodes || []).map(function (e) {
					return res.locals.OLSKCanonicalLocalized(item, {
						OLSKRoutingLanguage: e,
					});
				}));
			}, []).concat('/application_icon_*')));
		},
	}];
};
