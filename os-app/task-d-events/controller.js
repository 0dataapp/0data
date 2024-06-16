const cheerio = require('cheerio');
const OLSKCache = require('OLSKCache');

const uAscending = function (a, b) {
	return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

const mod = {

	OLSKControllerTasks () {
		return [{
			OLSKTaskName: 'ZDAEventsStartFetch',
			OLSKTaskFireTimeInterval: 1,
			OLSKTaskShouldBePerformed () {
				return true;
			},
			OLSKTaskCallback: (function () {
				require('OLSKModule').OLSKModuleLifecycleSetup(mod);
			}),
			OLSKTaskFireLimit: 1,
		}];
	},

	OLSKControllerSharedLocals () {
		return {
			ZDAEvents () {
				return mod.DataEvents();
			},
		};
	},

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
			return e.match(/fission/i);
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
						return cheerio('channel', param2).first().find('item').filter(function () {
							return cheerio('description', this).html().match('discourse-post-event');
						}).map(function () {
							return {
								ZDAEventURL: cheerio('source', this).attr('url').split('.rss').shift(),
								ZDAEventName: cheerio('title', this).text(),
								ZDAEventStart: new Date(cheerio('description', this).html().match(/data-start="(.*)/)[0].split('"')[1]),
							};
						});
					},
					[mod.ZDAEventURLFission()]: function () {
						return (param2 ? JSON.parse(param2.split('<script id="__NEXT_DATA__" type="application/json">').pop().split('</script>').shift()).props.pageProps.initialData.data.featured_items : []).map(function (e) {
							return {
								ZDAEventURL: e.event.url,
								ZDAEventName: e.event.name,
								ZDAEventStart: new Date(e.event.start_at),
							};
						});
					},
					[mod.ZDAEventURLSolidProject()]: function () {
						// return cheerio('article.content table', param2).first().find('tr').map(function () {
						// 	return {
						// 		ZDAEventURL: cheerio(':nth-child(2) a', this).attr('href') || '',
						// 		ZDAEventName: cheerio(':nth-child(2) a', this).text(),
						// 		ZDAEventStart: require('luxon').DateTime.fromISO(cheerio('td:nth-child(1)', this).text() + 'T16:00:00', {
						// 			setZone: true,
						// 			zone: 'Europe/Rome',
						// 		}).toJSDate(),
						// 	};
						// });
						return (param2 ? JSON.parse(param2.split('<script type="application/ld+json">').pop().split('</script>').shift()) : []).map(function (e) {
							return {
								ZDAEventURL: e.url,
								ZDAEventName: e.name,
								// ZDAEventStart: require('luxon').DateTime.fromISO(ZDAEventStart.toJSON().slice(0, 10) + 'T16:00:00', {
								// 	setZone: true,
								// 	zone: 'Europe/Rome',
								// }).toJSDate(),
								ZDAEventStart: new Date(e.startDate),
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
		if (process.env.OLSK_FLAG_CI) {
			return [];
		}
		
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod.ZDAEventURLs().reduce(function (coll, item) {
			return coll.concat(_mod._DataEventObjects(item, _mod._OLSKCacheResultMap[item] || '').map(require('OLSKObject').OLSKObjectTrim));
		}, []).filter(function (e) {
			return e.ZDAEventStart > new Date();
		}).sort(function (a, b) {
			return uAscending(a.ZDAEventStart, b.ZDAEventStart);
		});
	},

	// SETUP

	_SetupEvent (inputData) {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod._DataFoilOLSKCache.OLSKCacheQueuedFetch({
			ParamMod: mod,
			ParamKey: inputData,
			ParamCallback: (function () {
				return _mod._DataContentString(inputData);
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			ParamFileURLs: mod.ZDAEventURLs(),
			ParamFileDirectory: __dirname,
			OLSKQueue: _mod._DataFoilOLSKQueue,
			OLSKDisk: _mod._DataFoilOLSKDisk,
		});
	},

	SetupEvents () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		
		return Promise.all(mod.ZDAEventURLs().map(_mod._SetupEvent));
	},

};

Object.assign(exports, mod);
