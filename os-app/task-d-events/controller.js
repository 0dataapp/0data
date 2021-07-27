const cheerio = require('cheerio');
const OLSKCache = require('OLSKCache');

const uAscending = function (a, b) {
  return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

const mod = {

	_ValueCacheObject: {},

	// DATA

	_DataFoilOLSKCache: OLSKCache,
	_DataFoilOLSKQueue: require('OLSKQueue'),
	_DataFoilOLSKDisk: require('OLSKDisk'),

	ZDAEventURLs() {
		return process.env.ZDA_TASK_EVENTS_URLS.split(',');
	},

	ZDAEventURLRemoteStorage () {
		return mod.ZDAEventURLs().filter(function (e) {
			return e.match(/RemoteStorage/i);
		}).shift();
	},

	ZDAEventURLFission () {
		return mod.ZDAEventURLs().filter(function (e) {
			return e.match(/q0wId4DZFlx7LCP/i);
		}).shift();
	},

	ZDAEventURLSolidProject () {
		return mod.ZDAEventURLs().filter(function (e) {
			return e.match(/Solid/i);
		}).shift();
	},

	async _DataContentString (inputData) {
		return (await require('node-fetch')(inputData)).text();
	},

	_DataEventObjects (param1, param2) {
		if (!mod.ZDAEventURLs().includes(param1)) {
			throw new Error('ZDAErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		return Array.from(mod.ZDAEventURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[item]: {
					[mod.ZDAEventURLRemoteStorage()]: function () {
						return cheerio('table.topic-list', param2).first().find('td.main-link').filter(function () {
							return cheerio('span.event-date', this).text();
						}).map(function () {
							return {
								ZDAEventURL: require('OLSKLink').OLSKLinkRelativeURL(param1, cheerio('a.raw-topic-link', this).attr('href')),
								ZDAEventName: cheerio('a.raw-topic-link', this).text().split(cheerio('.event-relative-date', this).text()).shift(),
								ZDAEventStart: new Date(cheerio('span.event-date', this).attr('data-starts_at')),
							};
						});
					},
					[mod.ZDAEventURLFission()]: function () {
						return cheerio('.event-list', param2).first().find('.profile-event-wrapper').map(function () {
							return {
								ZDAEventURL: cheerio('a.profile-event', this).attr('href'),
								ZDAEventName: cheerio('span.event-name', this).text(),
								ZDAEventStart: new Date(cheerio('.event-time', this).text().split(' - ').shift() + ' UTC'),
							};
						});
					},
					[mod.ZDAEventURLSolidProject()]: function () {
						return cheerio('article.content table', param2).first().find('tr').map(function () {
							return {
								ZDAEventURL: cheerio(':nth-child(2) a', this).attr('href') || '',
								ZDAEventName: cheerio(':nth-child(2) a', this).text(),
								ZDAEventStart: require('luxon').DateTime.fromISO('2021-07-27T16:00:00', {
									setZone: true,
									zone: 'Europe/Rome',
								}).toJSDate(),
							};
						});
					},
				}[item],
			});
		}, {})[param1]()).map(function (e) {
			return Object.fromEntries(Object.entries(e).map(function (e) {
				return e.map(function (e) {
					if (typeof e !== 'string') {
						return e;
					}
					
					return e.trim();
				});
			}));
		});
	},

	DataEvents () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod.ZDAEventURLs().reduce(function (coll, item) {
			return coll.concat(_mod._DataEventObjects(item, _mod._ValueCacheObject[item] || '').map(require('OLSKObject').OLSKObjectTrim));
		}, []).filter(function (e) {
			return e.ZDAEventStart > new Date();
		}).sort(function (a, b) {
			return uAscending(a.ZDAEventStart, b.ZDAEventStart);
		});
	},

	// SETUP

	SetupFetchQueue () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		_mod._ValueFetchQueue = _mod._DataFoilOLSKQueue.OLSKQueueAPI();
	},

	SetupEventsCache () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		Object.assign(mod, Object.assign(_mod, {
			_ValueCacheObject: mod.ZDAEventURLs().reduce(function (coll, item) {
				return Object.assign(coll, {
					[item]: _mod._DataFoilOLSKDisk.OLSKDiskRead(OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(item))),
				});
			}, {}),
		}));
	},

	_SetupEvent (inputData) {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		return _mod._DataFoilOLSKCache.OLSKCacheResultFetchRenew({
			ParamMap: _mod._ValueCacheObject,
			ParamKey: inputData,
			ParamCallback: (function () {
				return _mod._DataContentString(inputData);
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: (function () {
				return _mod._DataFoilOLSKDisk.OLSKDiskWrite(OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(inputData)), _mod._ValueCacheObject[inputData]);
			}),
		});
	},

	SetupEvents () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		
		return Promise.all(mod.ZDAEventURLs().map(_mod._SetupEvent));
	},

};

if (process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_script === 'olsk-express') {
	require('OLSKModule').OLSKModuleLifecycleSetup(mod);
}

Object.assign(exports, mod);
