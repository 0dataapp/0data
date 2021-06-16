const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('ZDARobots_Misc', function () {

	it('sends text', async function () {
		browser.assert.deepEqual(await (await browser.fetch('http://loc.tests' + kDefaultRoute.OLSKRoutePath)).text(), require('OLSKRobots').OLSKRobotsTXT([
				require('../open-vitrine/controller.js').OLSKControllerRoutes().shift(),
				require('../open-glance/controller.js').OLSKControllerRoutes().shift(),
				require('../api-projects/controller.js').OLSKControllerRoutes().shift(),
			].reduce(function (coll, item) {
				return coll.concat(OLSKTestingCanonical(item)).concat((item.OLSKRouteLanguageCodes || []).map(function (e) {
					return OLSKTestingCanonical(item, {
						OLSKRoutingLanguage: e,
					});
				}));
			}, []).concat('/application_icon_*')));
	});

});
