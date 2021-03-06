const { JSDOM } = require('JSDOM');
const OLSKLink = require('OLSKLink');
const OLSKCache = require('OLSKCache');

const mod = {

	OLSKControllerTasks () {
		return [{
			OLSKTaskName: 'ZDADetailsCacheTask',
			OLSKTaskFireTimeInterval: 1,
			OLSKTaskShouldBePerformed () {
				return true;
			},
			OLSKTaskCallback: mod.SetupDetails,
			OLSKTaskFireLimit: 1,
		}];
	},
	
	// VALUE

	_ValueCandidatesCache: {},

	ValueCandidatesCache () {
		return mod._ValueCandidatesCache;
	},

	// DATA

	_DataFoilOLSKCache: require('OLSKCache'),
	_DataFoilOLSKQueue: require('OLSKQueue'),
	_DataFoilOLSKDisk: require('OLSKDisk'),
	_DataFoilListings: require('../task-a-listings/controller.js'),

	async _DataContentString (inputData) {
		return (await require('node-fetch')(inputData)).text();
	},

	DataCacheAggregateBasename() {
		return '_aggregate';
	},

	_DataDOMPropertyCandidates (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof params.ParamURL !== 'string') {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof params.ParamMetadata !== 'object' || params.ParamMetadata === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		if (typeof params.ParamManifest !== 'undefined') {
			if (typeof params.ParamManifest !== 'object' || params.ParamManifest === null) {
				throw new Error('ZDRErrorInputNotValid');
			}
		}

		return [
			['ZDAProjectIconURL', (function(href) {
				if (!href) {
					return;
				}

				return !href ? null : OLSKLink.OLSKLinkRelativeURL(params.ParamURL, href);
			})((((params.ParamManifest || {}).icons || []).pop() || {}).src || params.ParamMetadata['apple-touch-icon'] || params.ParamMetadata['apple-touch-icon-precomposed'])],
			['_ZDAProjectBlurb', params.ParamMetadata.description],
			['_ZDAProjectBlurb', params.ParamMetadata.title],
			['ZDAProjectHasManifest', !!params.ParamManifest],
		].filter(function ([key, value]) {
			return !!value;
		});
	},

	// SETUP

	SetupFetchQueue () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		
		_mod._ValueFetchQueue = _mod._DataFoilOLSKQueue.OLSKQueueAPI();
	},

	SetupCacheObject () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;
		
		Object.assign(mod, Object.assign(_mod, {
			_ValueCandidatesCache: _mod._DataFoilOLSKCache.OLSKCacheReadFile(mod.DataCacheAggregateBasename(), require('path').join(__dirname, '__cached')) || {},
		}));
	},

	async _SetupCandidates (inputData) {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		const ParamMetadata = require('OLSKDOM').OLSKDOMMetadata(_mod._DataFoilOLSKDisk.OLSKDiskWrite(OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(inputData)), await _mod._DataContentString(inputData)), {
			JSDOM: JSDOM.fragment,
		});

		return Object.fromEntries(_mod._DataDOMPropertyCandidates({
			ParamURL: inputData,
			ParamMetadata,
			ParamManifest: !ParamMetadata.manifest ? undefined : (function(body) {
				try {
					return JSON.parse(_mod._DataFoilOLSKDisk.OLSKDiskWrite(OLSKCache.OLSKCachePath(__dirname, OLSKCache.OLSKCacheURLBasename(OLSKLink.OLSKLinkRelativeURL(inputData, ParamMetadata.manifest))), body));
				} catch (error) {
					return;
				}
			})(await _mod._DataContentString(OLSKLink.OLSKLinkRelativeURL(inputData, ParamMetadata.manifest))),
		}));
	},

	_SetupDetail (inputData) {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod._DataFoilOLSKCache.OLSKCacheResultFetchRenew({
			ParamMap: _mod._ValueCandidatesCache,
			ParamKey: inputData,
			ParamCallback: (function () {
				return _mod._ValueFetchQueue.OLSKQueueAdd(function () {
					return _mod._SetupCandidates(inputData);
				});
			}),
			ParamInterval: 1000 * 60 * 60 * 24,
			_ParamCallbackDidFinish: (function () {
				return _mod._DataFoilOLSKCache.OLSKCacheWriteFile(_mod._ValueCandidatesCache, mod.DataCacheAggregateBasename(), require('path').join(__dirname, '__cached'));
			}),
		});
	},

	SetupDetails () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod._DataFoilListings.DataListingProjects().map(function (e) {
			return _mod._SetupDetail(e.ZDAProjectURL);
		})
	},

};

if (process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_script === 'olsk-express') {
	require('OLSKModule').OLSKModuleLifecycleSetup(mod);
}

Object.assign(exports, mod);
