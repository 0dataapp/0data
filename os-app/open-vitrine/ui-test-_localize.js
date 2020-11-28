const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`ZDAVitrine_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('ZDAVitrineTitle'));
		});

		it('localizes description', function() {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('ZDAVitrineDescription'));
		});

		it('localizes ZDAVitrineIdentityName', function () {
			browser.assert.text(ZDAVitrineIdentityName, uLocalized('ZDAVitrineTitle'));
		});

	});

});
