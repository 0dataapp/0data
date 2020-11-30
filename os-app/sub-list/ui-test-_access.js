const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	ZDAVitrineList: '.ZDAVitrineList',
	
	ZDAVitrineListEmpty: '.ZDAVitrineListEmpty',

	ZDAVitrineListItem: '.ZDAVitrineListItem',
	
	ZDAVitrineListItemName: '.ZDAVitrineListItemName',
	ZDAVitrineListItemBlurb: '.ZDAVitrineListItemBlurb',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('ZDAVitrineList_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows ZDAVitrineList', function() {
		browser.assert.elements(ZDAVitrineList, 1);
	});

	it('shows ZDAVitrineListEmpty', function () {
		browser.assert.elements(ZDAVitrineListEmpty, 1);
	});

	it('hides ZDAVitrineListItem', function () {
		browser.assert.elements(ZDAVitrineListItem, 0);
	});

	context('ZDAVitrineListData', function () {

		const count = Math.max(1, Date.now() % 10);

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				ZDAVitrineListData: JSON.stringify(Array.from(Array(count)).map(function (e) {
					return {};
				})),
			});
		});

		it('hides ZDAVitrineListEmpty', function () {
			browser.assert.elements(ZDAVitrineListEmpty, 0);
		});

		it('shows ZDAVitrineListItem', function () {
			browser.assert.elements(ZDAVitrineListItem, count);
		});

	});

});
