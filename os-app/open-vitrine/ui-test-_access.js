const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	ZDAVitrine: '.ZDAVitrine',
	
	ZDAVitrinePrinciplesHeading: '.ZDAVitrinePrinciplesHeading',
	ZDAVitrinePrinciplesList: '.ZDAVitrinePrinciplesList',

	ZDAVitrineFlowsHeading: '.ZDAVitrineFlowsHeading',
	ZDAVitrineFlowsTraditionalHeading: '.ZDAVitrineFlowsTraditionalHeading',
	ZDAVitrineFlowsTraditionalBlurb: '.ZDAVitrineFlowsTraditionalBlurb',
	ZDAVitrineFlowsTraditionalImage: '.ZDAVitrineFlowsTraditionalImage',
	ZDAVitrineFlowsModernHeading: '.ZDAVitrineFlowsModernHeading',
	ZDAVitrineFlowsModernBlurb: '.ZDAVitrineFlowsModernBlurb',
	ZDAVitrineFlowsModernImage: '.ZDAVitrineFlowsModernImage',

	ZDAVitrineProtocolsHeading: '.ZDAVitrineProtocolsHeading',
	ZDAVitrineProtocolsLink: '.ZDAVitrineProtocolsLink',
	ZDAVitrineProtocolsLinkImage: '.ZDAVitrineProtocolsLinkImage',
	ZDAVitrineProtocolsLinkText: '.ZDAVitrineProtocolsLinkText',

	ZDAVitrineToolsHeading: '.ZDAVitrineToolsHeading',
	ZDAVitrineToolsContainer: '.ZDAVitrineToolsContainer',
	ZDAVitrineToolsLink: '.ZDAVitrineToolsLink',
	ZDAVitrineToolsBlurb: '.ZDAVitrineToolsBlurb',

	ZDAVitrineEventsHeading: '.ZDAVitrineEventsHeading',

	ZDAVitrineGroupDiscussionHeading: '.ZDAVitrineGroupDiscussionHeading',
	ZDAVitrineGroupDiscussionVideo: '.ZDAVitrineGroupDiscussionVideo',

	ZDAVitrineInitiativesHeading: '.ZDAVitrineInitiativesHeading',
	ZDAVitrineInitiativesContainer: '.ZDAVitrineInitiativesContainer',
	ZDAVitrineInitiativesLink: '.ZDAVitrineInitiativesLink',
	ZDAVitrineInitiativesBlurb: '.ZDAVitrineInitiativesBlurb',

	ZDAVitrineAlsoHeading: '.ZDAVitrineAlsoHeading',
	ZDAVitrineZeroDataCrown: '.ZDAVitrineZeroDataCrown',
	ZDAVitrineZeroDataCrownIcon: '.ZDAVitrineZeroDataCrownIcon',
	ZDAVitrineZeroDataCrownName: '.ZDAVitrineZeroDataCrownName',
	ZDAVitrineZeroDataCrownBlurb: '.ZDAVitrineZeroDataCrownBlurb',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('ZDAVitrine_Access', function () {

	const protocols = require('../task-a-banks/controller.js').DataBankProtocols().length;
	const tools = require('../task-a-banks/controller.js').DataBankTools().length;
	const initiatives = require('../task-a-banks/controller.js').DataBankInitiatives().length;

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows ZDAVitrine', function() {
		browser.assert.elements(ZDAVitrine, 1);
	});
	
	it('shows OLSKCrown', function() {
		browser.assert.elements('.OLSKCrown', 1);
	});
	
	it('shows OLSKLanding', function() {
		browser.assert.elements('.OLSKLanding', 1);
	});

	it('shows ZDAVitrinePrinciplesHeading', function () {
		browser.assert.elements(ZDAVitrinePrinciplesHeading, 1);
	});

	it('shows ZDAVitrinePrinciplesList', function () {
		browser.assert.elements(ZDAVitrinePrinciplesList, 1);
	});

	it('shows ZDAVitrineFlowsHeading', function () {
		browser.assert.elements(ZDAVitrineFlowsHeading, 1);
	});

	it('shows ZDAVitrineFlowsTraditionalHeading', function () {
		browser.assert.elements(ZDAVitrineFlowsTraditionalHeading, 1);
	});

	it('shows ZDAVitrineFlowsTraditionalBlurb', function () {
		browser.assert.elements(ZDAVitrineFlowsTraditionalBlurb, 1);
	});

	it('shows ZDAVitrineFlowsTraditionalImage', function () {
		browser.assert.elements(ZDAVitrineFlowsTraditionalImage, 1);
	});

	it('shows ZDAVitrineFlowsModernHeading', function () {
		browser.assert.elements(ZDAVitrineFlowsModernHeading, 1);
	});

	it('shows ZDAVitrineFlowsModernBlurb', function () {
		browser.assert.elements(ZDAVitrineFlowsModernBlurb, 1);
	});

	it('shows ZDAVitrineFlowsModernImage', function () {
		browser.assert.elements(ZDAVitrineFlowsModernImage, 1);
	});

	it('shows ZDAVitrineProtocolsHeading', function () {
		browser.assert.elements(ZDAVitrineProtocolsHeading, 1);
	});

	it('shows ZDAVitrineProtocolsLink', function () {
		browser.assert.elements(ZDAVitrineProtocolsLink, protocols);
	});

	it('shows ZDAVitrineProtocolsLinkImage', function () {
		browser.assert.elements(ZDAVitrineProtocolsLinkImage, protocols);
	});

	it('shows ZDAVitrineProtocolsLinkText', function () {
		browser.assert.elements(ZDAVitrineProtocolsLinkText, protocols);
	});

	it('shows ZDAVitrineToolsHeading', function () {
		browser.assert.elements(ZDAVitrineToolsHeading, 1);
	});

	it('shows ZDAVitrineToolsContainer', function () {
		browser.assert.elements(ZDAVitrineToolsContainer, 1);
	});

	it('shows ZDAVitrineToolsLink', function () {
		browser.assert.elements(ZDAVitrineToolsLink, tools);
	});

	it('shows ZDAVitrineToolsBlurb', function () {
		browser.assert.elements(ZDAVitrineToolsBlurb, tools);
	});

	it('shows ZDAVitrineEventsHeading', function () {
		browser.assert.elements(ZDAVitrineEventsHeading, 1);
	});

	it('shows ZDAVitrineEventsList', function () {
		browser.assert.elements('.ZDAVitrineEventsList', 1);
	});

	it('shows ZDAVitrineGroupDiscussionHeading', function () {
		browser.assert.elements(ZDAVitrineGroupDiscussionHeading, 1);
	});

	it('shows ZDAVitrineGroupDiscussionVideo', function () {
		browser.assert.elements(ZDAVitrineGroupDiscussionVideo, 1);
	});

	it('shows ZDAVitrineInitiativesHeading', function () {
		browser.assert.elements(ZDAVitrineInitiativesHeading, 1);
	});

	it('shows ZDAVitrineInitiativesContainer', function () {
		browser.assert.elements(ZDAVitrineInitiativesContainer, 1);
	});

	it('shows ZDAVitrineInitiativesLink', function () {
		browser.assert.elements(ZDAVitrineInitiativesLink, initiatives);
	});

	it('shows ZDAVitrineInitiativesBlurb', function () {
		browser.assert.elements(ZDAVitrineInitiativesBlurb, initiatives);
	});

	it('shows ROCOGazette', function () {
		browser.assert.elements('.ROCOGazette', 1);
	});

	it('shows OLSKEdit', function () {
		browser.assert.elements('.OLSKEdit', 1);
	});

	it('shows ZDAVitrineAlsoHeading', function () {
		browser.assert.elements(ZDAVitrineAlsoHeading, 1);
	});

	it('shows ZDAVitrineZeroDataCrown', function () {
		browser.assert.elements(ZDAVitrineZeroDataCrown, 1);
	});

	it('shows ZDAVitrineZeroDataCrownIcon', function () {
		browser.assert.elements(ZDAVitrineZeroDataCrownIcon, 1);
	});

	it('shows ZDAVitrineZeroDataCrownName', function () {
		browser.assert.elements(ZDAVitrineZeroDataCrownName, 1);
	});

	it('shows ZDAVitrineZeroDataCrownBlurb', function () {
		browser.assert.elements(ZDAVitrineZeroDataCrownBlurb, 1);
	});

	it('shows SWARLink', function() {
		browser.assert.elements('.SWARLink', 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
