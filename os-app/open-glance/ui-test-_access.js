const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	ZDAGlance: '.ZDAGlance',

	ZDAGlanceHeader: '.ZDAGlanceHeader',

	ZDAGlanceRootLink: '.ZDAGlanceRootLink',
	ZDAGlanceRootLinkImage: '.ZDAGlanceRootLinkImage',

	ZDAGlanceFilterInput: '.ZDAGlanceFilterInput',
	
	ZDAGlanceProjectsCompilationLink: '.ZDAGlanceProjectsCompilationLink',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('ZDAGlance_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows ZDAGlance', function() {
		browser.assert.elements(ZDAGlance, 1);
	});

	it('shows ZDAGlanceHeader', function () {
		browser.assert.elements(ZDAGlanceHeader, 1);
	});

	it('shows ZDAGlanceRootLink', function () {
		browser.assert.elements(ZDAGlanceRootLink, 1);
	});

	it('shows ZDAGlanceRootLinkImage', function () {
		browser.assert.elements(ZDAGlanceRootLinkImage, 1);
	});

	it('shows ZDAGlanceFilterInput', function () {
		browser.assert.elements(ZDAGlanceFilterInput, 1);
	});

	it('shows ZDAGlanceProjectsCompilationLink', function () {
		browser.assert.elements(ZDAGlanceProjectsCompilationLink, 1);
	});

});
