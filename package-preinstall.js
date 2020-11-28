Object.entries({
	
	OLSKPreinstallPurgeOLSK () {
		if (process.env.NODE_ENV !== 'production') {
			return;
		}

		try {
			require('glob');
		} catch(outputData) {
			return { outputData };
		}

		const outputData = (function (param1, param2) {
			return require('glob').sync(`+(${ param1.join('|') })/`, {
				matchBase: true,
				cwd: param2,
			}).forEach(function (e) {
				try {
					require('OLSKDisk').OLSKDiskDeleteFolder(require('path').join(param2, e));
				} catch (e) {
					console.warn('error deleting folder');
				}
			});
		})([
			'OLSK*',
			'ROCO*',
			'launchlet',
			'MassageTXT',
		], require('path').join(__dirname, 'node_modules'));

		return { outputData };
	},

}).forEach(function (e) {
	const result = e.pop()();
	
	if (typeof result === 'undefined') {
		return;
	}

	console.log(e.shift(), result.outputData);
});
