const uAscending = function (a, b) {
	return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

const uDescending = function (a, b) {
	return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/projects.json',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'ZDAProjectsJSONRoute',
			OLSKRouteFunction: (function ZDAProjectsJSONRoute (req, res, next) {
				return res.json(mod.DataProjectsJSON());
			}),
		}];
	},

	// DATA

	_DataFoilBanks: require('../task-a-banks/controller.js'),
	_DataFoilDetails: require('../task-b-details/controller.js'),
	_DataFoilImages: require('../task-c-images/controller.js'),

	DataProjectsSort (a, b) {
		const unmatched = [
			'ZDAProjectIconURL',
			'ZDAProjectBlurb',
			'ZDAProjectHasManifest',
		].filter(function (e) {
			return !a[e] || !b[e];
		});

		if (unmatched.length) {
			return uDescending(unmatched.reduce(function (coll, item) {
				return coll + !!a[item];
			}, 0), unmatched.reduce(function (coll, item) {
				return coll + !!b[item];
			}, 0));
		}

		if (a.ZDAProjectBlurb.length > 140 || b.ZDAProjectBlurb.length > 140) {
			return uAscending(a.ZDAProjectBlurb.length, b.ZDAProjectBlurb.length);
		}

		const pattern = /git(?!hub.io)(?!ea)/i;
		const exclude = /(pages.github.com|about.gitlab.com)/i;
		if (a.ZDAProjectURL?.match(pattern) || b.ZDAProjectURL?.match(pattern)) {
			return uAscending(a.ZDAProjectURL?.match(pattern) && !a.ZDAProjectURL?.match(exclude), b.ZDAProjectURL?.match(pattern) && !b.ZDAProjectURL?.match(exclude));
		}

		return uDescending(...[a, b].map(function (e) {
			return Object.values(e.ZDAProjectBanks || {}).filter(function (e) {
				return e.ZDABankProtocol;
			}).length;
		}));
	},

	_DataProjectImageProperty (inputData) {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		if (inputData.ZDAProjectIconURL) {
			inputData._ZDAProjectIconURLCachedPath = _mod._DataFoilImages.DataCacheLocalPath(inputData.ZDAProjectIconURL);
		}

		return inputData;
	},

	_DataProjectProperties (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ZDRErrorInputNotValid');
		}

		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return Object.entries(_mod._DataFoilDetails.ValueCandidatesCache()[inputData.ZDAProjectURL] || {}).reduce(function (coll, [key, value]) {
			if (key.startsWith('_') && coll[key.slice(1)]) {
				return coll;
			}

			if (key.startsWith('_')) {
				key = key.slice(1);
			}

			return Object.assign(coll, {
				[key]: value,
			});
		}, inputData);
	},

	DataProjects () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		// require('OLSKDisk').OLSKDiskWrite(require('OLSKDisk').OLSKDiskOpen(require('OLSKCache').OLSKCachePath(__dirname, '1-banks.json')), JSON.stringify(_mod._DataFoilBanks.DataBankProjects(), null, ' '));
		// require('OLSKDisk').OLSKDiskWrite(require('OLSKDisk').OLSKDiskOpen(require('OLSKCache').OLSKCachePath(__dirname, '2-details.json')), JSON.stringify(_mod._DataFoilBanks.DataBankProjects().map(function (e) { return _mod._DataProjectProperties(e) }), null, ' '));

		return _mod._DataFoilBanks.DataBankProjects().map(function (e) {
			return _mod._DataProjectProperties(e);
		}).map(function (e) {
			return _mod._DataProjectImageProperty(e);
		}).sort(mod.DataProjectsSort);
	},

	DataProjectJSONSchema (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('ZDAErrorInputNotValid');
		}

		return Object.entries({
			ZDAProjectName: 'name',
			ZDAProjectBlurb: 'description',
			ZDAProjectURL: 'url',
			ZDAProjectIconURL: 'image',
			ZDAProjectBanks: 'protocols',
			ZDAProjectFunding: 'funding',
		}).reduce(function (coll, item) {
			return Object.assign(coll, !inputData[item[0]] ? {} : {
				[item[1]]: item[0] === 'ZDAProjectBanks' ? Object.values(inputData[item[0]]).filter(function (e) {
					return (e.ZDABankProtocol || {}).ZDAProtocolName;
				}).map(function (e) {
					return e.ZDABankProtocol.ZDAProtocolName.toLowerCase();
				}) : inputData[item[0]],
			});
		}, {});
	},

	DataProjectsJSON () {
		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		return _mod.DataProjects().map(mod.DataProjectJSONSchema);
	},

};

Object.assign(exports, mod);
