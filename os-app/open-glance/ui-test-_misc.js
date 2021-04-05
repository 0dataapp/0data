const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('ZDAGlance_Misc', function () {

	const count = Math.min(2, uRandomInt(10));

	const item = {
		ZDAProjectName: Math.random().toString(),
	};

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			ZDAGlanceListData: JSON.stringify(Array.from(Array(count)).map(function (e, i) {
				return Object.assign(i ? {
					ZDAProjectName: Math.random().toString(),
				} : item, {
					ZDAProjectBlurb: i.toString(),
				});
			})),
		});
	});

	describe('ZDAGlance', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(ZDAGlance, 'OLSKDecor');
		});
	
	});

	describe('ZDAGlanceHeader', function test_ZDAGlanceHeader () {

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(ZDAGlanceHeader, 'OLSKCommonEdgeBottom');
		});

		it('classes OLSKDecorFixedHeader', function () {
			browser.assert.hasClass(ZDAGlanceHeader, 'OLSKDecorFixedHeader');
		});
	
	});

	describe('ZDAGlanceFilterInput', function test_ZDAGlanceFilterInput () {

		it('sets accesskey', function () {
			browser.assert.attribute(ZDAGlanceFilterInput, 'accesskey', 'f');
		});

		context('input', function () {
			
			before(function () {
				browser.assert.elements('.ZDAGlanceListItem', count);
			});

			before(function () {
				browser.fill(ZDAGlanceFilterInput, item.ZDAProjectName);
			});

			it('filters list', function () {
				browser.assert.elements('.ZDAGlanceListItem', 1);
			});
		
		});

		context('Escape', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('filters list', function () {
				browser.assert.elements('.ZDAGlanceListItem', count);
			});

			it('sets filter text', function () {
				browser.assert.text(ZDAGlanceFilterInput, '');
			});
		
		});
	
	});

	describe('ZDAGlanceProjectsCompilationLink', function test_ZDAGlanceProjectsCompilationLink () {
		
		it('sets href', function () {
			browser.assert.attribute(ZDAGlanceProjectsCompilationLink, 'href', require('./controller.js').OLSKControllerRoutes().pop().OLSKRoutePath);
		});

		it('sets text', function () {
			browser.assert.text(ZDAGlanceProjectsCompilationLink, 'JSON');
		});
	
	});

	describe('ZDAGlanceListSort', function test_ZDAGlanceListSort () {

		before(function () {
			browser.assert.text('.ZDAGlanceListItem:first-of-type .ZDAGlanceListItemBlurb', '0');
		});

		before(function () {
			return browser.click('.ZDAGlanceListHeadBlurb');
		});

		it.skip('sorts list', function () {
			browser.assert.text('.ZDAGlanceListItem:first-of-type .ZDAGlanceListItemBlurb', count);
		});
	
	});

});
