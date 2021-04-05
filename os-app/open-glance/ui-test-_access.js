const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	ZDAGlance: '.ZDAGlance',
	
	ZDAGlanceProjectsCompilationLink: '.ZDAGlanceProjectsCompilationLink',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('ZDAGlance_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows ZDAGlance', function() {
		browser.assert.elements(ZDAGlance, 1);
	});

	it('shows ZDAGlanceProjectsCompilationLink', function () {
		browser.assert.elements(ZDAGlanceProjectsCompilationLink, 1);
	});

});
