const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	ZDAVitrineList: '.ZDAVitrineList',
	
	ZDAVitrineListEmpty: '.ZDAVitrineListEmpty',

	ZDAVitrineListTable: '.ZDAVitrineListTable',

	ZDAVitrineListTableHeadingName: '.ZDAVitrineListTableHeadingName',
	ZDAVitrineListTableHeadingBlurb: '.ZDAVitrineListTableHeadingBlurb',
	ZDAVitrineListTableHeadingWebsite: '.ZDAVitrineListTableHeadingWebsite',

	ZDAVitrineListTableRow: '.ZDAVitrineListTableRow',
	
	ZDAVitrineListTableRowName: '.ZDAVitrineListTableRowName',
	ZDAVitrineListTableRowBlurb: '.ZDAVitrineListTableRowBlurb',
	ZDAVitrineListTableRowWebsite: '.ZDAVitrineListTableRowWebsite',
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

	it('hides ZDAVitrineListTable', function () {
		browser.assert.elements(ZDAVitrineListTable, 0);
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

		it('shows ZDAVitrineListTable', function () {
			browser.assert.elements(ZDAVitrineListTable, 1);
		});

		it('shows ZDAVitrineListTableHeadingName', function () {
			browser.assert.elements(ZDAVitrineListTableHeadingName, 1);
		});

		it('shows ZDAVitrineListTableHeadingBlurb', function () {
			browser.assert.elements(ZDAVitrineListTableHeadingBlurb, 1);
		});

		it('shows ZDAVitrineListTableHeadingWebsite', function () {
			browser.assert.elements(ZDAVitrineListTableHeadingWebsite, 1);
		});

		it('shows ZDAVitrineListTableRow', function () {
			browser.assert.elements(ZDAVitrineListTableRow, count);
		});

	});

});
