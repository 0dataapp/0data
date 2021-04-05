const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('ZDAGlanceList_Misc', function  () {

	const item = {
		ZDAProjectName: Math.random().toString(),
		ZDAProjectBlurb: Math.random().toString(),
		ZDAProjectURL: Math.random().toString(),
		ZDAProjectIconURL: Math.random().toString(),
		_ZDAProjectIconURLCachedPath: uRandomElement(undefined, Math.random().toString()),
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			ZDAGlanceListData: JSON.stringify([item]),
		});
	});

	describe('ZDAGlanceList', function test_ZDAGlanceList () {

		it('sets lang', function () {
			browser.assert.attribute(ZDAGlanceList, 'lang', 'en');
		});

	});

	describe('ZDAGlanceListHead', function test_ZDAGlanceListHead () {

		it('classes OLSKStickyHeader', function () {
			browser.assert.hasClass(ZDAGlanceListHead, 'OLSKStickyHeader');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(ZDAGlanceListHead, 'OLSKCommonEdgeBottom');
		});
	
	});

	describe('ZDAGlanceListItemIcon', function test_ZDAGlanceListItemIcon () {

		it('sets href', function () {
			browser.assert.attribute(ZDAGlanceListItemIcon, 'href', item.ZDAProjectURL);
		});

		it('sets aria-hidden', function () {
			browser.assert.attribute(ZDAGlanceListItemIcon, 'aria-hidden', 'true');
		});

	});

	describe('ZDAGlanceListItemIconImage', function test_ZDAGlanceListItemIconImage () {

		it('sets src', function () {
			browser.assert.attribute(ZDAGlanceListItemIconImage, 'src', item._ZDAProjectIconURLCachedPath || item.ZDAProjectIconURL);
		});

	});

	describe('ZDAGlanceListItemName', function test_ZDAGlanceListItemName () {

		it('sets href', function () {
			browser.assert.attribute(ZDAGlanceListItemName, 'href', item.ZDAProjectURL);
		});

		it('sets target', function () {
			browser.assert.attribute(ZDAGlanceListItemName, 'target', '_blank');
		});

		it('binds ZDAProjectName', function () {
			browser.assert.text(ZDAGlanceListItemName, item.ZDAProjectName);
		});

	});

	describe('ZDAGlanceListItemBlurb', function test_ZDAGlanceListItemBlurb () {

		it('binds ZDAProjectBlurb', function () {
			browser.assert.text(ZDAGlanceListItemBlurb, item.ZDAProjectBlurb);
		});

	});

});
