const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	ZDAGlanceEventsList: '.ZDAGlanceEventsList',
	
	ZDAGlanceEventsListEmpty: '.ZDAGlanceEventsListEmpty',

	ZDAGlanceEventsListItem: '.ZDAGlanceEventsListItem',
	
	ZDAGlanceEventsListItemStart: '.ZDAGlanceEventsListItemStart',
	ZDAGlanceEventsListItemLink: '.ZDAGlanceEventsListItemLink',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('ZDAGlanceEventsList_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows ZDAGlanceEventsList', function() {
		browser.assert.elements(ZDAGlanceEventsList, 1);
	});

	it('shows ZDAGlanceEventsListEmpty', function () {
		browser.assert.elements(ZDAGlanceEventsListEmpty, 1);
	});

	it('hides ZDAGlanceEventsListItem', function () {
		browser.assert.elements(ZDAGlanceEventsListItem, 0);
	});

	context('ZDAGlanceEventsListData', function () {

		const count = Math.max(1, Date.now() % 10);

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				ZDAGlanceEventsListData: JSON.stringify(Array.from(Array(count)).map(function (e) {
					return {
						ZDAEventStart: new Date(),
					};
				})),
			});
		});

		it('hides ZDAGlanceEventsListEmpty', function () {
			browser.assert.elements(ZDAGlanceEventsListEmpty, 0);
		});

		it('shows ZDAGlanceEventsListItem', function () {
			browser.assert.elements(ZDAGlanceEventsListItem, count);
		});

		it('shows ZDAGlanceEventsListItemStart', function () {
			browser.assert.elements(ZDAGlanceEventsListItemStart, count);
		});

		it('shows ZDAGlanceEventsListItemLink', function () {
			browser.assert.elements(ZDAGlanceEventsListItemLink, count);
		});

	});

});
