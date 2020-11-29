const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	ZDAVitrine: '.ZDAVitrine',
	
	ZDAVitrineIdentity: '.ZDAVitrineIdentity',
	ZDAVitrineIdentityLogo: '.ZDAVitrineIdentityLogo',
	ZDAVitrineIdentityName: '.ZDAVitrineIdentityName',

	ZDAVitrineAspectsHeading: '.ZDAVitrineAspectsHeading',
	ZDAVitrineAspectsList: '.ZDAVitrineAspectsList',

	ZDAVitrineInformationHeading: '.ZDAVitrineInformationHeading',
	ZDAVitrineAutonomousDataLink: '.ZDAVitrineAutonomousDataLink',
	ZDAVitrineRemoteStorageLink: '.ZDAVitrineRemoteStorageLink',
	ZDAVitrineSolidProjectLink: '.ZDAVitrineSolidProjectLink',
	ZDAVitrineUnhostedLink: '.ZDAVitrineUnhostedLink',
	ZDAVitrineFissionLink: '.ZDAVitrineFissionLink',

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
	
	it('shows ZDAVitrineIdentity', function() {
		browser.assert.elements(ZDAVitrineIdentity, 1);
	});
	
	it('shows ZDAVitrineIdentityLogo', function() {
		browser.assert.elements(ZDAVitrineIdentityLogo, 1);
	});
	
	it('shows ZDAVitrineIdentityName', function() {
		browser.assert.elements(ZDAVitrineIdentityName, 1);
	});

	it('shows ZDAVitrineAspectsHeading', function () {
		browser.assert.elements(ZDAVitrineAspectsHeading, 1);
	});

	it('shows ZDAVitrineAspectsList', function () {
		browser.assert.elements(ZDAVitrineAspectsList, 1);
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
