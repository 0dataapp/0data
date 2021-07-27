const mod = {

	// DATA

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


};

Object.assign(exports, mod);
