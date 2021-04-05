const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`ZDAVitrine_Localize-${ OLSKRoutingLanguage }`, function () {

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

		it('localizes ZDAVitrineCrownName', function () {
			browser.assert.text(ZDAVitrineCrownName, uLocalized('ZDAVitrineTitle'));
		});

		it('localizes ZDAVitrineCrownBlurb', function () {
			browser.assert.text(ZDAVitrineCrownBlurb, uLocalized('ZDAVitrineDescription'));
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

		it('localizes ZDAVitrineWrapLink', function () {
			browser.assert.text(ZDAVitrineWrapLink, uLocalized('ZDAVitrineWrapLinkText'));
		});

		it('localizes ZDAVitrineGazetteHeading', function () {
			browser.assert.text(ZDAVitrineGazetteHeading, uLocalized('OLSKGazetteHeadingText'));
		});

		it('localizes ZDAVitrineProjectsSourcesHeading', function () {
			browser.assert.text(ZDAVitrineProjectsSourcesHeading, uLocalized('ZDAVitrineProjectsSourcesHeadingText'));
		});

		it('localizes ZDAVitrineProjectsSourcesBlurb', function () {
			browser.assert.text(ZDAVitrineProjectsSourcesBlurb, uLocalized('ZDAVitrineProjectsSourcesBlurbText'));
		});

	});

});
