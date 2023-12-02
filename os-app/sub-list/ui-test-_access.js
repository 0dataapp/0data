const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	ZDAGlanceList: '.ZDAGlanceList',
	
	ZDAGlanceListEmpty: '.ZDAGlanceListEmpty',

	ZDAGlanceListItem: '.ZDAGlanceListItem',
	
	ZDAGlanceListItemIcon: '.ZDAGlanceListItemIcon',
	ZDAGlanceListItemIconImage: '.ZDAGlanceListItemIconImage',
	ZDAGlanceListItemName: '.ZDAGlanceListItemName',
	ZDAGlanceListItemBlurb: '.ZDAGlanceListItemBlurb',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('ZDAGlanceList_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows ZDAGlanceList', function() {
		return browser.assert.elements(ZDAGlanceList, 1);
	});

	it('shows ZDAGlanceListEmpty', function () {
		return browser.assert.elements(ZDAGlanceListEmpty, 1);
	});

	it('hides ZDAGlanceListItem', function () {
		return browser.assert.elements(ZDAGlanceListItem, 0);
	});

	context('ZDAGlanceListData', function () {

		const count = Math.max(1, Date.now() % 10);

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				ZDAGlanceListData: JSON.stringify(Array.from(Array(count)).map(function (e) {
					return {
						ZDAProjectBanks: {},
					};
				})),
			});
		});

		it('hides ZDAGlanceListEmpty', function () {
			return browser.assert.elements(ZDAGlanceListEmpty, 0);
		});

		it('shows ZDAGlanceListItem', function () {
			return browser.assert.elements(ZDAGlanceListItem, count);
		});

		it('shows ZDAGlanceListItemIcon', function () {
			return browser.assert.elements(ZDAGlanceListItemIcon, count);
		});

		it('shows ZDAGlanceListItemIconImage', function () {
			return browser.assert.elements(ZDAGlanceListItemIconImage, count);
		});

		it('shows ZDAGlanceListItemName', function () {
			return browser.assert.elements(ZDAGlanceListItemName, count);
		});

		it('shows ZDAGlanceListItemBlurb', function () {
			return browser.assert.elements(ZDAGlanceListItemBlurb, count);
		});

	});

});
