const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('ZDAVitrine_Misc', function () {

	const protocols = require('../task-a-banks/controller.js').DataBankProtocols();
	const tools = require('../task-a-banks/controller.js').DataBankTools();
	const initiatives = require('../task-a-banks/controller.js').DataBankInitiatives();

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	describe('ZDAVitrine', function () {
		
		it('classes OLSKDecor', function () {
			return browser.assert.hasClass(ZDAVitrine, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			return browser.assert.hasClass(ZDAVitrine, 'OLSKDecorCapped');
		});

		it('classes OLSKDecorNoTopPad', function () {
			return browser.assert.hasClass(ZDAVitrine, 'OLSKDecorNoTopPad');
		});
	
	});

	describe('OLSKCrown', function test_OLSKCrown () {

		it('sets OLSKCrownCardImageURL', function () {
			return browser.assert.attribute('.OLSKCrownCardImage', 'src', process.env.ZDA_VITRINE_IDENTITY_URL);
		});
	
	});

	describe('OLSKLanding', function test_OLSKLanding () {

		it('sets OLSKLandingActionHref', function () {
			return browser.assert.attribute('.OLSKLandingAction', 'href', OLSKTestingCanonical(require('../open-glance/controller.js').OLSKControllerRoutes().shift()));
		});
	
	});

	describe('ZDAVitrineFlowsTraditionalImage', function test_ZDAVitrineFlowsTraditionalImage() {
		
		it('sets role', function () {
			return browser.assert.attribute(ZDAVitrineFlowsTraditionalImage, 'role', 'presentation');
		});
		
		it('sets src', function () {
			return browser.assert.attribute(ZDAVitrineFlowsTraditionalImage, 'src', process.env.ZDA_VITRINE_FLOWS_TRADITIONAL_URL);
		});
	
	});

	describe('ZDAVitrineFlowsModernImage', function test_ZDAVitrineFlowsModernImage() {
		
		it('sets role', function () {
			return browser.assert.attribute(ZDAVitrineFlowsModernImage, 'role', 'presentation');
		});
		
		it('sets src', function () {
			return browser.assert.attribute(ZDAVitrineFlowsModernImage, 'src', process.env.ZDA_VITRINE_FLOWS_MODERN_URL);
		});
	
	});

	protocols.forEach(function (e, i) {
		
		describe('ZDAVitrineProtocolsLink', function test_ZDAVitrineProtocolsLink() {
			
			it('sets href', function () {
				return browser.assert.attribute(`${ ZDAVitrineProtocolsLink }:nth-of-type(${ i + 1 })`, 'href', e.ZDAProtocolURL);
			});

			it('sets target', function () {
				return browser.assert.attribute(`${ ZDAVitrineProtocolsLink }:nth-of-type(${ i + 1 })`, 'target', '_blank');
			});
		
		});

		describe('ZDAVitrineProtocolsLinkImage', function test_ZDAVitrineProtocolsLinkImage() {
			
			it('sets src', function () {
				return browser.assert.attribute(`${ ZDAVitrineProtocolsLink }:nth-of-type(${ i + 1 }) ${ ZDAVitrineProtocolsLinkImage }`, 'src', e._ZDAProtocolIconURLCachedPath || e.ZDAProtocolIconURL);
			});
		
		});

		describe('ZDAVitrineProtocolsLinkText', function test_ZDAVitrineProtocolsLinkText() {
			
			it('sets text', function () {
				return browser.assert.text(`${ ZDAVitrineProtocolsLink }:nth-of-type(${ i + 1 }) ${ ZDAVitrineProtocolsLinkText }`, e.ZDAProtocolName);
			});
		
		});

	});

	describe('ZDAVitrineToolsContainer', function test_ZDAVitrineToolsContainer() {
		
		it('classes OLSKDecorGlossary', function () {
			return browser.assert.hasClass(ZDAVitrineToolsContainer, 'OLSKDecorGlossary');
		});

		it('sets lang', function () {
			return browser.assert.attribute(ZDAVitrineToolsContainer, 'lang', 'en');
		});
	
	});

	tools.forEach(function (e, i) {
		
		context(e.ZDAToolURL, function () {
			
			describe('ZDAVitrineToolsLink', function test_ZDAVitrineToolsLink() {
				
				it('sets href', function () {
					return browser.assert.attribute(`dt:nth-of-type(${ i + 1 }) ${ ZDAVitrineToolsLink }`, 'href', e.ZDAToolURL);
				});

				it('sets target', function () {
					return browser.assert.attribute(`dt:nth-of-type(${ i + 1 }) ${ ZDAVitrineToolsLink }`, 'target', '_blank');
				});

				it('sets text', function () {
					return browser.assert.text(`dt:nth-of-type(${ i + 1 }) ${ ZDAVitrineToolsLink }`, e.ZDAToolName);
				});
			
			});

			describe('ZDAVitrineToolsBlurb', function test_ZDAVitrineToolsBlurb() {
				
				it('sets text', function () {
					return browser.assert.text(`${ ZDAVitrineToolsBlurb }:nth-of-type(${ i + 1 })`, e.ZDAToolBlurb);
				});
			
			});
		
		});

	});

	describe('ZDAVitrineGroupDiscussionVideo', function test_ZDAVitrineGroupDiscussionVideo () {

		it('sets src', function () {
			return browser.assert.attribute(ZDAVitrineGroupDiscussionVideo, 'src', process.env.ZDA_VITRINE_GROUP_DISCUSSION_VIDEO_URL);
		});

		it('sets allowfullscreen', function () {
			return browser.assert.attribute(ZDAVitrineGroupDiscussionVideo, 'allowfullscreen', '');
		});

	});

	describe('ZDAVitrineInitiativesContainer', function test_ZDAVitrineInitiativesContainer() {
		
		it('classes OLSKDecorGlossary', function () {
			return browser.assert.hasClass(ZDAVitrineInitiativesContainer, 'OLSKDecorGlossary');
		});

		it('sets lang', function () {
			return browser.assert.attribute(ZDAVitrineInitiativesContainer, 'lang', 'en');
		});
	
	});

	initiatives.forEach(function (e, i) {
		
		context(e.ZDAInitiativeURL, function () {
			
			describe('ZDAVitrineInitiativesLink', function test_ZDAVitrineInitiativesLink() {
				
				it('sets href', function () {
					return browser.assert.attribute(`dt:nth-of-type(${ i + 1 }) ${ ZDAVitrineInitiativesLink }`, 'href', e.ZDAInitiativeURL);
				});

				it('sets target', function () {
					return browser.assert.attribute(`dt:nth-of-type(${ i + 1 }) ${ ZDAVitrineInitiativesLink }`, 'target', '_blank');
				});

				it('sets text', function () {
					return browser.assert.text(`dt:nth-of-type(${ i + 1 }) ${ ZDAVitrineInitiativesLink }`, e.ZDAInitiativeName);
				});
			
			});

			describe('ZDAVitrineInitiativesBlurb', function test_ZDAVitrineInitiativesBlurb() {
				
				it('sets text', function () {
					return browser.assert.text(`${ ZDAVitrineInitiativesBlurb }:nth-of-type(${ i + 1 })`, e.ZDAInitiativeBlurb);
				});
			
			});
		
		});

	});

	describe('ROCOGazette', function test_ROCOGazette () {

		it.skip('sets ROCOBulletinProject', function () {
			return browser.assert.attribute('.ROCOBulletinProjectField', 'value', 'Zero Data App');
		});

	});

	describe('OLSKEdit', function test_OLSKEdit () {

		it('sets OLSKEditURL', function () {
			return browser.assert.attribute('.OLSKEdit', 'href', process.env.OLSK_REPO_URL);
		});

	});

	describe('ZDAVitrineEasyIndieCrown', function test_ZDAVitrineEasyIndieCrown() {

		it('classes OLSKCommonCard', function () {
			return browser.assert.hasClass(ZDAVitrineEasyIndieCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCard', function () {
			return browser.assert.hasClass(ZDAVitrineEasyIndieCrown, 'OLSKCommonCrownCard');
		});
		
	});

	describe('ZDAVitrineEasyIndieCrownIcon', function () {

		it('sets role', function () {
			return browser.assert.attribute(ZDAVitrineEasyIndieCrownIcon, 'role', 'presentation');
		});

		it('sets src', function () {
			return browser.assert.attribute(ZDAVitrineEasyIndieCrownIcon, 'src', process.env.ZDA_VITRINE_EASY_INDIE_IDENTITY_URL);
		});

	});

	describe('ZDAVitrineEasyIndieCrownName', function test_ZDAVitrineEasyIndieCrownName () {

		it('sets href', function () {
			return browser.assert.attribute(ZDAVitrineEasyIndieCrownName, 'href', process.env.ZDA_VITRINE_EASY_INDIE_URL);
		});
		
		it('sets text', function () {
			return browser.assert.text(ZDAVitrineEasyIndieCrownName, 'Easy Indie App');
		});
	
	});

});
