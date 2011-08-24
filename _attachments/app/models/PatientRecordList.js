var PatientRecordList = Backbone.Collection.extend({
    model : Record,
    //key: this.get("_id"),
	initialize: function() {
		//_.bindAll(this, 'db');
		//_.bindAll(this, "render", "addOne");
		//console.log("attributes: " + attributes);
		if (arguments[0] != null) {
			var item = arguments[0];
			console.log("arguments[0]: " + JSON.stringify(arguments[0]) + item["_id"]);
			
			//model.patientId =  item["_id"];
		}
		return this;
	}, 
    db : {
		view : "byPatientId",
		changes : false,
		//keys : ["6857e31aa71f998c907d57b25e199cf2"]
		//keys : [PatientId]
		//keys : [patientId]
		//keys : [this._id]
	},
	url : "/patient/records",
    });

