const OLSKCache = require('OLSKCache');

const mod = {

	OLSKControllerTasks () {
		return [{
			OLSKTaskName: 'ZDAImagesStartFetch',
			OLSKTaskFireTimeInterval: 10,
			OLSKTaskShouldBePerformed () {
				return true;
			},
			OLSKTaskCallback: (function () {
				require('OLSKModule').OLSKModuleLifecycleSetup(mod);
			}),
			OLSKTaskFireLimit: 1,
		}, {
			OLSKTaskName: 'ZDAImagesFetchIncoming',
			OLSKTaskFireTimeInterval: 60 * 60,
			OLSKTaskShouldBePerformed () {
				return true;
			},
			OLSKTaskCallback: mod.SetupImages,
		}];
	},

	// DATA

	_DataFoilOLSKQueue: require('OLSKQueue'),
	_DataFoilFS: require('fs'),
	_DataFoilProjects: require('../api-projects/controller.js'),
	_DataFoilBanks: require('../task-a-banks/controller.js'),

	async _DataImagePipe (url, file) {
		const {createWriteStream} = require('fs');
		const {pipeline} = require('stream');
		const {promisify} = require('util');
		const fetch = require('node-fetch');

		const streamPipeline = promisify(pipeline);

		Object.entries({
			'https://laverna.cc/apple-touch-icon.png': 'https://laverna.cc/app/images/icon/icon-152x152.png',
			'https://noeldemartin.github.io/media-kraken/img/icons/android-chrome-maskable-512x512.png': 'https://noeldemartin.github.io/media-kraken/img/icons/android-chrome-512x512.png',
			'https://thewebalyst.solidcommunity.net/plume/img/favicon.png': 'https://thewebalyst.solidcommunity.net/plume/favicon.png',
			'https://madelinemiller.dev/apps/emojify/icons/icon-512x512.png': 'https://madelinemiller.dev/static/ff435ace25032a4f5a8b09bb98a28dbc/emojify-icon.png',
			'https://jeremyckahn.github.io/logoMaskable.png': 'https://jeremyckahn.github.io/farmhand/app-icons/ios-appicon-180-180.png',
			'https://find.internet4000.com/public/favicon/android-chrome-512x512.png': 'https://find.internet4000.com/public/favicons/apple-touch-icon.png',
			'https://hihayk.github.io/logo512.png': 'https://hihayk.github.io/shaper/logo192.png',
			'https://petrolette.space/public/images/favicons/android-chrome-256x256.png': 'https://petrolette.space/static/images/favicons/apple-touch-icon.png',
		}).forEach(function ([source, destination]) {
			if (url.match(source)) {
				url = destination;
			}
		});

		const response = await fetch(url);

		if (!response.ok) {
			console.log(`unexpected response from ${url}\n${response.statusText}`);
			return;
		}

		require('OLSKDisk').OLSKDiskCreateFolder(require('path').dirname(file));

		await streamPipeline(response.body, createWriteStream(file));
	},

	DataCachePath (inputData = '') {
		if (typeof inputData !== 'string') {
			throw new Error('ZDAErrorInputNotValid');
		}

		return require('path').join(__dirname, '__cached', 'ui-assets', inputData);
	},

	DataCacheLocalPath (inputData) {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		const localURL = mod.DataCachePath(OLSKCache.OLSKCacheURLFilename(inputData));
		return _mod._DataFoilFS.existsSync(localURL) ? localURL.replace(require('path').join(__dirname, '../'), '/') : null;
	},

	// SETUP

	SetupFetchQueue () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		_mod._ValueFetchQueue = _mod._DataFoilOLSKQueue.OLSKQueueAPI();
	},

	_SetupImage (inputData) {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod._ValueFetchQueue.OLSKQueueAdd(function () {
			return mod.DataCacheLocalPath(inputData) || _mod._DataImagePipe(inputData, mod.DataCachePath(OLSKCache.OLSKCacheURLFilename(inputData)));
		});
	},

	SetupImages () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod._DataFoilProjects.DataProjects().concat(_mod._DataFoilBanks.DataBankProtocols()).reduce(function (coll, item) {
			return coll.concat(item.ZDAProjectIconURL && !item._ZDAProjectIconURLCachedPath ? item.ZDAProjectIconURL : (item.ZDAProtocolIconURL && !item._ZDAProtocolIconURLCachedPath ? item.ZDAProtocolIconURL : []));
		}, []).map(function (e) {
			return _mod._SetupImage(e);
		});
	},

};

Object.assign(exports, mod);
