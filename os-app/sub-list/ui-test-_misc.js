const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('ZDAVitrineList_Misc', function  () {

	const item = {
		ZDAProjectName: Math.random().toString(),
		ZDAProjectBlurb: Math.random().toString(),
		ZDAProjectURL: Math.random().toString(),
		ZDAProjectIconURL: Math.random().toString(),
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			ZDAVitrineListData: JSON.stringify([item]),
		});
	});

	describe('ZDAVitrineListItem', function test_ZDAVitrineListItem () {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(ZDAVitrineListItem, 'OLSKCommonCard');
		});

	});

	describe('ZDAVitrineListItemIconImage', function test_ZDAVitrineListItemIconImage () {

		it('sets src', function () {
			browser.assert.attribute(ZDAVitrineListItemIconImage, 'src', item.ZDAProjectIconURL);
		});

		it('sets role', function () {
			browser.assert.attribute(ZDAVitrineListItemIconImage, 'role', 'presentation');
		});

	});

	describe('ZDAVitrineListItemName', function test_ZDAVitrineListItemName () {

		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineListItemName, 'href', item.ZDAProjectURL);
		});

		it('sets target', function () {
			browser.assert.attribute(ZDAVitrineListItemName, 'target', '_blank');
		});

		it('binds ZDAProjectName', function () {
			browser.assert.text(ZDAVitrineListItemName, item.ZDAProjectName);
		});

	});

	describe('ZDAVitrineListItemBlurb', function test_ZDAVitrineListItemBlurb () {

		it('binds ZDAProjectBlurb', function () {
			browser.assert.text(ZDAVitrineListItemBlurb, item.ZDAProjectBlurb);
		});

	});

});
