const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('ZDAGlance_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function() {
			return browser.assert.text('title', uLocalized('ZDAVitrineTitle'));
		});

		it('localizes meta[description]', function() {
			return browser.assert.attribute('meta[name=description]', 'content', uLocalized('ZDAVitrineDescription'));
		});

		it('localizes ZDAGlanceRootLink', function () {
			return browser.assert.attribute(ZDAGlanceRootLink, 'title', uLocalized('OLSKRootLinkTextHome'));
		});

		it('localizes ZDAGlanceFilterInput', function () {
			return browser.assert.attribute(ZDAGlanceFilterInput, 'placeholder', uLocalized('ZDAGlanceFilterInputText'));
		});

	});

});
