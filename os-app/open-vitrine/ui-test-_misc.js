const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('ZDAVitrine_Misc', function () {

	const protocols = require('../task-a-banks/controller.js').DataBankProtocols();
	const tools = require('../task-a-banks/controller.js').DataBankTools();

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

	protocols.forEach(function (e, i) {
		
		describe('ZDAVitrineProtocolsLink', function test_ZDAVitrineProtocolsLink() {
			
			it('sets href', function () {
				browser.assert.attribute(`${ ZDAVitrineProtocolsLink }:nth-of-type(${ i + 1 })`, 'href', e.ZDAProtocolURL);
			});
		
		});

		describe('ZDAVitrineProtocolsLinkImage', function test_ZDAVitrineProtocolsLinkImage() {
			
			it('sets src', function () {
				browser.assert.attribute(`${ ZDAVitrineProtocolsLink }:nth-of-type(${ i + 1 }) ${ ZDAVitrineProtocolsLinkImage }`, 'src', e.ZDAProtocolIconURL);
			});
		
		});

		describe('ZDAVitrineProtocolsLinkText', function test_ZDAVitrineProtocolsLinkText() {
			
			it('sets text', function () {
				browser.assert.text(`${ ZDAVitrineProtocolsLink }:nth-of-type(${ i + 1 }) ${ ZDAVitrineProtocolsLinkText }`, e.ZDAProtocolName);
			});
		
		});

	});

	tools.forEach(function (e, i) {
		
		context(e.ZDAToolURL, function () {
			
			describe('ZDAVitrineToolsLink', function test_ZDAVitrineToolsLink() {
				
				it('sets href', function () {
					browser.assert.attribute(`dt:nth-of-type(${ i + 1 }) ${ ZDAVitrineToolsLink }`, 'href', e.ZDAToolURL);
				});

				it('sets text', function () {
					browser.assert.text(`dt:nth-of-type(${ i + 1 }) ${ ZDAVitrineToolsLink }`, e.ZDAToolName);
				});
			
			});

			describe('ZDAVitrineToolsBlurb', function test_ZDAVitrineToolsBlurb() {
				
				it('sets text', function () {
					browser.assert.text(`${ ZDAVitrineToolsBlurb }:nth-of-type(${ i + 1 })`, e.ZDAToolBlurb);
				});
			
			});
		
		});

	});

	require('../_shared/ZDABank/main.js').ZDABankURLs().forEach(function (e, i) {

		describe('ZDAVitrineProjectsSourcesList', function test_ZDAVitrineProjectsSourcesList () {
			
			it('localizes ZDAVitrineProjectsSourcesList', function () {
				browser.assert.attribute(`.ZDAVitrineProjectsSourcesList li:nth-child(${ i + 1 }) .ZDAVitrineProjectsSourcesListItem`, 'href', e);
				browser.assert.text(`.ZDAVitrineProjectsSourcesList li:nth-child(${ i + 1 }) .ZDAVitrineProjectsSourcesListItem`, e.replace('https://', ''));
			});
		
		});

	});

	describe('ROCOGazette', function test_ROCOGazette () {

		it('sets ROCOBulletinProject', function () {
			browser.assert.attribute('.ROCOBulletinProjectField', 'value', 'RP_005');
		});

	});

	describe('OLSKEdit', function test_OLSKEdit () {

		it('sets OLSKEditURL', function () {
			browser.assert.attribute('.OLSKEdit', 'href', process.env.OLSK_REPO_URL);
		});

	});

	describe('ROCOForum', function test_ROCOForum () {

		it('sets ROCOForumTopic', function () {
			browser.assert.attribute('.ROCOForumList', 'category', process.env.ROCO_FORUM_TOPIC);
		});
	
	});

});
