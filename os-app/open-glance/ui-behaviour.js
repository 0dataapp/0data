const mod = {

	// LIFECYCLE

	LifecyclePageWillLoad() {
		mod._ValueList = new List(document.querySelector('.ZDAGlance'), {
			searchClass: 'ZDAGlanceFilterInput',
		  valueNames: [
			  'ZDAGlanceListItemName',
			  'ZDAGlanceListItemBlurb',
		  ],
		});
	},

};
