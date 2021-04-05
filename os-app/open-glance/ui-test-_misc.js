const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('ZDAGlance_Misc', function () {

	const count = Math.min(2, uRandomInt(10));

	const item = {
		ZDAProjectName: Math.random().toString(),
	};

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			ZDAGlanceListData: JSON.stringify(Array.from(Array(count)).map(function (e, i) {
				return i ? {
					ZDAProjectName: Math.random().toString(),
				} : item;
			})),
		});
	});

	describe('ZDAGlance', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(ZDAGlance, 'OLSKDecor');
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
				return browser.fill(ZDAGlanceFilterInput, item.ZDAProjectName);
			});

			it('filters list', function () {
				browser.assert.elements('.ZDAGlanceListItem', 1);
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

});
