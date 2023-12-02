const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	ZDAGlance: '.ZDAGlance',

	ZDAGlanceHeader: '.ZDAGlanceHeader',
	ZDAGlanceHeaderOne: '.ZDAGlanceHeaderOne',
	ZDAGlanceHeaderTwo: '.ZDAGlanceHeaderTwo',

	ZDAGlanceRootLink: '.ZDAGlanceRootLink',
	ZDAGlanceRootLinkImage: '.ZDAGlanceRootLinkImage',

	ZDAGlanceFilterInput: '.ZDAGlanceFilterInput',
	
	ZDAGlanceProjectsCompilationLink: '.ZDAGlanceProjectsCompilationLink',
	
	ZDAGlanceProtocolButton: '.ZDAGlanceProtocolButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('ZDAGlance_Access', function () {

	const count = uRandomInt(10);

	const banks = Array.from(Array(count + 1)).map(function () {
		return [Math.random().toString(), {
			ZDABankProtocol: {
				ZDAProtocolName: Math.random().toString()
			},
		}];
	});

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			ZDAGlanceListData: JSON.stringify(Array.from(Array(uRandomInt(10))).map(function (e, i) {
				return {
					ZDAProjectName: Math.random().toString(),
					ZDAProjectBanks: Object.fromEntries(banks.slice(1)),
				};
			})),
		});
	});
	
	it('shows ZDAGlance', function() {
		return browser.assert.elements(ZDAGlance, 1);
	});

	it('shows ZDAGlanceHeader', function () {
		return browser.assert.elements(ZDAGlanceHeader, 1);
	});

	it('shows ZDAGlanceHeaderOne', function () {
		return browser.assert.elements(ZDAGlanceHeaderOne, 1);
	});

	it('shows ZDAGlanceHeaderTwo', function () {
		return browser.assert.elements(ZDAGlanceHeaderTwo, 1);
	});

	it('shows ZDAGlanceRootLink', function () {
		return browser.assert.elements(ZDAGlanceRootLink, 1);
	});

	it('shows ZDAGlanceRootLinkImage', function () {
		return browser.assert.elements(ZDAGlanceRootLinkImage, 1);
	});

	it('shows ZDAGlanceFilterInput', function () {
		return browser.assert.elements(ZDAGlanceFilterInput, 1);
	});

	it('shows ZDAGlanceProjectsCompilationLink', function () {
		return browser.assert.elements(ZDAGlanceProjectsCompilationLink, 1);
	});

	it('shows ZDAGlanceProtocolButton', function () {
		return browser.assert.elements(ZDAGlanceProtocolButton, count);
	});

});
