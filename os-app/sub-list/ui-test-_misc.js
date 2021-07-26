const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const ZDABank = require('../_shared/ZDABank/main.js');

describe('ZDAGlanceList_Misc', function  () {

	const item = {
		ZDAProjectName: Math.random().toString(),
		ZDAProjectBlurb: Math.random().toString(),
		ZDAProjectURL: Math.random().toString(),
		ZDAProjectIconURL: Math.random().toString(),
		_ZDAProjectIconURLCachedPath: uRandomElement(undefined, Math.random().toString()),
		ZDAProjectBanks: Object.fromEntries(Object.entries(ZDABank.ZDABankProtocolProperties()).filter(function () {
			return uRandomElement(true, false);
		})),
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
			browser.assert.attribute(ZDAGlanceListItemRemoteStorage, 'checked', item.ZDAProjectBanks.ZDABankRemoteStorage ? '' : null);
		});

		it('sets data-boolean', function () {
			browser.assert.attribute(ZDAGlanceListItemRemoteStorage, 'data-boolean', item.ZDAProjectBanks.ZDABankRemoteStorage ? '0' : '1');
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
			browser.assert.attribute(ZDAGlanceListItemFission, 'checked', item.ZDAProjectBanks.ZDABankFission ? '' : null);
		});

		it('sets data-boolean', function () {
			browser.assert.attribute(ZDAGlanceListItemRemoteStorage, 'data-boolean', item.ZDAProjectBanks.ZDABankFission ? '0' : '1');
		});

	});

	describe('ZDAGlanceListItemSolidProject', function test_ZDAGlanceListItemSolidProject () {

		it('sets type', function () {
			browser.assert.attribute(ZDAGlanceListItemSolidProject, 'type', 'checkbox');
		});

		it('sets disabled', function () {
			browser.assert.attribute(ZDAGlanceListItemSolidProject, 'disabled', '');
		});

		it('sets checked', function () {
			browser.assert.attribute(ZDAGlanceListItemSolidProject, 'checked', item.ZDAProjectBanks.ZDABankSolidProject ? '' : null);
		});

		it('sets data-boolean', function () {
			browser.assert.attribute(ZDAGlanceListItemRemoteStorage, 'data-boolean', item.ZDAProjectBanks.ZDABankSolidProject ? '0' : '1');
		});

	});

});
