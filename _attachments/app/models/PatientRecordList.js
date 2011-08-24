var PatientRecordList = Backbone.Collection.extend({
    model : Record,
    db : {
		view : "byPatientId",
		changes : false,
		keys : ["6857e31aa71f998c907d57b25e199cf2"]
	},
	url : "/patient/records",

    
//    comparator : function(patient){
//        return patient.get("surname");	
//      }
    });
