const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`ZDAVitrineList_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});

		it('localizes ZDAVitrineListEmpty', function () {
			browser.assert.text(ZDAVitrineListEmpty, uLocalized('ZDAVitrineListEmptyText'));
		});

		context('ZDAVitrineListData', function () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage: languageCode,
					ZDAVitrineListData: JSON.stringify([{}]),
				});
			});

			it('localizes ZDAVitrineListTableHeadingName', function () {
				browser.assert.text(ZDAVitrineListTableHeadingName, uLocalized('ZDAVitrineListTableHeadingNameText'));
			});

			it('localizes ZDAVitrineListTableHeadingBlurb', function () {
				browser.assert.text(ZDAVitrineListTableHeadingBlurb, uLocalized('ZDAVitrineListTableHeadingBlurbText'));
			});

		});

	});

});
