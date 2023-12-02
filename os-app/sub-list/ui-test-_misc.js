const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const ZDABank = require('../_shared/ZDABank/main.js');

describe('ZDAGlanceList_Misc', function  () {

	const item = {
		ZDAProjectName: Math.random().toString(),
		ZDAProjectBlurb: Math.random().toString(),
		ZDAProjectURL: Math.random().toString(),
		ZDAProjectIconURL: uRandomElement(undefined, Math.random().toString()),
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
			return browser.assert.attribute(ZDAGlanceList, 'lang', 'en');
		});

	});

	describe('ZDAGlanceListItem', function test_ZDAGlanceListItem () {

		it('classes OLSKCommonCard', function () {
			return browser.assert.hasClass(ZDAGlanceListItem, 'OLSKCommonCard');
		});

		it('sets data-protocols', function () {
			return browser.assert.attribute('.ZDAGlanceListItem', 'data-protocols', Object.values(item.ZDAProjectBanks).filter(function (e) {
				return e.ZDABankProtocol;
			}).map(function (e) {
				return e.ZDABankProtocol.ZDAProtocolName;
			}).join(', '));
		});

	});

	describe('ZDAGlanceListItemIcon', function test_ZDAGlanceListItemIcon () {

		it('sets href', function () {
			return browser.assert.attribute(ZDAGlanceListItemIcon, 'href', item.ZDAProjectURL);
		});

		it('sets aria-hidden', function () {
			return browser.assert.attribute(ZDAGlanceListItemIcon, 'aria-hidden', 'true');
		});

		it('sets tabindex', function () {
			return browser.assert.attribute(ZDAGlanceListItemIcon, 'tabindex', '-1');
		});

	});

	describe('ZDAGlanceListItemIconImage', function test_ZDAGlanceListItemIconImage () {

		it('sets src', function () {
			return browser.assert.attribute(ZDAGlanceListItemIconImage, 'src', item._ZDAProjectIconURLCachedPath || item.ZDAProjectIconURL || '/_shared/__external/OLSKUIAssets/_OLSKSharedIconPlaceholder.svg');
		});

	});

	describe('ZDAGlanceListItemName', function test_ZDAGlanceListItemName () {

		it('sets href', function () {
			return browser.assert.attribute(ZDAGlanceListItemName, 'href', item.ZDAProjectURL);
		});

		it('sets target', function () {
			return browser.assert.attribute(ZDAGlanceListItemName, 'target', '_blank');
		});

		it('binds ZDAProjectName', function () {
			return browser.assert.text(ZDAGlanceListItemName, item.ZDAProjectName);
		});

	});

	describe('ZDAGlanceListItemBlurb', function test_ZDAGlanceListItemBlurb () {

		it('binds ZDAProjectBlurb', function () {
			return browser.assert.text(ZDAGlanceListItemBlurb, item.ZDAProjectBlurb);
		});

	});

});
