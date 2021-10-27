const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

const OLSKCache = require('OLSKCache');

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

describe('ZDAEventURLZeroData', function test_ZDAEventURLZeroData() {

	it('returns string', function () {
		deepEqual(mod.ZDAEventURLZeroData(), mod.ZDAEventURLs().filter(function (e) {
			return e.match(/0data/i);
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

			return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:discourse="http://www.discourse.org/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><atom:link href="https://community.remotestorage.io/c/events/12.rss" rel="self" type="application/rss+xml" /><item><title>${ item.ZDAEventName }</title><description><![CDATA[
            <p>I’ve been thinking about updating the website design, moving wiki content to forum, doing events and a newsletter, grant opportunities… Be welcome to join <a class="mention" href="/u/raucao">@raucao</a> and I  in the call and share your thoughts.</p>
<div class="discourse-post-event" data-start="${ item.ZDAEventStart.toJSON() }" data-status="public" data-url="https://meet.calyx.net/remotestorage" data-end="2021-08-03 14:00" data-allowed-groups="trust_level_0"></div>
            <p><small>1 post - 1 participant</small></p>
            <p><a href="https://community.remotestorage.io/t/community-call-redesigning-the-remotestorage-homepage-other-stuff/705">Read full topic</a></p>
          ]]></description><link>https://community.remotestorage.io/t/community-call-redesigning-the-remotestorage-homepage-other-stuff/705</link><source url="${ item.ZDAEventURL }.rss">Community call: Redesigning the remoteStorage homepage + other stuff</source></item></channel></rss>`;
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
				ZDAEventURL,
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

			return `<script id="__NEXT_DATA__" type="application/json">{"props":{"pageProps": {"initialData": {"events": [{"name": "${ item.ZDAEventName }","url": "${ item.ZDAEventURL }","start_at": "${ item.ZDAEventStart.toJSON() }","duration_minutes": 90,"visibility": "public","cover_url": "https://cdn.lu.ma/event-covers/se/3ec890e2-f604-4e76-ad7b-69996063b386","event_type": "independent","recurrence_id": null,"api_id": "evt-nHhXeNbXYwW4DW1","session_count_total": null,"session_count_future": null}]}}}}</script>`;
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
				ZDAEventURL: require('OLSKLink').OLSKLinkRelativeURL(mod.ZDAEventURLFission(), '/' + ZDAEventURL),
				ZDAEventName,
				ZDAEventStart,
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

			// return `<article class="section content"><h2 id="2021-events">2021 Events</h2><table><tr><td>${ item.ZDAEventStart.toJSON().slice(0, 10) }</td><td><a href="${ item.ZDAEventURL }">${ item.ZDAEventName }</a></td><td><a href="https://solidproject.org/team">Solid Team</a></td><td><em>Solid over the Interplanetary File System</em><br>Fabrizio Parrillo (U. Basel, Switzerland), Christian F Tschudin (U. Basel, Switzerland)</td></tr></table><table><tr><td>2021-07-01</td><td><a href="https://www.eventbrite.com/e/158443820733">Solid World</a></td><td><a href="https://solidproject.org/team">Solid Team</a></td><td><em>Solid over the Interplanetary File System</em><br>Fabrizio Parrillo (U. Basel, Switzerland), Christian F Tschudin (U. Basel, Switzerland)</td></tr></table></article>`;
			return `<script type="application/ld+json"></script><script type="application/ld+json">[{"startDate":"${ item.ZDAEventStart.toJSON() }","endDate":"2021-08-05T11:30:00-0400","name":"${ item.ZDAEventName }","url":"${ item.ZDAEventURL }","image":"https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F137878953%2F430856625158%2F1%2Foriginal.20210607-160111?h=230\u0026w=460\u0026auto=format%2Ccompress\u0026q=75\u0026sharp=10\u0026rect=0%2C0%2C1080%2C540\u0026s=46a33d7d72582393582937817840ba34","offers":{"url":"https://www.eventbrite.co.uk/e/solid-world-august-2021-tickets-158445927033","lowPrice":"0.00","highPrice":"0.00","@type":"AggregateOffer","priceCurrency":"USD"},"location":{"url":"https://www.eventbrite.co.uk/e/solid-world-august-2021-tickets-158445927033","@type":"VirtualLocation"},"eventAttendanceMode":"https://schema.org/OnlineEventAttendanceMode","@context":"http://schema.org","organizer":{"url":"https://www.eventbrite.co.uk/o/solid-project-30026804546","@type":"Organization","name":"Solid Project"},"@type":"Event","description":"Solid World is an opportunity to meet people who are working on or interested in working on"}]</script>`;
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
				ZDAEventStart,
			}]);
		});
		
	});

	context('ZeroData', function test_ZeroData () {

		const uEvent = function (inputData = {}) {
			const item = Object.assign({
				ZDAEventURL: Math.random().toString(),
				ZDAEventName: Math.random().toString(),
				ZDAEventStart: new Date(),
			}, inputData);

			return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:discourse="http://www.discourse.org/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><atom:link href="https://chat.0data.app/c/events/5.rss" rel="self" type="application/rss+xml" /><item><title>${ item.ZDAEventName }</title><description><![CDATA[
            <div class="discourse-post-event" data-start="${ item.ZDAEventStart.toJSON() }" data-status="public" data-end="2021-08-03 14:00" data-allowed-groups="trust_level_0"></div>
          ]]></description><link>https://chat.0data.app/t/zero-data-swap-2-files-portability-september-29-2021/37</link><source url="${ item.ZDAEventURL }.rss">Zero Data Swap #2: Files / Portability — September 29, 2021</source></item></channel></rss>`;
		};
		
		it('parses data', function () {
			const ZDAEventURL = Math.random().toString();
			const ZDAEventName = Math.random().toString();
			const ZDAEventStart = new Date();

			deepEqual(mod._DataEventObjects(mod.ZDAEventURLZeroData(), uEvent({
				ZDAEventURL,
				ZDAEventName,
				ZDAEventStart,
			})), [{
				ZDAEventURL,
				ZDAEventName,
				ZDAEventStart,
			}]);
		});
	
	});

	

});

