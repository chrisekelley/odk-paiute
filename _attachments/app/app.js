
var AppRouter = Backbone.Router.extend({

        routes: {
        	"/":                 "home",    // #home
        	"home":                 "home",    // #home
        	"newPatient":                 "newPatient",    // #newPatient
        	"arrestDocket/:query":                 "arrestDocket",    // #arrestDocket
        	"patient/:query":                 "patient",    // #patient
            "*actions": "defaultRoute" // matches http://example.com/#anything-here
        },
        defaultRoute: function( actions ){
            // The variable passed in matches the variable in the route definition "actions"
        	Patients.fetch();
        	(new HomeView()).render(); 
        },
        initialize: function() {
        },

        home: function () {
        	Patients.fetch();
        	(new HomeView()).render(); 
        },
        newPatient: function () {
        	registration = new Form({_id: "PatientRegistration"});
        	registration.fetch({
        		success: function(model){
        			(new FormView({model: model})).render(); 
        		}
        	});
        },
        arrestDocket: function (query) {
        	//Set the _id and then call fetch to use the backbone connector to retrieve it from couch
        	form = new Form({_id: "ArrestDocket"});
        	form.fetch({
        	  success: function(model){
        		  model.patientId = query;
        		  //console.log("patientId:: " + model.patientId + "; model: " + JSON.stringify(model));
        		 (new FormView({model: model})).render(); 
        	  }
        	});
        },
        patient: function (query) {
        	//Set the _id and then call fetch to use the backbone connector to retrieve it from couch
        	patient = new Patient({_id: query});
        	patient.fetch( {
        		success: function(model){
        			//patient.Records = new PatientRecordList({_id: query});	
        			patient.Records = new PatientRecordList();
        			console.log("patient.Records db: "+ patient.Records.db["view"]);
        			//patient.Records.db["keys"] = ["6857e31aa71f998c907d57b25e199cf2"];
        			patient.Records.db["keys"] = [query];	
        			console.log("Records:" + JSON.stringify(patient.Records));
        			patient.Records.fetch({
        			success : function(){
        				console.log("Records:" + JSON.stringify(patient.Records));
        				(new PatientRecordView({model: patient})).render(); 
        			},
        			error : function(){
        				console.log("error");
        			}
        			});
        		}
        	});
        }
    });
    // Initiate the router
    var router = new AppRouter;
    // Start Backbone history a neccesary step for bookmarkable URL's
    Backbone.history.start();
    


