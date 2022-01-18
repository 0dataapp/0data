const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	ZDAVitrineEventsList: '.ZDAVitrineEventsList',
	
	ZDAVitrineEventsListEmpty: '.ZDAVitrineEventsListEmpty',

	ZDAVitrineEventsListItem: '.ZDAVitrineEventsListItem',
	
	ZDAVitrineEventsListItemStart: '.ZDAVitrineEventsListItemStart',
	ZDAVitrineEventsListItemLink: '.ZDAVitrineEventsListItemLink',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('ZDAVitrineEventsList_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows ZDAVitrineEventsList', function() {
		browser.assert.elements(ZDAVitrineEventsList, 1);
	});

	it('shows ZDAVitrineEventsListEmpty', function () {
		browser.assert.elements(ZDAVitrineEventsListEmpty, 1);
	});

	it('hides ZDAVitrineEventsListItem', function () {
		browser.assert.elements(ZDAVitrineEventsListItem, 0);
	});

	context('ZDAVitrineEventsListData', function () {

		const count = Math.max(1, Date.now() % 10);

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				ZDAVitrineEventsListData: JSON.stringify(Array.from(Array(count)).map(function (e) {
					return {
						ZDAEventStart: new Date(),
					};
				})),
			});
		});

		it('hides ZDAVitrineEventsListEmpty', function () {
			browser.assert.elements(ZDAVitrineEventsListEmpty, 0);
		});

		it('shows ZDAVitrineEventsListItem', function () {
			browser.assert.elements(ZDAVitrineEventsListItem, count);
		});

		it('shows ZDAVitrineEventsListItemStart', function () {
			browser.assert.elements(ZDAVitrineEventsListItemStart, count);
		});

		it('shows ZDAVitrineEventsListItemLink', function () {
			browser.assert.elements(ZDAVitrineEventsListItemLink, count);
		});

	});

});
