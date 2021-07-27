const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const ZDABank = require('../_shared/ZDABank/main.js');

describe('ZDAVitrineEventsList_Misc', function  () {

	const item = {
		ZDAEventURL: Math.random().toString(),
		ZDAEventName: Math.random().toString(),
		ZDAEventStart: new Date(),
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			ZDAVitrineEventsListData: JSON.stringify([item]),
		});
	});

	describe('ZDAVitrineEventsList', function test_ZDAVitrineEventsList () {

		it('sets lang', function () {
			browser.assert.attribute(ZDAVitrineEventsList, 'lang', 'en');
		});

	});

	describe('ZDAVitrineEventsListItemStart', function test_ZDAVitrineEventsListItemStart () {

		it('binds ZDAEventStart', function () {
			browser.assert.text(ZDAVitrineEventsListItemStart, require('luxon').DateTime.fromJSDate(item.ZDAEventStart).toFormat('yyyy.dd'));
		});

	});

	describe('ZDAVitrineEventsListItemLink', function test_ZDAVitrineEventsListItemLink () {

		it('sets href', function () {
			browser.assert.attribute(ZDAVitrineEventsListItemLink, 'href', item.ZDAEventURL);
		});

		it('sets target', function () {
			browser.assert.attribute(ZDAVitrineEventsListItemLink, 'target', '_blank');
		});

		it('binds ZDAEventName', function () {
			browser.assert.text(ZDAVitrineEventsListItemLink, item.ZDAEventName);
		});

	});

});
