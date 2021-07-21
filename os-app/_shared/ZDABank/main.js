const mod = {

	ZDABankURLs() {
		return process.env.ZDA_TASK_BANKS_URLS.split(',');
	},

	ZDABankURLRemoteStorage () {
		return mod.ZDABankURLs().filter(function (e) {
			return e.match(/RemoteStorage/i);
		}).shift();
	},

	ZDABankURLFission () {
		return mod.ZDABankURLs().filter(function (e) {
			return e.match(/Fission/i);
		}).shift();
	},

	ZDABankURLAwesome () {
		return mod.ZDABankURLs().filter(function (e) {
			return e.match(/Awesome/i);
		}).shift();
	},

	ZDABankURLUnhosted () {
		return mod.ZDABankURLs().filter(function (e) {
			return e.match(/Unhosted/i);
		}).shift();
	},

	ZDABankURLSolidProject () {
		return mod.ZDABankURLs().filter(function (e) {
			return e.match(/Solid/i);
		}).shift();
	},

	ZDABankProtocolProperties () {
		return mod.ZDABankURLs().reduce(function (coll, item) {
			return Object.assign(coll, {
				[{
					[mod.ZDABankURLRemoteStorage()]: 'ZDABankRemoteStorage',
					[mod.ZDABankURLFission()]: 'ZDABankFission',
					[mod.ZDABankURLAwesome()]: 'ZDABankAwesome',
					[mod.ZDABankURLUnhosted()]: 'ZDABankUnhosted',
					[mod.ZDABankURLSolidProject()]: 'ZDABankSolid',
				}[item]]: {
					[mod.ZDABankURLRemoteStorage()]: {
						ZDAProtocolName: 'RemoteStorage',
					},
					[mod.ZDABankURLFission()]: {
						ZDAProtocolName: 'Fission',
					},
					[mod.ZDABankURLAwesome()]: {},
					[mod.ZDABankURLUnhosted()]: {},
					[mod.ZDABankURLSolidProject()]: {
						ZDAProtocolName: 'Solid',
					},
				}[item],
			});
		}, {});
	},

};

Object.assign(exports, mod);
