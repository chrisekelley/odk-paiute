
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
        	//Patients.fetch();
        	page = new Page({content: "List of patients:"});
        	(new HomeView({model: page})).render(); 
        },
        initialize: function() {
        },

        home: function () {
        	//Patients.fetch();
        	page = new Page({content: "List of patients:"});
        	(new HomeView({model: page})).render(); 
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
        	  success: function(form){
        		  form.patientId = query;
        		  //console.log("patientId:: " + model.patientId + "; model: " + JSON.stringify(model));
        		 (new FormView({model: form})).render(); 
        	  }
        	});
        },
        patient: function (query) {
        	//Set the _id and then call fetch to use the backbone connector to retrieve it from couch
        	patient = new Patient({_id: query});
        	patient.fetch( {
        		success: function(model){
        			patient.Records = new PatientRecordList();
        			patient.Records.db["keys"] = [query];
        			patient.Records.fetch({
        			success : function(){
        				//console.log("Records:" + JSON.stringify(patient.Records));
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