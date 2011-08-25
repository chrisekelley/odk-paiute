var PatientsList = Backbone.Collection.extend({
    db : {
      //view : "byFormId",
    //view : "patients",
      //changes : true,
      //filter : Backbone.couch_connector.config.ddoc_name + "/patients"
    },	
    url : "/patients",
    model : Patient,
//    comparator : function(patient){
//        return patient.get("surname");	
//      }
    });
console.log("PatientsList");
var Patients = new PatientsList();
