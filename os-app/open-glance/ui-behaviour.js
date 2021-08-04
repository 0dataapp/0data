const mod = {

	// CONTROL

	ControlSearch (inputData) {
		mod._ValueList.search(inputData);
		document.querySelector('.ZDAGlanceFilterInput').value = inputData;
	},

	// LIFECYCLE

	LifecyclePageWillLoad() {
		mod._ValueList = new List(document.querySelector('.ZDAGlance'), {
			searchClass: 'ZDAGlanceFilterInput',
			sortClass: 'ZDAGlanceListSort',
			valueNames: [
				'ZDAGlanceListItemName',
				'ZDAGlanceListItemBlurb',
				{ data: ['protocols'] },
			],
		});
	},

};
