const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('ZDAVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	describe('ZDAVitrine', function () {
		
		it('classes OLSKCommon', function () {
			browser.assert.hasClass(ZDAVitrine, 'OLSKCommon');
		});

		it('classes OLSKCommonCapped', function () {
			browser.assert.hasClass(ZDAVitrine, 'OLSKCommonCapped');
		});
	
	});

	describe('ZDAVitrineIdentity', function test_ZDAVitrineIdentity() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(ZDAVitrineIdentity, 'OLSKCommonCard');
		});

		it('classes OLSKCommonIdentityCard', function () {
			browser.assert.hasClass(ZDAVitrineIdentity, 'OLSKCommonIdentityCard');
		});
		
	});

	describe('ZDAVitrineIdentityLogo', function test_ZDAVitrineIdentityLogo() {
		
		it('sets role', function () {
			browser.assert.attribute(ZDAVitrineIdentityLogo, 'role', 'presentation');
		});
		
		it('sets src', function () {
			browser.assert.attribute(ZDAVitrineIdentityLogo, 'src', OLSKTestingCanonical(require('../_shared/common/controller.js').OLSKControllerRoutes().pop()));
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

		it('sets text', function () {
			browser.assert.text(ZDAVitrineFissionLink, 'Fission');
		});
	
	});

	require('./controller.js').DataListingURLs().forEach(function (e, i) {

		describe('ZDAVitrinePrinciplesListItem', function test_ZDAVitrinePrinciplesListItem () {
			
			it('localizes ZDAVitrinePrinciplesListItem', function () {
				browser.assert.attribute(`.ZDAVitrineProjectsSourcesList li:nth-child(${ i + 1 }) .ZDAVitrineProjectsSourcesListItem`, 'href', e);
				browser.assert.text(`.ZDAVitrineProjectsSourcesList li:nth-child(${ i + 1 }) .ZDAVitrineProjectsSourcesListItem`, e);
			});
		
		});

	});

	describe('ZDAVitrineProjectsCompilationLink', function test_ZDAVitrineProjectsCompilationLink () {
		
		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineProjectsCompilationLink, 'href', require('./controller.js').OLSKControllerRoutes().pop().OLSKRoutePath);
		});
	
	});

});
