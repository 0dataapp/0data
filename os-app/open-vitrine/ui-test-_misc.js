const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('ZDAVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	it('assigns meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width');
	});

	describe('ZDAVitrine', function () {
		
		it('classes OLSKCommon', function () {
			browser.assert.hasClass(ZDAVitrine, 'OLSKCommon');
		});
	
	});

	describe('ZDAVitrineIdentityLogo', function () {
		
		it('sets role', function () {
			browser.assert.attribute(ZDAVitrineIdentityLogo, 'role', 'presentation');
		});
		
		it('sets src', function () {
			browser.assert.attribute(ZDAVitrineIdentityLogo, 'src', process.env.ZDA_TOUCH_ICON_URL);
		});
	
	});

	describe('ZDAVitrineAutonomousDataLink', function test_ZDAVitrineAutonomousDataLink () {
		
		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineAutonomousDataLink, 'href', process.env.ZDA_VITRINE_AUTONOMOUS_DATA_URL);
		});
	
	});

	describe('ZDAVitrineRemoteStorageLink', function test_ZDAVitrineRemoteStorageLink () {
		
		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineRemoteStorageLink, 'href', process.env.ZDA_VITRINE_REMOTE_STORAGE_URL);
		});
	
	});

	describe('ZDAVitrineSolidProjectLink', function test_ZDAVitrineSolidProjectLink () {
		
		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineSolidProjectLink, 'href', process.env.ZDA_VITRINE_SOLID_PROJECT_URL);
		});
	
	});

	describe('ZDAVitrineUnhostedLink', function test_ZDAVitrineUnhostedLink () {
		
		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineUnhostedLink, 'href', process.env.ZDA_VITRINE_UNHOSTED_URL);
		});
	
	});

	describe('ZDAVitrineFissionLink', function test_ZDAVitrineFissionLink () {
		
		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineFissionLink, 'href', process.env.ZDA_VITRINE_FISSION_URL);
		});
	
	});

	require('./controller.js').DataListingURLs().forEach(function (e, i) {
		
		it('localizes ZDAVitrineAspectsListItem', function () {
			browser.assert.attribute(`.ZDAVitrineProjectsSourcesList li:nth-child(${ i + 1 }) .ZDAVitrineProjectsSourcesListItem`, 'href', e);
			browser.assert.text(`.ZDAVitrineProjectsSourcesList li:nth-child(${ i + 1 }) .ZDAVitrineProjectsSourcesListItem`, e);
		});

	});

});
