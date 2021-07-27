const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

import OLSKCache from 'OLSKCache';

describe('ZDAEventURLs', function test_ZDAEventURLs() {

	it('returns array', function () {
		deepEqual(mod.ZDAEventURLs(), process.env.ZDA_TASK_EVENTS_URLS.split(','));
	});

});

describe('ZDAEventURLRemoteStorage', function test_ZDAEventURLRemoteStorage() {

	it('returns string', function () {
		deepEqual(mod.ZDAEventURLRemoteStorage(), mod.ZDAEventURLs().filter(function (e) {
			return e.match(/RemoteStorage/i);
		}).shift());
	});

});

describe('ZDAEventURLFission', function test_ZDAEventURLFission() {

	it('returns string', function () {
		deepEqual(mod.ZDAEventURLFission(), mod.ZDAEventURLs().filter(function (e) {
			return e.match(/q0wId4DZFlx7LCP/i);
		}).shift());
	});

});

describe('ZDAEventURLSolidProject', function test_ZDAEventURLSolidProject() {

	it('returns string', function () {
		deepEqual(mod.ZDAEventURLSolidProject(), mod.ZDAEventURLs().filter(function (e) {
			return e.match(/Solid/i);
		}).shift());
	});

});

describe('_DataEventObjects', function test__DataEventObjects() {

	it('throws if param1 not in ZDAEventURLs', function () {
		throws(function () {
			mod._DataEventObjects(Math.random().toString(), Math.random().toString());
		}, /ZDAErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod._DataEventObjects(uRandomElement(mod.ZDAEventURLs()), null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod._DataEventObjects(uRandomElement(mod.ZDAEventURLs()), ''), []);
	});

	context('RemoteStorage', function test_RemoteStorage () {

		const uEvent = function (inputData = {}) {
			const item = Object.assign({
				ZDAEventURL: Math.random().toString(),
				ZDAEventName: Math.random().toString(),
				ZDAEventStart: new Date(),
			}, inputData);

			return `<table class="topic-list"><tr class="topic-list-item"><td class="main-link clearfix"><span class="link-top-line"><a href="${ item.ZDAEventURL }" class="raw-link raw-topic-link">${ item.ZDAEventName }<div class="event-date-container"><span class="event-date event-relative-date past" data-starts_at="${ item.ZDAEventStart.toJSON() }" data-ends_at="2021-03-19 16:00:00">4 months ago</span></div></a></span></td></tr><tr class="topic-list-item"><td class="main-link clearfix"><span class="link-top-line"><a href="/t/chatting-with-fission-january-14th-2021/654/3" class="raw-link raw-topic-link">Chatting with Fission – January 14th, 2021</a></span></td></tr>`;
		};
		
		it('parses data', function () {
			const ZDAEventURL = Math.random().toString();
			const ZDAEventName = Math.random().toString();
			const ZDAEventStart = new Date();

			deepEqual(mod._DataEventObjects(mod.ZDAEventURLRemoteStorage(), uEvent({
				ZDAEventURL,
				ZDAEventName,
				ZDAEventStart,
			})), [{
				ZDAEventURL: require('OLSKLink').OLSKLinkRelativeURL(mod.ZDAEventURLRemoteStorage(), ZDAEventURL),
				ZDAEventName,
				ZDAEventStart,
			}]);
		});
	
	});

	context('Fission', function test_Fission () {

		const uEvent = function (inputData = {}) {
			const item = Object.assign({
				ZDAEventURL: Math.random().toString(),
				ZDAEventName: Math.random().toString(),
				ZDAEventStart: new Date(),
			}, inputData);

			return `<div class="event-list"><div class="profile-event-wrapper"><a href="${ item.ZDAEventURL }" class="profile-event"><div class="event-time-left"><div class="event-month">Jul</div><div class="event-date">29</div></div><div class="event-cover-wrapper"><div style="background-image:url(&quot;https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=85,width=400/event-covers/ev/f2fc044d-28af-4170-9bc9-036ea40aca0e&quot;)" class="event-cover"></div><div class="event-cover-hover-overlay"></div></div><div class="event-info"><div class=""><span class="event-name">${ item.ZDAEventName }</span></div><div class="mt-1 flex-center event-meta"><div class="event-time-wrapper"><div class="event-time">${ item.ZDAEventStart.toString() } - 5:30 PM Coordinated Universal Time<!-- Jul 29 (Thu), 4:00 PM - 5:30 PM Coordinated Universal Time --> </div></div></div></div></a></div></div>`;
		};
		
		it('parses data', function () {
			const ZDAEventURL = Math.random().toString();
			const ZDAEventName = Math.random().toString();
			const ZDAEventStart = new Date();

			deepEqual(mod._DataEventObjects(mod.ZDAEventURLFission(), uEvent({
				ZDAEventURL,
				ZDAEventName,
				ZDAEventStart,
			})), [{
				ZDAEventURL,
				ZDAEventName,
				ZDAEventStart: new Date(ZDAEventStart.toString() + ' UTC'),
			}]);
		});
	
	});

	context('SolidProject', function test_SolidProject () {

		const uEvent = function (inputData = {}) {
			const item = Object.assign({
				ZDAEventURL: Math.random().toString(),
				ZDAEventName: Math.random().toString(),
				ZDAEventStart: new Date(),
			}, inputData);

			return `<article class="section content"><h2 id="2021-events">2021 Events</h2><table><tr><td>${ item.ZDAEventStart.toJSON().slice(0, 10) }</td><td><a href="${ item.ZDAEventURL }">${ item.ZDAEventName }</a></td><td><a href="https://solidproject.org/team">Solid Team</a></td><td><em>Solid over the Interplanetary File System</em><br>Fabrizio Parrillo (U. Basel, Switzerland), Christian F Tschudin (U. Basel, Switzerland)</td></tr></table><table><tr><td>2021-07-01</td><td><a href="https://www.eventbrite.com/e/158443820733">Solid World</a></td><td><a href="https://solidproject.org/team">Solid Team</a></td><td><em>Solid over the Interplanetary File System</em><br>Fabrizio Parrillo (U. Basel, Switzerland), Christian F Tschudin (U. Basel, Switzerland)</td></tr></table></article>`;
		};
		
		it('parses data', function () {
			const ZDAEventURL = Math.random().toString();
			const ZDAEventName = Math.random().toString();
			const ZDAEventStart = new Date();

			deepEqual(mod._DataEventObjects(mod.ZDAEventURLSolidProject(), uEvent({
				ZDAEventURL,
				ZDAEventName,
				ZDAEventStart,
			})), [{
				ZDAEventURL,
				ZDAEventName,
				ZDAEventStart: require('luxon').DateTime.fromISO(ZDAEventStart.toJSON().slice(0, 10) + 'T16:00:00', {
					setZone: true,
					zone: 'Europe/Rome',
				}).toJSDate(),
			}]);
		});
		
	});

});

describe('DataEvents', function test_DataEvents() {
	
	const _DataEvents = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_ValueCacheObject: {},
			_DataEventObjects: (function () {
				return [];
			}),
		}, inputData).DataEvents();
	};

	it('calls _DataEventObjects', function () {
		const item = [];

		const _ValueCacheObject = mod.ZDAEventURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: Math.random().toString(),
			});
		}, {});
		
		_DataEvents({
			_ValueCacheObject,
			_DataEventObjects: (function () {
				item.push([...arguments]);

				return [];
			}),
		});

		deepEqual(item, mod.ZDAEventURLs().map(function (e) {
			return [e, _ValueCacheObject[e]];
		}));
	});

	it('trims properties', function () {
		const item = Math.random().toString();
		deepEqual(_DataEvents({
			_DataEventObjects: (function () {
				return [{
					ZDAEventURL: arguments[0],
					[item]: ' ' + item + ' ',
				}];
			}),
		}), mod.ZDAEventURLs().reduce(function (coll, ZDAEventURL) {
			return coll.concat({
				ZDAEventURL,
				[item]: item,
			});
		}, []));
	});

});

