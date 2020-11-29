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

		it('localizes ZDAVitrineAspectsHeading', function () {
			browser.assert.text(ZDAVitrineAspectsHeading, uLocalized('ZDAVitrineAspectsHeadingText'));
		});

		uLocalized('ZDAVitrineAspectsListItemText').forEach(function (e, i) {
			it('localizes ZDAVitrineAspectsListItem', function () {
				browser.assert.OLSKInnerHTML(`.ZDAVitrineAspectsListItem:nth-child(${ i + 1 })`, e);
			});
		});

		it('localizes ZDAVitrineInformationHeading', function () {
			browser.assert.text(ZDAVitrineInformationHeading, uLocalized('ZDAVitrineInformationHeadingText'));
		});

		it('localizes ZDAVitrineProjectsHeading', function () {
			browser.assert.text(ZDAVitrineProjectsHeading, uLocalized('ZDAVitrineProjectsHeadingText'));
		});

	});

});
