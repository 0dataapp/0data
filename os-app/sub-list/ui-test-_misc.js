const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('ZDAVitrineList_Misc', function  () {

	const item = {
		ZDAProjectName: Math.random().toString(),
		ZDAProjectBlurb: Math.random().toString(),
		ZDAProjectURL: Math.random().toString(),
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			ZDAVitrineListData: JSON.stringify([item]),
		});
	});

	describe('ZDAVitrineListTableRowName', function test_ZDAVitrineListTableRowName () {

		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineListTableRowName, 'href', item.ZDAProjectURL);
		});

		it('binds ZDAProjectName', function () {
			browser.assert.text(ZDAVitrineListTableRowName, item.ZDAProjectName);
		});

	});

	describe('ZDAVitrineListTableRowBlurb', function test_ZDAVitrineListTableRowBlurb () {

		it('binds ZDAProjectBlurb', function () {
			browser.assert.text(ZDAVitrineListTableRowBlurb, item.ZDAProjectBlurb);
		});

	});

});
