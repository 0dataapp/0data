const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('ZDAGlanceList_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes ZDAGlanceListEmpty', function () {
			browser.assert.text(ZDAGlanceListEmpty, uLocalized('ZDAGlanceListEmptyText'));
		});

		context('ZDAGlanceListData', function () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					ZDAGlanceListData: JSON.stringify(Array.from(Array(uRandomInt())).map(function (e) {
						return {};
					})),
					OLSKRoutingLanguage,
				});
			});

			it('localizes ZDAGlanceListHeadName', function () {
				browser.assert.text(ZDAGlanceListHeadName, uLocalized('ZDAGlanceListHeadNameText'));
			});

		});

	});

});
