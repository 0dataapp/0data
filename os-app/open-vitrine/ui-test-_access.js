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

	ZDAVitrineInformationHeading: '.ZDAVitrineInformationHeading',
	ZDAVitrineAutonomousDataLink: '.ZDAVitrineAutonomousDataLink',
	ZDAVitrineRemoteStorageLink: '.ZDAVitrineRemoteStorageLink',
	ZDAVitrineSolidProjectLink: '.ZDAVitrineSolidProjectLink',
	ZDAVitrineUnhostedLink: '.ZDAVitrineUnhostedLink',
	ZDAVitrineFissionLink: '.ZDAVitrineFissionLink',
	ZDAVitrineRepoLink: '.ZDAVitrineRepoLink',
	ZDAVitrineWrapLink: '.ZDAVitrineWrapLink',

	ZDAVitrineProjectsSourcesHeading: '.ZDAVitrineProjectsSourcesHeading',
	ZDAVitrineProjectsSourcesBlurb: '.ZDAVitrineProjectsSourcesBlurb',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('ZDAVitrine_Access', function () {

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

	it('shows ZDAVitrineInformationHeading', function () {
		browser.assert.elements(ZDAVitrineInformationHeading, 1);
	});

	it('shows ZDAVitrineAutonomousDataLink', function () {
		browser.assert.elements(ZDAVitrineAutonomousDataLink, 1);
	});

	it('shows ZDAVitrineRemoteStorageLink', function () {
		browser.assert.elements(ZDAVitrineRemoteStorageLink, 1);
	});

	it('shows ZDAVitrineSolidProjectLink', function () {
		browser.assert.elements(ZDAVitrineSolidProjectLink, 1);
	});

	it('shows ZDAVitrineUnhostedLink', function () {
		browser.assert.elements(ZDAVitrineUnhostedLink, 1);
	});

	it('shows ZDAVitrineFissionLink', function () {
		browser.assert.elements(ZDAVitrineFissionLink, 1);
	});

	it('shows ZDAVitrineRepoLink', function () {
		browser.assert.elements(ZDAVitrineRepoLink, 1);
	});

	it('shows ZDAVitrineWrapLink', function () {
		browser.assert.elements(ZDAVitrineWrapLink, 1);
	});

	it('shows ROCOGazette', function () {
		browser.assert.elements('.ROCOGazette', 1);
	});

	it('shows OLSKJar', function () {
		browser.assert.elements('.OLSKJar', 1);
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
