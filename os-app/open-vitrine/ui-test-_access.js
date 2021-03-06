const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	ZDAVitrine: '.ZDAVitrine',
	
	ZDAVitrineCrown: '.ZDAVitrineCrown',
	ZDAVitrineCrownIcon: '.ZDAVitrineCrownIcon',
	ZDAVitrineCrownName: '.ZDAVitrineCrownName',
	ZDAVitrineCrownBlurb: '.ZDAVitrineCrownBlurb',

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

	ZDAVitrineProjectsHeading: '.ZDAVitrineProjectsHeading',

	ZDAVitrineProjectsSourcesHeading: '.ZDAVitrineProjectsSourcesHeading',
	ZDAVitrineProjectsSourcesBlurb: '.ZDAVitrineProjectsSourcesBlurb',
	ZDAVitrineProjectsCompilationLink: '.ZDAVitrineProjectsCompilationLink',
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
	
	it('shows OLSKLanguageSwitcher', function() {
		browser.assert.elements('.OLSKLanguageSwitcher', 1);
	});
	
	it('shows ZDAVitrineCrown', function() {
		browser.assert.elements(ZDAVitrineCrown, 1);
	});
	
	it('shows ZDAVitrineCrownIcon', function() {
		browser.assert.elements(ZDAVitrineCrownIcon, 1);
	});
	
	it('shows ZDAVitrineCrownName', function() {
		browser.assert.elements(ZDAVitrineCrownName, 1);
	});

	it('shows ZDAVitrineCrownBlurb', function () {
		browser.assert.elements(ZDAVitrineCrownBlurb, 1);
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

	it('shows ZDAVitrineProjectsHeading', function () {
		browser.assert.elements(ZDAVitrineProjectsHeading, 1);
	});

	it('shows ZDAVitrineList', function () {
		browser.assert.elements('.ZDAVitrineList', 1);
	});

	it('shows ZDAVitrineProjectsSourcesHeading', function () {
		browser.assert.elements(ZDAVitrineProjectsSourcesHeading, 1);
	});

	it('shows ZDAVitrineProjectsSourcesBlurb', function () {
		browser.assert.elements(ZDAVitrineProjectsSourcesBlurb, 1);
	});

	it('shows ZDAVitrineProjectsCompilationLink', function () {
		browser.assert.elements(ZDAVitrineProjectsCompilationLink, 1);
	});
	
	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
