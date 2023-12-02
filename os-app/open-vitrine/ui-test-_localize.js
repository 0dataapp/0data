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
			return browser.assert.text('title', uLocalized('ZDAVitrineTitle'));
		});

		it('localizes meta[description]', function() {
			return browser.assert.attribute('meta[name=description]', 'content', uLocalized('ZDAVitrineDescription'));
		});

		it('localizes ZDAVitrinePrinciplesHeading', function () {
			return browser.assert.text(ZDAVitrinePrinciplesHeading, uLocalized('ZDAVitrinePrinciplesHeadingText'));
		});

		uLocalized('ZDAVitrinePrinciplesListItemText').forEach(function (e, i) {
			it('localizes ZDAVitrinePrinciplesListItem', function () {
				return browser.assert.OLSKInnerHTML(`.ZDAVitrinePrinciplesListItem:nth-child(${ i + 1 })`, e);
			});
		});

		it('localizes ZDAVitrineFlowsHeading', function () {
			return browser.assert.text(ZDAVitrineFlowsHeading, uLocalized('ZDAVitrineFlowsHeadingText'));
		});

		it('localizes ZDAVitrineFlowsTraditionalHeading', function () {
			return browser.assert.OLSKInnerHTML(ZDAVitrineFlowsTraditionalHeading, uLocalized('ZDAVitrineFlowsTraditionalHeadingText'));
		});

		it('localizes ZDAVitrineFlowsTraditionalBlurb', function () {
			return browser.assert.OLSKInnerHTML(ZDAVitrineFlowsTraditionalBlurb, uLocalized('ZDAVitrineFlowsTraditionalBlurbText'));
		});

		it('localizes ZDAVitrineFlowsModernHeading', function () {
			return browser.assert.OLSKInnerHTML(ZDAVitrineFlowsModernHeading, uLocalized('ZDAVitrineFlowsModernHeadingText'));
		});

		it('localizes ZDAVitrineFlowsModernBlurb', function () {
			return browser.assert.OLSKInnerHTML(ZDAVitrineFlowsModernBlurb, uLocalized('ZDAVitrineFlowsModernBlurbText'));
		});

		it('localizes ZDAVitrineProtocolsHeading', function () {
			return browser.assert.text(ZDAVitrineProtocolsHeading, uLocalized('ZDAVitrineProtocolsHeadingText'));
		});

		it('localizes ZDAVitrineToolsHeading', function () {
			return browser.assert.text(ZDAVitrineToolsHeading, uLocalized('ZDAVitrineToolsHeadingText'));
		});

		it('localizes ZDAVitrineEventsHeading', function () {
			return browser.assert.text(ZDAVitrineEventsHeading, uLocalized('ZDAVitrineEventsHeadingText'));
		});

		it('localizes ZDAVitrineGroupDiscussionHeading', function () {
			return browser.assert.text(ZDAVitrineGroupDiscussionHeading, uLocalized('ZDAVitrineGroupDiscussionHeadingText'));
		});

		it('localizes ZDAVitrineInitiativesHeading', function () {
			return browser.assert.text(ZDAVitrineInitiativesHeading, uLocalized('ZDAVitrineInitiativesHeadingText'));
		});

		it('localizes ZDAVitrineAlsoHeading', function () {
			return browser.assert.text(ZDAVitrineAlsoHeading, uLocalized('ZDAVitrineAlsoHeadingText'));
		});

		it('localizes ZDAVitrineEasyIndieCrownBlurb', function () {
			return browser.assert.text(ZDAVitrineEasyIndieCrownBlurb, uLocalized('ZDAVitrineEasyIndieCrownBlurbText'));
		});

		context('OLSKCrown', function test_OLSKCrown () {

			it('localizes OLSKCrownCardName', function () {
				return browser.assert.text('.OLSKCrownCardName', uLocalized('ZDAVitrineTitle'));
			});
		
		});

		context('OLSKLanding', function test_OLSKLanding () {

			it('localizes OLSKLandingHeadingText', function () {
				return browser.assert.text('.OLSKLandingHeading', uLocalized('ZDAVitrineDescription'));
			});

			it('localizes OLSKLandingBlurbText', function () {
				return browser.assert.text('.OLSKLandingBlurb', uLocalized('OLSKLandingBlurbText'));
			});

			it.skip('localizes OLSKLandingActionText', function () {
				return browser.assert.text('.OLSKLandingAction', OLSKTestingFormatted(uLocalized('OLSKLandingActionTextFormat'), require('../open-glance/controller.js').OLSKControllerSharedLocals().ZDAGlanceProjectsCount()));
			});
		
		});

	});

});
