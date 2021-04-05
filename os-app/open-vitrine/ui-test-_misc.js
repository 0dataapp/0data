const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('ZDAVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	describe('ZDAVitrine', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(ZDAVitrine, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(ZDAVitrine, 'OLSKDecorCapped');
		});
	
	});

	describe('OLSKCrown', function test_OLSKCrown () {

		it('sets OLSKCrownCardImageURL', function () {
			browser.assert.attribute('.OLSKCrownCardImage', 'src', process.env.ZDA_VITRINE_IDENTITY_URL);
		});
	
	});

	describe('OLSKLanding', function test_OLSKLanding () {

		it('sets OLSKLandingActionHref', function () {
			browser.assert.attribute('.OLSKLandingAction', 'href', OLSKTestingCanonical(require('../open-glance/controller.js').OLSKControllerRoutes().shift()));
		});
	
	});

	describe('ZDAVitrineFlowsTraditionalImage', function test_ZDAVitrineFlowsTraditionalImage() {
		
		it('sets role', function () {
			browser.assert.attribute(ZDAVitrineFlowsTraditionalImage, 'role', 'presentation');
		});
		
		it('sets src', function () {
			browser.assert.attribute(ZDAVitrineFlowsTraditionalImage, 'src', process.env.ZDA_VITRINE_FLOWS_TRADITIONAL_URL);
		});
	
	});

	describe('ZDAVitrineFlowsModernImage', function test_ZDAVitrineFlowsModernImage() {
		
		it('sets role', function () {
			browser.assert.attribute(ZDAVitrineFlowsModernImage, 'role', 'presentation');
		});
		
		it('sets src', function () {
			browser.assert.attribute(ZDAVitrineFlowsModernImage, 'src', process.env.ZDA_VITRINE_FLOWS_MODERN_URL);
		});
	
	});

	describe('ZDAVitrineAutonomousDataLink', function test_ZDAVitrineAutonomousDataLink () {
		
		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineAutonomousDataLink, 'href', process.env.ZDA_VITRINE_AUTONOMOUS_DATA_URL);
		});

		it('sets text', function () {
			browser.assert.text(ZDAVitrineAutonomousDataLink, 'Autonomous Data');
		});
	
	});

	describe('ZDAVitrineRemoteStorageLink', function test_ZDAVitrineRemoteStorageLink () {
		
		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineRemoteStorageLink, 'href', process.env.ZDA_VITRINE_REMOTE_STORAGE_URL);
		});

		it('sets text', function () {
			browser.assert.text(ZDAVitrineRemoteStorageLink, 'remoteStorage');
		});
	
	});

	describe('ZDAVitrineSolidProjectLink', function test_ZDAVitrineSolidProjectLink () {
		
		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineSolidProjectLink, 'href', process.env.ZDA_VITRINE_SOLID_PROJECT_URL);
		});

		it('sets text', function () {
			browser.assert.text(ZDAVitrineSolidProjectLink, 'Solid Project');
		});
	
	});

	describe('ZDAVitrineUnhostedLink', function test_ZDAVitrineUnhostedLink () {
		
		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineUnhostedLink, 'href', process.env.ZDA_VITRINE_UNHOSTED_URL);
		});

		it('sets text', function () {
			browser.assert.text(ZDAVitrineUnhostedLink, 'Unhosted');
		});
	
	});

	describe('ZDAVitrineFissionLink', function test_ZDAVitrineFissionLink () {
		
		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineFissionLink, 'href', process.env.ZDA_VITRINE_FISSION_URL);
		});

		it('sets text', function () {
			browser.assert.text(ZDAVitrineFissionLink, 'Fission');
		});
	
	});

	describe('ZDAVitrineRepoLink', function test_ZDAVitrineRepoLink () {
		
		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineRepoLink, 'href', process.env.ZDA_VITRINE_REPO_URL);
		});
	
	});

	describe('ZDAVitrineWrapLink', function test_ZDAVitrineWrapLink () {
		
		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineWrapLink, 'href', process.env.ZDA_VITRINE_WRAP_URL);
		});
	
	});

	require('../open-glance/controller.js').DataListingURLs().forEach(function (e, i) {

		describe('ZDAVitrineProjectsSourcesList', function test_ZDAVitrineProjectsSourcesList () {
			
			it('localizes ZDAVitrineProjectsSourcesList', function () {
				browser.assert.attribute(`.ZDAVitrineProjectsSourcesList li:nth-child(${ i + 1 }) .ZDAVitrineProjectsSourcesListItem`, 'href', e);
				browser.assert.text(`.ZDAVitrineProjectsSourcesList li:nth-child(${ i + 1 }) .ZDAVitrineProjectsSourcesListItem`, e.replace('https://', ''));
			});
		
		});

	});

	describe('OLSKGazette', function test_OLSKGazette () {

		it('sets src', function () {
			browser.assert.attribute('.OLSKGazetteProjectField', 'value', 'RP_005');
		});

	});

});
