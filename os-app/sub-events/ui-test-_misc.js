const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const ZDABank = require('../_shared/ZDABank/main.js');

describe('ZDAGlanceEventsList_Misc', function  () {

	const item = {
		ZDAEventURL: Math.random().toString(),
		ZDAEventName: Math.random().toString(),
		ZDAEventStart: new Date(),
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			ZDAGlanceEventsListData: JSON.stringify([item]),
		});
	});

	describe('ZDAGlanceEventsList', function test_ZDAGlanceEventsList () {

		it('sets lang', function () {
			browser.assert.attribute(ZDAGlanceEventsList, 'lang', 'en');
		});

	});

	describe('ZDAGlanceEventsListItemStart', function test_ZDAGlanceEventsListItemStart () {

		it('binds ZDAEventStart', function () {
			browser.assert.text(ZDAGlanceEventsListItemStart, require('luxon').DateTime.fromJSDate(item.ZDAEventStart).toFormat('yyyy.dd'));
		});

	});

	describe('ZDAGlanceEventsListItemLink', function test_ZDAGlanceEventsListItemLink () {

		it('sets href', function () {
			browser.assert.attribute(ZDAGlanceEventsListItemLink, 'href', item.ZDAEventURL);
		});

		it('sets target', function () {
			browser.assert.attribute(ZDAGlanceEventsListItemLink, 'target', '_blank');
		});

		it('binds ZDAEventName', function () {
			browser.assert.text(ZDAGlanceEventsListItemLink, item.ZDAEventName);
		});

	});

});
