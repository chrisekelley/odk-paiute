var PatientRecordList = Backbone.Collection.extend({
    model : Record,
	initialize: function() {
		//_.bindAll(this, "render", "addOne");
		return this;
	}, 
    db : {
		view : "byPatientId",
		changes : false,
		//keys : ["6857e31aa71f998c907d57b25e199cf2"]
	},
	url : "/patient/records",
    });

