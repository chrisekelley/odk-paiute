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
        		  //console.log("patientId:: " + model.patientId);
        		 (new FormView({model: model})).render(); 
        	  }
        	});
        },
        patient: function (query) {
        	//Set the _id and then call fetch to use the backbone connector to retrieve it from couch
        	//console.log("Patient: " + query);
        	patient = new Patient({_id: query});
        	patient.fetch({
        		success: function(model){
                	//console.log("patient function in app.js: " + JSON.stringify(model));
        			(new PatientRecordView({model: model})).render(); 
        		}
        	});
        }
    });
    // Initiate the router
    var router = new AppRouter;
    // Start Backbone history a neccesary step for bookmarkable URL's
    Backbone.history.start();
    


