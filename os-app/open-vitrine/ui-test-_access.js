const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	ZDAVitrine: '.ZDAVitrine',
	
	ZDAVitrineIdentity: '.ZDAVitrineIdentity',
	ZDAVitrineIdentityLogo: '.ZDAVitrineIdentityLogo',
	ZDAVitrineIdentityName: '.ZDAVitrineIdentityName',

	ZDAVitrineAspectsHeading: '.ZDAVitrineAspectsHeading',
	ZDAVitrineAspectsList: '.ZDAVitrineAspectsList',

	ZDAVitrineProjectsHeading: '.ZDAVitrineProjectsHeading',
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

	it('shows ZDAVitrineProjectsHeading', function () {
		browser.assert.elements(ZDAVitrineProjectsHeading, 1);
	});

	it('shows ZDAVitrineList', function () {
		browser.assert.elements('.ZDAVitrineList', 1);
	});
	
	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
