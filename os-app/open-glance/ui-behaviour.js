const mod = {

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
				{
					name: 'ZDAGlanceListItemRemoteStorage',
					attr: 'data-boolean',
				},
				{
					name: 'ZDAGlanceListItemFission',
					attr: 'data-boolean',
				},
				{
					name: 'ZDAGlanceListItemSOLID',
					attr: 'data-boolean',
				},
			],
		});

		window.addEventListener('keyup', mod.WindowDispatchKeyup);
	},

};
