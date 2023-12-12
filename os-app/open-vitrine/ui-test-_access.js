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

	ZDAVitrineReadingHeading: '.ZDAVitrineReadingHeading',
	ZDAVitrineReadingContainer: '.ZDAVitrineReadingContainer',
	ZDAVitrineReadingLink: '.ZDAVitrineReadingLink',
	ZDAVitrineReadingBlurb: '.ZDAVitrineReadingBlurb',

	ZDAVitrineAdjacentHeading: '.ZDAVitrineAdjacentHeading',
	ZDAVitrineAdjacentContainer: '.ZDAVitrineAdjacentContainer',
	ZDAVitrineAdjacentLink: '.ZDAVitrineAdjacentLink',
	ZDAVitrineAdjacentBlurb: '.ZDAVitrineAdjacentBlurb',

	ZDAVitrineAlsoHeading: '.ZDAVitrineAlsoHeading',
	ZDAVitrineEasyIndieCrown: '.ZDAVitrineEasyIndieCrown',
	ZDAVitrineEasyIndieCrownIcon: '.ZDAVitrineEasyIndieCrownIcon',
	ZDAVitrineEasyIndieCrownName: '.ZDAVitrineEasyIndieCrownName',
	ZDAVitrineEasyIndieCrownBlurb: '.ZDAVitrineEasyIndieCrownBlurb',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('ZDAVitrine_Access', function () {

	const protocols = require('../task-a-banks/controller.js').DataBankProtocols().length;
	const tools = require('../task-a-banks/controller.js').DataBankTools().length;
	const reading = require('../task-a-banks/controller.js').DataBankReading().length;
	const adjacent = require('../task-a-banks/controller.js').DataBankAdjacent().length;

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows ZDAVitrine', function() {
		return browser.assert.elements(ZDAVitrine, 1);
	});
	
	it('shows OLSKCrown', function() {
		return browser.assert.elements('.OLSKCrown', 1);
	});
	
	it('shows OLSKLanding', function() {
		return browser.assert.elements('.OLSKLanding', 1);
	});

	it('shows ZDAVitrinePrinciplesHeading', function () {
		return browser.assert.elements(ZDAVitrinePrinciplesHeading, 1);
	});

	it('shows ZDAVitrinePrinciplesList', function () {
		return browser.assert.elements(ZDAVitrinePrinciplesList, 1);
	});

	it('shows ZDAVitrineFlowsHeading', function () {
		return browser.assert.elements(ZDAVitrineFlowsHeading, 1);
	});

	it('shows ZDAVitrineFlowsTraditionalHeading', function () {
		return browser.assert.elements(ZDAVitrineFlowsTraditionalHeading, 1);
	});

	it('shows ZDAVitrineFlowsTraditionalBlurb', function () {
		return browser.assert.elements(ZDAVitrineFlowsTraditionalBlurb, 1);
	});

	it('shows ZDAVitrineFlowsTraditionalImage', function () {
		return browser.assert.elements(ZDAVitrineFlowsTraditionalImage, 1);
	});

	it('shows ZDAVitrineFlowsModernHeading', function () {
		return browser.assert.elements(ZDAVitrineFlowsModernHeading, 1);
	});

	it('shows ZDAVitrineFlowsModernBlurb', function () {
		return browser.assert.elements(ZDAVitrineFlowsModernBlurb, 1);
	});

	it('shows ZDAVitrineFlowsModernImage', function () {
		return browser.assert.elements(ZDAVitrineFlowsModernImage, 1);
	});

	it('shows ZDAVitrineProtocolsHeading', function () {
		return browser.assert.elements(ZDAVitrineProtocolsHeading, 1);
	});

	it.skip('shows ZDAVitrineProtocolsLink', function () {
		return browser.assert.elements(ZDAVitrineProtocolsLink, protocols);
	});

	it.skip('shows ZDAVitrineProtocolsLinkImage', function () {
		return browser.assert.elements(ZDAVitrineProtocolsLinkImage, protocols);
	});

	it.skip('shows ZDAVitrineProtocolsLinkText', function () {
		return browser.assert.elements(ZDAVitrineProtocolsLinkText, protocols);
	});

	it('shows ZDAVitrineToolsHeading', function () {
		return browser.assert.elements(ZDAVitrineToolsHeading, 1);
	});

	it('shows ZDAVitrineToolsContainer', function () {
		return browser.assert.elements(ZDAVitrineToolsContainer, 1);
	});

	it.skip('shows ZDAVitrineToolsLink', function () {
		return browser.assert.elements(ZDAVitrineToolsLink, tools);
	});

	it.skip('shows ZDAVitrineToolsBlurb', function () {
		return browser.assert.elements(ZDAVitrineToolsBlurb, tools);
	});

	it('shows ZDAVitrineEventsHeading', function () {
		return browser.assert.elements(ZDAVitrineEventsHeading, 1);
	});

	it('shows ZDAVitrineEventsList', function () {
		return browser.assert.elements('.ZDAVitrineEventsList', 1);
	});

	it('shows ZDAVitrineGroupDiscussionHeading', function () {
		return browser.assert.elements(ZDAVitrineGroupDiscussionHeading, 1);
	});

	it('shows ZDAVitrineGroupDiscussionVideo', function () {
		return browser.assert.elements(ZDAVitrineGroupDiscussionVideo, 1);
	});

	it('shows ZDAVitrineReadingHeading', function () {
		return browser.assert.elements(ZDAVitrineReadingHeading, 1);
	});

	it('shows ZDAVitrineReadingContainer', function () {
		return browser.assert.elements(ZDAVitrineReadingContainer, 1);
	});

	it.skip('shows ZDAVitrineReadingLink', function () {
		return browser.assert.elements(ZDAVitrineReadingLink, reading);
	});

	it.skip('shows ZDAVitrineReadingBlurb', function () {
		return browser.assert.elements(ZDAVitrineReadingBlurb, reading);
	});

	it('shows ZDAVitrineAdjacentHeading', function () {
		return browser.assert.elements(ZDAVitrineAdjacentHeading, 1);
	});

	it('shows ZDAVitrineAdjacentContainer', function () {
		return browser.assert.elements(ZDAVitrineAdjacentContainer, 1);
	});

	it.skip('shows ZDAVitrineAdjacentLink', function () {
		return browser.assert.elements(ZDAVitrineAdjacentLink, adjacent);
	});

	it.skip('shows ZDAVitrineAdjacentBlurb', function () {
		return browser.assert.elements(ZDAVitrineAdjacentBlurb, adjacent);
	});

	it('shows ROCOGazette', function () {
		return browser.assert.elements('.ROCOGazette', 1);
	});

	it('shows OLSKEdit', function () {
		return browser.assert.elements('.OLSKEdit', 1);
	});

	it('shows ZDAVitrineAlsoHeading', function () {
		return browser.assert.elements(ZDAVitrineAlsoHeading, 1);
	});

	it('shows ZDAVitrineEasyIndieCrown', function () {
		return browser.assert.elements(ZDAVitrineEasyIndieCrown, 1);
	});

	it('shows ZDAVitrineEasyIndieCrownIcon', function () {
		return browser.assert.elements(ZDAVitrineEasyIndieCrownIcon, 1);
	});

	it('shows ZDAVitrineEasyIndieCrownName', function () {
		return browser.assert.elements(ZDAVitrineEasyIndieCrownName, 1);
	});

	it('shows ZDAVitrineEasyIndieCrownBlurb', function () {
		return browser.assert.elements(ZDAVitrineEasyIndieCrownBlurb, 1);
	});

	it('shows SWARLink', function() {
		return browser.assert.elements('.SWARLink', 1);
	});

	it('shows ROCORootLink', function() {
		return browser.assert.elements('.ROCORootLink', 1);
	});

});
