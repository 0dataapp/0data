const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('ZDAGlance_Misc', function () {

	const count = Math.min(2, uRandomInt(10));

	const item = {
		ZDAProjectName: Math.random().toString(),
	};

	const banks = Array.from(Array(uRandomInt(3))).map(function () {
		return [Math.random().toString(), {
			ZDABankProtocol: {
				ZDAProtocolName: Math.random().toString()
			},
		}];
	});

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			ZDAGlanceListData: JSON.stringify(Array.from(Array(count)).map(function (e, i) {
				return Object.assign(i ? {
					ZDAProjectName: Math.random().toString(),
				} : item, {
					ZDAProjectBlurb: i.toString(),
				}, {
					ZDAProjectBanks: Object.fromEntries(banks),
				});
			})),
		});
	});

	it('sets meta:viewport', function () {
		return browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	});

	describe('ZDAGlance', function () {
		
		it('classes OLSKDecor', function () {
			return browser.assert.hasClass(ZDAGlance, 'OLSKDecor');
		});
	
	});

	describe('ZDAGlanceHeader', function test_ZDAGlanceHeader () {

		it('classes OLSKDecorFixedHeader', function () {
			return browser.assert.hasClass(ZDAGlanceHeader, 'OLSKDecorFixedHeader');
		});
	
	});

	describe('ZDAGlanceHeaderOne', function test_ZDAGlanceHeaderOne () {

		it('classes OLSKCommonEdgeBottom', function () {
			return browser.assert.hasClass(ZDAGlanceHeaderOne, 'OLSKCommonEdgeBottom');
		});
	
	});

	describe('ZDAGlanceHeaderTwo', function test_ZDAGlanceHeaderTwo () {

		it('classes OLSKCommonEdgeBottom', function () {
			return browser.assert.hasClass(ZDAGlanceHeaderTwo, 'OLSKCommonEdgeBottom');
		});

		it('classes OLSKDecorFormBlend', function () {
			return browser.assert.hasClass(ZDAGlanceHeaderTwo, 'OLSKDecorFormBlend');
		});
	
	});

	describe('ZDAGlanceRootLink', function test_ZDAGlanceRootLink () {

		it('sets href', function () {
			return browser.assert.attribute(ZDAGlanceRootLink, 'href', require('../open-vitrine/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
		});
	
	});

	describe('ZDAGlanceRootLinkImage', function test_ZDAGlanceRootLinkImage () {

		it('sets src', function () {
			return browser.assert.attribute(ZDAGlanceRootLinkImage, 'src', process.env.ZDA_VITRINE_IDENTITY_URL);
		});
	
	});

	describe('ZDAGlanceFilterInput', function test_ZDAGlanceFilterInput () {

		it('sets type', function () {
			return browser.assert.attribute(ZDAGlanceFilterInput, 'type', 'search');
		});

		it('sets accesskey', function () {
			return browser.assert.attribute(ZDAGlanceFilterInput, 'accesskey', 'f');
		});

		it('classes OLSKDecorInput', function () {
			return browser.assert.hasClass(ZDAGlanceFilterInput, 'OLSKDecorInput');
		});

		context('input', function () {
			
			before(function () {
				return browser.assert.elements('.ZDAGlanceListItem', count);
			});

			before(function () {
				browser.fill(ZDAGlanceFilterInput, item.ZDAProjectName);
			});

			it.skip('filters list', function () {
				return browser.assert.elements('.ZDAGlanceListItem', 1);
			});
		
		});

		context('Escape', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('filters list', function () {
				return browser.assert.elements('.ZDAGlanceListItem', count);
			});

			it('sets filter text', function () {
				return browser.assert.text(ZDAGlanceFilterInput, '');
			});
		
		});
	
	});

	describe('ZDAGlanceProjectsCompilationLink', function test_ZDAGlanceProjectsCompilationLink () {
		
		it('sets href', function () {
			return browser.assert.attribute(ZDAGlanceProjectsCompilationLink, 'href', require('../api-projects/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
		});

		it('sets text', function () {
			return browser.assert.text(ZDAGlanceProjectsCompilationLink, 'JSON');
		});
	
	});

	banks.forEach(function (e, i) {

		let text = '';

		describe('ZDAGlanceProtocolButton', function test_ZDAGlanceProtocolButton () {

			const selector = `.ZDAGlanceProtocolButton:nth-child(${ i + 1 })`;
			
			it('binds ZDAProtocolName', function () {
				return browser.assert.text(selector, e[1].ZDABankProtocol.ZDAProtocolName);
			});

			context.skip('click', function () {
				
				before(function () {
					return browser.assert.input(ZDAGlanceFilterInput, text);
				});

				before(function () {
					browser.pressButton(selector, item.ZDAProjectName);
				});

				it('sets ZDAGlanceFilterInput text', function () {
					return browser.assert.input(ZDAGlanceFilterInput, e[1].ZDABankProtocol.ZDAProtocolName);
				});
			
			});
		
		});

	});

});