describe('SetupFetchQueue', function test_SetupFetchQueue() {

	const _SetupFetchQueue = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKQueue: inputData,
		}, inputData);
		return _mod.SetupFetchQueue() || _mod;
	};

	it('calls OLSKQueueAPI', function () {
		const item = Math.random().toString();
		deepEqual(_SetupFetchQueue({
			OLSKQueueAPI: (function () {
				return [...arguments].concat(item);
			}),
		})._ValueFetchQueue, [item]);
	});

	it('sets _ValueFetchQueue', function () {
		const item = Math.random().toString();

		deepEqual(_SetupFetchQueue({
			OLSKQueueAPI: (function () {
				return item;
			}),
		})._ValueFetchQueue, item);
	});

});

describe('SetupEventsCache', function test_SetupEventsCache() {

	const _SetupEventsCache = function (inputData) {
		const _mod = Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskRead: (function () {}),
			}, inputData),
		});
		return _mod.SetupEventsCache() || _mod;
	};

	it('calls OLSKDiskRead', function () {
		const items = [];

		_SetupEventsCache({
			OLSKDiskRead: (function () {
				items.push(...arguments);
			}),
		});

		deepEqual(items, mod.ZDAEventURLs().map(OLSKCache.OLSKCacheURLBasename).map(function (e) {
			return OLSKCache.OLSKCachePath(__dirname, e);
		}));
	});

	it('sets _ValueCacheObject', function () {
		const OLSKDiskRead = uRandomElement(Math.random().toString(), null);

		deepEqual(_SetupEventsCache({
			OLSKDiskRead: (function () {
				return OLSKDiskRead;
			}),
		})._ValueCacheObject, mod.ZDAEventURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: OLSKDiskRead,
			});
		}, {}));
	});

});

