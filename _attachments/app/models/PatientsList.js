var PatientsList = Backbone.Collection.extend({
	initialize: function() {
		//_.bindAll(this, 'parse', 'url', 'pageInfo', 'nextPage', 'previousPage');
		//_.bindAll(this, 'url');
		this.page = 1;
	},
	db : {
		view: "byPatientSorted?limit=25",
		changes : true,
	},
//	url: function() {
//		//return this.base_url + '?' + $.param({page: this.page});
//		return 'patients/limit/10';
//	},
	model : Patient

});
FORMY.Patients = new PatientsList();
console.log("Creating Patients ");
