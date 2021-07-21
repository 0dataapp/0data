const { throws, rejects, deepEqual } = require('assert');

const mod = require('./controller.js');

import { JSDOM } from 'jsdom';
import OLSKLink from 'OLSKLink';
import OLSKCache from 'OLSKCache';

describe('DataProjectsSort', function test_DataProjectsSort() {
	
	it('bumps ZDAProjectIconURL', function () {
		const item1 = {};
		const item2 = {
			ZDAProjectIconURL: Math.random().toString(),
		};

		deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
	});

	it('bumps ZDAProjectIconURL + ZDAProjectBlurb', function () {
		const item1 = {
			ZDAProjectIconURL: Math.random().toString(),
		};
		const item2 = {
			ZDAProjectBlurb: Math.random().toString(),
			ZDAProjectIconURL: Math.random().toString(),
		};

		deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
	});

	it('bumps ZDAProjectHasManifest', function () {
		const item1 = {
			ZDAProjectBlurb: Math.random().toString(),
			ZDAProjectIconURL: Math.random().toString(),
			ZDAProjectHasManifest: false,
		};
		const item2 = {
			ZDAProjectBlurb: Math.random().toString(),
			ZDAProjectIconURL: Math.random().toString(),
			ZDAProjectHasManifest: true,
		};

		deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
	});

	it('bumps _ZDAProjectSupports', function () {
		const item1 = {
			ZDAProjectBlurb: Math.random().toString(),
			ZDAProjectIconURL: Math.random().toString(),
			ZDAProjectHasManifest: true,
		};
		const item2 = {
			ZDAProjectBlurb: Math.random().toString(),
			ZDAProjectIconURL: Math.random().toString(),
			ZDAProjectHasManifest: true,
			['_ZDAProjectSupports' + Math.random().toString()]: true
		};

		deepEqual([item1, item2].sort(mod.DataProjectsSort), [item2, item1]);
	});

});

describe('_DataProjectImageProperty', function test__DataProjectImageProperty() {
	
	const __DataProjectImageProperty = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
		}, inputData)._DataProjectImageProperty(inputData.ParamProject);
	};

	it('returns inputData', function () {
		const ParamProject = {
			ZDAProjectIconURL: uLink(),
		};
		deepEqual(__DataProjectImageProperty({
			ParamProject,
		}), ParamProject);
	});

	it('sets _ZDAProjectIconURLCachedPath if _DataFoilImages.DataCacheLocalPath', function () {
		const ZDAProjectIconURL = Math.random().toString();
		const DataCacheLocalPath = Math.random().toString();

		deepEqual(__DataProjectImageProperty({
			ParamProject: {
				ZDAProjectIconURL,
			},
			_DataFoilImages: {
				DataCacheLocalPath: (function () {
					return DataCacheLocalPath;
				}),
			},
		}), {
			ZDAProjectIconURL,
			_ZDAProjectIconURLCachedPath: DataCacheLocalPath,
		});
	});

});

