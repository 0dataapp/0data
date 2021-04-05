const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	ZDAGlanceList: '.ZDAGlanceList',
	
	ZDAGlanceListEmpty: '.ZDAGlanceListEmpty',

	ZDAGlanceListHead: '.ZDAGlanceListHead',
	ZDAGlanceListHeadName: '.ZDAGlanceListHeadName',
	ZDAGlanceListHeadBlurb: '.ZDAGlanceListHeadBlurb',
	ZDAGlanceListHeadRemoteStorage: '.ZDAGlanceListHeadRemoteStorage',
	ZDAGlanceListHeadFission: '.ZDAGlanceListHeadFission',
	ZDAGlanceListHeadSOLID: '.ZDAGlanceListHeadSOLID',

	ZDAGlanceListItem: '.ZDAGlanceListItem',
	
	ZDAGlanceListItemIcon: '.ZDAGlanceListItemIcon',
	ZDAGlanceListItemIconImage: '.ZDAGlanceListItemIconImage',
	ZDAGlanceListItemName: '.ZDAGlanceListItemName',
	ZDAGlanceListItemBlurb: '.ZDAGlanceListItemBlurb',
	ZDAGlanceListItemRemoteStorage: '.ZDAGlanceListItemRemoteStorage',
	ZDAGlanceListItemFission: '.ZDAGlanceListItemFission',
	ZDAGlanceListItemSOLID: '.ZDAGlanceListItemSOLID',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('ZDAGlanceList_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows ZDAGlanceList', function() {
		browser.assert.elements(ZDAGlanceList, 1);
	});

	it('shows ZDAGlanceListEmpty', function () {
		browser.assert.elements(ZDAGlanceListEmpty, 1);
	});

	it('hides ZDAGlanceListHead', function () {
		browser.assert.elements(ZDAGlanceListHead, 0);
	});

	it('hides ZDAGlanceListItem', function () {
		browser.assert.elements(ZDAGlanceListItem, 0);
	});

	context('ZDAGlanceListData', function () {

		const count = Math.max(1, Date.now() % 10);

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				ZDAGlanceListData: JSON.stringify(Array.from(Array(count)).map(function (e) {
					return {};
				})),
			});
		});

		it('hides ZDAGlanceListEmpty', function () {
			browser.assert.elements(ZDAGlanceListEmpty, 0);
		});

		it('shows ZDAGlanceListHead', function () {
			browser.assert.elements(ZDAGlanceListHead, 1);
		});

		it('shows ZDAGlanceListHeadName', function () {
			browser.assert.elements(ZDAGlanceListHeadName, 1);
		});

		it('shows ZDAGlanceListHeadBlurb', function () {
			browser.assert.elements(ZDAGlanceListHeadBlurb, 1);
		});

		it('shows ZDAGlanceListHeadRemoteStorage', function () {
			browser.assert.elements(ZDAGlanceListHeadRemoteStorage, 1);
		});

		it('shows ZDAGlanceListHeadFission', function () {
			browser.assert.elements(ZDAGlanceListHeadFission, 1);
		});

		it('shows ZDAGlanceListHeadSOLID', function () {
			browser.assert.elements(ZDAGlanceListHeadSOLID, 1);
		});

		it('shows ZDAGlanceListItem', function () {
			browser.assert.elements(ZDAGlanceListItem, count);
		});

		it('hides ZDAGlanceListItemIcon', function () {
			browser.assert.elements(ZDAGlanceListItemIcon, 0);
		});

		it('shows ZDAGlanceListItemName', function () {
			browser.assert.elements(ZDAGlanceListItemName, count);
		});

		it('shows ZDAGlanceListItemBlurb', function () {
			browser.assert.elements(ZDAGlanceListItemBlurb, count);
		});

		it('shows ZDAGlanceListItemRemoteStorage', function () {
			browser.assert.elements(ZDAGlanceListItemRemoteStorage, count);
		});

		it('shows ZDAGlanceListItemFission', function () {
			browser.assert.elements(ZDAGlanceListItemFission, count);
		});

		it('shows ZDAGlanceListItemSOLID', function () {
			browser.assert.elements(ZDAGlanceListItemSOLID, count);
		});

		context('ZDAProjectIconURL', function () {
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					ZDAGlanceListData: JSON.stringify(Array.from(Array(count)).map(function (e) {
						return {
							ZDAProjectIconURL: Math.random().toString(),
						};
					})),
				});
			});

			it('shows ZDAGlanceListItemIcon', function () {
				browser.assert.elements(ZDAGlanceListItemIcon, count);
			});

			it('shows ZDAGlanceListItemIconImage', function () {
				browser.assert.elements(ZDAGlanceListItemIconImage, count);
			});

		});

	});

});
