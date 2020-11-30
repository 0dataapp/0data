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

		it('localizes ZDAVitrineIdentityBlurb', function () {
			browser.assert.text(ZDAVitrineIdentityBlurb, uLocalized('ZDAVitrineDescription'));
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

		it('localizes ZDAVitrineAutonomousDataLink', function () {
			browser.assert.text(ZDAVitrineAutonomousDataLink, uLocalized('ZDAVitrineAutonomousDataLinkText'));
		});

		it('localizes ZDAVitrineRemoteStorageLink', function () {
			browser.assert.text(ZDAVitrineRemoteStorageLink, uLocalized('ZDAVitrineRemoteStorageLinkText'));
		});

		it('localizes ZDAVitrineSolidProjectLink', function () {
			browser.assert.text(ZDAVitrineSolidProjectLink, uLocalized('ZDAVitrineSolidProjectLinkText'));
		});

		it('localizes ZDAVitrineUnhostedLink', function () {
			browser.assert.text(ZDAVitrineUnhostedLink, uLocalized('ZDAVitrineUnhostedLinkText'));
		});

		it('localizes ZDAVitrineFissionLink', function () {
			browser.assert.text(ZDAVitrineFissionLink, uLocalized('ZDAVitrineFissionLinkText'));
		});

		it('localizes ZDAVitrineProjectsHeading', function () {
			browser.assert.text(ZDAVitrineProjectsHeading, uLocalized('ZDAVitrineProjectsHeadingText'));
		});

		it('localizes ZDAVitrineProjectsSourcesHeading', function () {
			browser.assert.text(ZDAVitrineProjectsSourcesHeading, uLocalized('ZDAVitrineProjectsSourcesHeadingText'));
		});

		it('localizes ZDAVitrineProjectsSourcesBlurb', function () {
			browser.assert.text(ZDAVitrineProjectsSourcesBlurb, uLocalized('ZDAVitrineProjectsSourcesBlurbText'));
		});

		it('localizes ZDAVitrineProjectsCompilationLink', function () {
			browser.assert.text(ZDAVitrineProjectsCompilationLink, uLocalized('ZDAVitrineProjectsCompilationLinkText'));
		});

	});

});
