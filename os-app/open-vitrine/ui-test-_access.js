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
	
	ZDAVitrineProjectsSourcesHeading: '.ZDAVitrineProjectsSourcesHeading',
	ZDAVitrineProjectsSourcesBlurb: '.ZDAVitrineProjectsSourcesBlurb',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('ZDAVitrine_Access', function () {

	const protocols = require('../task-a-banks/controller.js').DataBankProtocols().length;
	const tools = require('../task-a-banks/controller.js').DataBankTools().length;

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

	it('shows ROCOGazette', function () {
		browser.assert.elements('.ROCOGazette', 1);
	});

	it('shows OLSKJar', function () {
		browser.assert.elements('.OLSKJar', 1);
	});

	it('shows OLSKEdit', function () {
		browser.assert.elements('.OLSKEdit', 1);
	});

	it('shows ZDAVitrineProjectsSourcesHeading', function () {
		browser.assert.elements(ZDAVitrineProjectsSourcesHeading, 1);
	});

	it('shows ZDAVitrineProjectsSourcesBlurb', function () {
		browser.assert.elements(ZDAVitrineProjectsSourcesBlurb, 1);
	});

	it('shows ROCOForum', function () {
		browser.assert.elements('.ROCOForum', 1);
	});

	it('shows ROCOEphemerataLink', function () {
		browser.assert.elements('.ROCOEphemerataLink', 1);
	});

	it('shows SWARLink', function() {
		browser.assert.elements('.SWARLink', 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
