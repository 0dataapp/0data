exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/identity.svg',
		OLSKRouteSignature: 'ZDACommonIdentityRedirect',
		OLSKRouteMethod: 'get',
		OLSKRouteRedirect: process.env.ZDA_VITRINE_IDENTITY_URL,
	}];
};

exports.OLSKControllerSharedStaticAssetFolders = function () {
	return [
		'_shared/__external',
	];
};
