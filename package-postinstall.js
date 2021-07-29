(function OLSKPostinstallHotfix() {
	Object.entries(Object.assign(require('OLSKHotfix').OLSKHotfixPatches(process.env.NODE_ENV), {
		'./node_modules/ROCOForum/main.ejs': {
			'?category=<%= ROCOForumTopic %>&amp;': '?alfa=bravo&amp;',
			'" category="<%= ROCOForumTopic %>" per-page': '"  per-page',
			'/c/<%= ROCOForumTopic %>': '/',
		},
	})).forEach(function ([path, patches]) {
		if (!require('fs').existsSync(path)) {
			return;
		}
		
		Object.entries(patches).forEach(function ([search, replace]) {
			require('fs').writeFileSync(path, require('OLSKString').OLSKStringPatch(
				require('fs').readFileSync(path, 'utf8'), search, replace));
		});
	});
})();

(function OLSKPostinstallExternalAssets() {
	require('./node_modules/OLSKExpress/modules/OLSKAssets/main.js').OLSKAssetsCopyAssetsFromTo([
		'normalize.css',
		'OLSKDecor',
		'OLSKRootLink',
		'OLSKUIAssets',
		'ROCORootLink',
		'list.js',
	], require('path').join(__dirname, 'node_modules'), require('path').join(__dirname, 'os-app/_shared/__external'));
})();
