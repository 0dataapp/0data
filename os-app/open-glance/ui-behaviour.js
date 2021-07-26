const mod = {

	// CONTROL

	ControlSearch (inputData) {
		mod._ValueList.search(inputData);
		document.querySelector('.ZDAGlanceFilterInput').value = inputData;
	},

	// MESSAGE

	WindowDispatchKeyup (event) {
		if (event.key !== 'Escape') {
			return;
		}

		mod._ValueList.search('');
		document.querySelector('.ZDAGlanceFilterInput').value = '';
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

		window.addEventListener('keyup', mod.WindowDispatchKeyup);
	},

};
