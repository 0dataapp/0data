const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('ZDAGlance_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath, {
			ZDAGlanceListData: JSON.stringify(Array.from(Array(uRandomInt())).map(function (e) {
				return {};
			})),
		});
	});

	describe('ZDAGlance', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(ZDAGlance, 'OLSKDecor');
		});
	
	});

	describe('ZDAGlanceProjectsCompilationLink', function test_ZDAGlanceProjectsCompilationLink () {
		
		it('sets href', function () {
			browser.assert.attribute(ZDAGlanceProjectsCompilationLink, 'href', require('./controller.js').OLSKControllerRoutes().pop().OLSKRoutePath);
		});
	
	});

});