describe('DataEvents', function test_DataEvents() {
	
	const _DataEvents = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_OLSKCacheResultMap: {},
			_DataEventObjects: (function () {
				return [];
			}),
		}, inputData).DataEvents();
	};

	it('calls _DataEventObjects', function () {
		const item = [];

		const _OLSKCacheResultMap = mod.ZDAEventURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: Math.random().toString(),
			});
		}, {});
		
		_DataEvents({
			_OLSKCacheResultMap,
			_DataEventObjects: (function () {
				item.push([...arguments]);

				return [];
			}),
		});

		deepEqual(item, mod.ZDAEventURLs().map(function (e) {
			return [e, _OLSKCacheResultMap[e]];
		}));
	});

	it('trims properties', function () {
		const item = Math.random().toString();
		const ZDAEventStart = new Date(Date.now() + 1000);

		deepEqual(_DataEvents({
			_DataEventObjects: (function () {
				return [{
					ZDAEventURL: arguments[0],
					ZDAEventStart,
					[item]: ' ' + item + ' ',
				}];
			}),
		}), mod.ZDAEventURLs().reduce(function (coll, ZDAEventURL) {
			return coll.concat({
				ZDAEventURL,
				ZDAEventStart,
				[item]: item,
			});
		}, []));
	});

	it('filters if past', function () {
		deepEqual(_DataEvents({
			_DataEventObjects: (function () {
				return [{
					ZDAEventURL: arguments[0],
					ZDAEventStart: new Date(Date.now() - 1000),
				}];
			}),
		}), []);
	});

	it('sorts by ZDAEventStart', function () {
		const item = Date.now() + 1000;
		deepEqual(_DataEvents({
			_DataEventObjects: (function () {
				return [{
					ZDAEventURL: arguments[0],
					ZDAEventStart: new Date(item + mod.ZDAEventURLs().length - mod.ZDAEventURLs().indexOf(arguments[0])),
				}];
			}),
		}), mod.ZDAEventURLs().reverse().map(function (ZDAEventURL, i) {
			return {
				ZDAEventURL,
				ZDAEventStart: new Date(item + 1 + i),
			};
		}, []));
	});

});

describe('_SetupEvent', function test__SetupEvent() {

	const __SetupEvent = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataContentJSON: (function () {}),

			_DataFoilOLSKCache: Object.assign({
				OLSKCacheQueuedFetch: (function () {}),
			}, inputData),

			_DataFoilOLSKDisk: Object.assign({
				OLSKDiskWrite: (function () {}),
			}, inputData),
		}, inputData)._SetupEvent(inputData.ParamKey || Math.random().toString());
	};
	
	it('calls OLSKCacheQueuedFetch', function () {
		const ParamKey = Math.random().toString();
		const OLSKDisk = {};
		const item = (uCapture(function (OLSKCacheQueuedFetch) {
			__SetupEvent({
				ParamKey,

				OLSKCacheQueuedFetch,
				_DataFoilOLSKDisk: OLSKDisk,
			});
		})).pop();

		deepEqual(item, {
			ParamMod: mod,
			ParamKey,
			ParamCallback: item.ParamCallback,
			ParamInterval: 1000 * 60 * 60 * 24,
			ParamFileURLs: mod.ZDAEventURLs(),
			ParamFileDirectory: __dirname,
			OLSKQueue: require('OLSKQueue'),
			OLSKDisk,
		});
	});

	context('ParamCallback', function () {

		it('calls _DataContentString', async function () {
			const ParamKey = Math.random().toString();
			deepEqual(await __SetupEvent({
				ParamKey,
				OLSKCacheQueuedFetch: (function (inputData) {
					return inputData.ParamCallback();
				}),
				_DataContentString: (function () {
					return [...arguments];
				}),
			}), [ParamKey]);
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
