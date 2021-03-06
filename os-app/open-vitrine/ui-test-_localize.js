const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('ZDAVitrine_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('ZDAVitrineTitle'));
		});

		it('localizes meta[description]', function() {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('ZDAVitrineDescription'));
		});

		it('localizes ZDAVitrinePrinciplesHeading', function () {
			browser.assert.text(ZDAVitrinePrinciplesHeading, uLocalized('ZDAVitrinePrinciplesHeadingText'));
		});

		uLocalized('ZDAVitrinePrinciplesListItemText').forEach(function (e, i) {
			it('localizes ZDAVitrinePrinciplesListItem', function () {
				browser.assert.OLSKInnerHTML(`.ZDAVitrinePrinciplesListItem:nth-child(${ i + 1 })`, e);
			});
		});

		it('localizes ZDAVitrineFlowsHeading', function () {
			browser.assert.text(ZDAVitrineFlowsHeading, uLocalized('ZDAVitrineFlowsHeadingText'));
		});

		it('localizes ZDAVitrineFlowsTraditionalHeading', function () {
			browser.assert.OLSKInnerHTML(ZDAVitrineFlowsTraditionalHeading, uLocalized('ZDAVitrineFlowsTraditionalHeadingText'));
		});

		it('localizes ZDAVitrineFlowsTraditionalBlurb', function () {
			browser.assert.OLSKInnerHTML(ZDAVitrineFlowsTraditionalBlurb, uLocalized('ZDAVitrineFlowsTraditionalBlurbText'));
		});

		it('localizes ZDAVitrineFlowsModernHeading', function () {
			browser.assert.OLSKInnerHTML(ZDAVitrineFlowsModernHeading, uLocalized('ZDAVitrineFlowsModernHeadingText'));
		});

		it('localizes ZDAVitrineFlowsModernBlurb', function () {
			browser.assert.OLSKInnerHTML(ZDAVitrineFlowsModernBlurb, uLocalized('ZDAVitrineFlowsModernBlurbText'));
		});

		it('localizes ZDAVitrineInformationHeading', function () {
			browser.assert.text(ZDAVitrineInformationHeading, uLocalized('ZDAVitrineInformationHeadingText'));
		});

		it('localizes ZDAVitrineRepoLink', function () {
			browser.assert.text(ZDAVitrineRepoLink, uLocalized('ZDAVitrineRepoLinkText'));
		});

		it('localizes ZDAVitrineStorageStackLink', function () {
			browser.assert.text(ZDAVitrineStorageStackLink, uLocalized('ZDAVitrineStorageStackLinkText'));
		});

		it('localizes ZDAVitrineWrapLink', function () {
			browser.assert.text(ZDAVitrineWrapLink, uLocalized('ZDAVitrineWrapLinkText'));
		});

		it('localizes ZDAVitrineProjectsSourcesHeading', function () {
			browser.assert.text(ZDAVitrineProjectsSourcesHeading, uLocalized('ZDAVitrineProjectsSourcesHeadingText'));
		});

		it('localizes ZDAVitrineProjectsSourcesBlurb', function () {
			browser.assert.text(ZDAVitrineProjectsSourcesBlurb, uLocalized('ZDAVitrineProjectsSourcesBlurbText'));
		});

		context('OLSKCrown', function test_OLSKCrown () {

			it('localizes OLSKCrownCardName', function () {
				browser.assert.text('.OLSKCrownCardName', uLocalized('ZDAVitrineTitle'));
			});
		
		});

		context('OLSKLanding', function test_OLSKLanding () {

			it('localizes OLSKLandingHeadingText', function () {
				browser.assert.text('.OLSKLandingHeading', uLocalized('ZDAVitrineDescription'));
			});

			it('localizes OLSKLandingBlurbText', function () {
				browser.assert.text('.OLSKLandingBlurb', uLocalized('OLSKLandingBlurbText'));
			});

			it.skip('localizes OLSKLandingActionText', function () {
				browser.assert.text('.OLSKLandingAction', OLSKTestingFormatted(uLocalized('OLSKLandingActionTextFormat'), require('../open-glance/controller.js').OLSKControllerSharedLocals().ZDAGlanceProjectsCount()));
			});
		
		});

	});

});
