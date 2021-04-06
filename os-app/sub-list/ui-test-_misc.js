const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('ZDAGlanceList_Misc', function  () {

	const item = {
		ZDAProjectName: Math.random().toString(),
		ZDAProjectBlurb: Math.random().toString(),
		ZDAProjectURL: Math.random().toString(),
		ZDAProjectIconURL: Math.random().toString(),
		_ZDAProjectIconURLCachedPath: uRandomElement(undefined, Math.random().toString()),
		_ZDAProjectSupportsRemoteStorage: uRandomElement(true, false),
		_ZDAProjectSupportsFission: uRandomElement(true, false),
		_ZDAProjectSupportsSOLID: uRandomElement(true, false),
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

	describe('ZDAGlanceListHeadName', function test_ZDAGlanceListHeadName () {

		it('classes ZDAGlanceListSort', function () {
			browser.assert.hasClass(ZDAGlanceListHeadName, 'ZDAGlanceListSort');
		});

		it('sets data-sort', function () {
			browser.assert.attribute(ZDAGlanceListHeadName, 'data-sort', 'ZDAGlanceListItemName')
		});

	});

	describe('ZDAGlanceListHeadBlurb', function test_ZDAGlanceListHeadBlurb () {

		it('classes ZDAGlanceListSort', function () {
			browser.assert.hasClass(ZDAGlanceListHeadBlurb, 'ZDAGlanceListSort');
		});

		it('sets data-sort', function () {
			browser.assert.attribute(ZDAGlanceListHeadBlurb, 'data-sort', 'ZDAGlanceListItemBlurb')
		});

	});

	describe('ZDAGlanceListHeadRemoteStorage', function test_ZDAGlanceListHeadRemoteStorage () {

		it('sets text', function () {
			browser.assert.text(ZDAGlanceListHeadRemoteStorage, 'remoteStorage');
		});

		it('classes ZDAGlanceListSort', function () {
			browser.assert.hasClass(ZDAGlanceListHeadRemoteStorage, 'ZDAGlanceListSort');
		});

		it('sets data-sort', function () {
			browser.assert.attribute(ZDAGlanceListHeadRemoteStorage, 'data-sort', 'ZDAGlanceListItemRemoteStorage')
		});

	});

	describe('ZDAGlanceListHeadFission', function test_ZDAGlanceListHeadFission () {

		it('sets text', function () {
			browser.assert.text(ZDAGlanceListHeadFission, 'Fission');
		});

		it('classes ZDAGlanceListSort', function () {
			browser.assert.hasClass(ZDAGlanceListHeadFission, 'ZDAGlanceListSort');
		});

		it('sets data-sort', function () {
			browser.assert.attribute(ZDAGlanceListHeadFission, 'data-sort', 'ZDAGlanceListItemFission')
		});

	});

	describe('ZDAGlanceListHeadSOLID', function test_ZDAGlanceListHeadSOLID () {

		it('sets text', function () {
			browser.assert.text(ZDAGlanceListHeadSOLID, 'SOLID');
		});

		it('classes ZDAGlanceListSort', function () {
			browser.assert.hasClass(ZDAGlanceListHeadSOLID, 'ZDAGlanceListSort');
		});

		it('sets data-sort', function () {
			browser.assert.attribute(ZDAGlanceListHeadSOLID, 'data-sort', 'ZDAGlanceListItemSOLID')
		});

	});

	describe('ZDAGlanceListItemIcon', function test_ZDAGlanceListItemIcon () {

		it('sets href', function () {
			browser.assert.attribute(ZDAGlanceListItemIcon, 'href', item.ZDAProjectURL);
		});

		it('sets aria-hidden', function () {
			browser.assert.attribute(ZDAGlanceListItemIcon, 'aria-hidden', 'true');
		});

		it('sets tabindex', function () {
			browser.assert.attribute(ZDAGlanceListItemIcon, 'tabindex', '-1');
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

	describe('ZDAGlanceListItemRemoteStorage', function test_ZDAGlanceListItemRemoteStorage () {

		it('sets type', function () {
			browser.assert.attribute(ZDAGlanceListItemRemoteStorage, 'type', 'checkbox');
		});

		it('sets disabled', function () {
			browser.assert.attribute(ZDAGlanceListItemRemoteStorage, 'disabled', '');
		});

		it('sets checked', function () {
			browser.assert.attribute(ZDAGlanceListItemRemoteStorage, 'checked', item._ZDAProjectSupportsRemoteStorage ? '' : null);
		});

		it('sets data-boolean', function () {
			browser.assert.attribute(ZDAGlanceListItemRemoteStorage, 'data-boolean', item._ZDAProjectSupportsRemoteStorage ? '0' : '1');
		});

	});

	describe('ZDAGlanceListItemFission', function test_ZDAGlanceListItemFission () {

		it('sets type', function () {
			browser.assert.attribute(ZDAGlanceListItemFission, 'type', 'checkbox');
		});

		it('sets disabled', function () {
			browser.assert.attribute(ZDAGlanceListItemFission, 'disabled', '');
		});

		it('sets checked', function () {
			browser.assert.attribute(ZDAGlanceListItemFission, 'checked', item._ZDAProjectSupportsFission ? '' : null);
		});

		it('sets data-boolean', function () {
			browser.assert.attribute(ZDAGlanceListItemRemoteStorage, 'data-boolean', item._ZDAProjectSupportsFission ? '0' : '1');
		});

	});

	describe('ZDAGlanceListItemSOLID', function test_ZDAGlanceListItemSOLID () {

		it('sets type', function () {
			browser.assert.attribute(ZDAGlanceListItemSOLID, 'type', 'checkbox');
		});

		it('sets disabled', function () {
			browser.assert.attribute(ZDAGlanceListItemSOLID, 'disabled', '');
		});

		it('sets checked', function () {
			browser.assert.attribute(ZDAGlanceListItemSOLID, 'checked', item._ZDAProjectSupportsSOLID ? '' : null);
		});

		it('sets data-boolean', function () {
			browser.assert.attribute(ZDAGlanceListItemRemoteStorage, 'data-boolean', item._ZDAProjectSupportsSOLID ? '0' : '1');
		});

	});

});