describe('_DataProjectProperties', function test__DataProjectProperties() {
	
	const __DataProjectProperties = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilDetails: {
				ValueCandidatesCache: function () {
					return inputData._ValueCandidatesCache || {};
				},
			},
			_DataDetailsDOMPropertyCandidates: (function () {
				return [];
			}),
		}, inputData)._DataProjectProperties(inputData.ParamProject);
	};

	it('throws if not object', function () {
		throws(function () {
			mod._DataProjectProperties(null);
		}, /ZDRErrorInputNotValid/);
	});

	it('returns inputData', function () {
		const ParamProject = {
			ZDAProjectURL: Math.random().toString(),
		};
		deepEqual(__DataProjectProperties({
			ParamProject,
		}), ParamProject);
	});
	
	it('includes _ValueCandidatesCache', function () {
		const ZDAProjectURL = Math.random().toString();
		const ParamProject = {
			ZDAProjectURL,
		};
		const _ValueCandidatesCache = {
			[ZDAProjectURL]: {
				[Math.random().toString()]: Math.random().toString(),
			},
		};

		deepEqual(__DataProjectProperties({
			ParamProject,
			_ValueCandidatesCache,
		}), Object.assign(ParamProject, _ValueCandidatesCache));
	});
	
	it('excludes underscore if present', function () {
		const ZDAProjectURL = Math.random().toString();
		const item = Math.random().toString();
		const ParamProject = {
			ZDAProjectURL,
			[item]: Math.random().toString(),
		};
		const _ValueCandidatesCache = {
			[ZDAProjectURL]: {
				['_' + item]: Math.random().toString(),
			},
		};

		deepEqual(__DataProjectProperties({
			ParamProject,
			_ValueCandidatesCache,
		}), ParamProject);
	});
	
	it('strips underscore', function () {
		const ZDAProjectURL = Math.random().toString();
		const item = Math.random().toString();
		const ParamProject = {
			ZDAProjectURL,
		};
		const _ValueCandidatesCache = {
			[ZDAProjectURL]: {
				['_' + item]: item,
			},
		};

		deepEqual(__DataProjectProperties({
			ParamProject,
			_ValueCandidatesCache,
		}), Object.assign(ParamProject, {
			[item]: item,
		}));
	});

});

describe('DataProjects', function test_DataProjects() {
	
	const _DataProjects = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilDetails: Object.assign({
				ValueCandidatesCache: function () {
					return inputData._ValueCandidatesCache || {};
				},
			}, inputData),
			_DataFoilBanks: Object.assign({
				DataBankProjects: (function () {}),
			}, inputData),
		}, inputData).DataProjects();
	};

	it('merges sources', function () {
		const candidates = {
			[Math.random().toString()]: Math.random().toString(),
		};
		const ZDAProjectURL = Math.random().toString();
		const _ZDAProjectIconURLCachedPath = Math.random().toString();
		deepEqual(_DataProjects({
			_ValueCandidatesCache: {
				[ZDAProjectURL]: candidates,
			},
			DataBankProjects: (function () {
				return [{
					ZDAProjectURL,
				}];
			}),
			_DataProjectImageProperty: (function (inputData) {
				return Object.assign(inputData, {
					_ZDAProjectIconURLCachedPath,
				});
			}),
		}), [Object.assign({
			ZDAProjectURL,
		}, candidates, {
			_ZDAProjectIconURLCachedPath,
		})]);
	});

	it('sorts with DataProjectsSort', function () {
		const item1 = {
			ZDAProjectURL: Math.random().toString(),
		};
		const item2 = {
			ZDAProjectURL: Math.random().toString(),
			ZDAProjectIconURL: uLink(),
		};

		deepEqual(_DataProjects({
			DataBankProjects: (function () {
				return [item1, item2];
			}),
		}), [item2, item1]);
	});

});

describe('DataProjectJSONSchema', function test_DataProjectJSONSchema() {
	
	it('throws if not object', function () {
		throws(function () {
			mod.DataProjectJSONSchema(null);
		}, /ZDAErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(mod.DataProjectJSONSchema({}), {});
	});

	it('maps ZDAProjectName', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectJSONSchema({
			ZDAProjectName: item,
		}), {
			name: item,
		});
	});

	it('maps ZDAProjectBlurb', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectJSONSchema({
			ZDAProjectBlurb: item,
		}), {
			description: item,
		});
	});

	it('maps ZDAProjectURL', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectJSONSchema({
			ZDAProjectURL: item,
		}), {
			url: item,
		});
	});

	it('maps ZDAProjectIconURL', function () {
		const item = Math.random().toString();
		deepEqual(mod.DataProjectJSONSchema({
			ZDAProjectIconURL: item,
		}), {
			image: item,
		});
	});

});

describe('DataProjectsJSON', function test_DataProjectsJSON() {

	it('returns string', function () {
		const ZDAProjectName = Math.random().toString();
		const item = {
			ZDAProjectName,
		};

		deepEqual(Object.assign(Object.assign({}, mod), {
			DataProjects: (function () {
				return [item];
			}),
		}).DataProjectsJSON(), JSON.stringify([mod.DataProjectJSONSchema(item)]));
	});

});