describe('_SetupEvent', function test__SetupEvent() {

	const __SetupEvent = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataContentString: (function () {}),

			_DataFoilOLSKCache: Object.assign({
				OLSKCacheResultFetchRenew: (function () {}),
			}, inputData),

			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskWrite: (function () {}),
			}, inputData),
		}, inputData)._SetupEvent(inputData.url || Math.random().toString());
	};

	it('calls OLSKCacheResultFetchRenew', function () {
		const url = Math.random().toString();
		const _ValueCacheObject = {
			[Math.random().toString()]: Math.random().toString(),
		};

		const item = __SetupEvent({
			url,
			_ValueCacheObject,
			OLSKCacheResultFetchRenew: (function () {
				return [...arguments];
			}),
		}).pop();

		deepEqual(item, {
			ParamMap: _ValueCacheObject,
			ParamKey: url,
			ParamCallback: item.ParamCallback,
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: item._ParamCallbackDidFinish,
		});
	});

	context('ParamCallback', function () {

		it('calls _DataContentString', async function () {
			const url = Math.random().toString();

			deepEqual(await __SetupEvent({
				url,
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData.ParamCallback();
				}),
				_DataContentString: (function () {
					return [...arguments];
				}),
			}), [url]);
		});
	
	});

	context('_ParamCallbackDidFinish', function () {

		it('calls OLSKDiskWrite', async function () {
			const url = uLink();
			const data = Math.random().toString();
			
			deepEqual(await __SetupEvent({
				url,
				_ValueCacheObject: {
					[url]: data,
				},
				OLSKCacheResultFetchRenew: (function (inputData) {
					return inputData._ParamCallbackDidFinish();
				}),
				OLSKDiskWrite: (function () {
					return [...arguments];
				}),
			}), [OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(url)), data]);
		});
	
	});

});

describe('SetupEvents', function test_SetupEvents() {

	const _SetupEvents = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_SetupEvent: (function () {}),
		}, inputData).SetupEvents();
	};

	it('calls _SetupEvent', async function () {
		deepEqual(await _SetupEvents({
			_SetupEvent: (function (e) {
				return e;
			}),
		}), mod.ZDAEventURLs());
	});

});
