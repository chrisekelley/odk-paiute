FORMY.forms = new FormCollection();
FORMY.loadForm = function(name, patientId, options) {
	options || (options = {});
	var form = new Form({_id: name});
	if (typeof FORMY.forms.get(name) === "undefined") {
		console.log("fetching from db: " + name);
		form.fetch({
			success: function(form){
				FORMY.forms.add(form);
				//console.log("added " + name + "; into FORMY.forms: " + JSON.stringify(FORMYForm));
				console.log("added " + name + "; patientId: " + patientId);
				var success = options.success;
				//options.success = function(resp) {
			        if (success) {
						//console.log("added form: " + JSON.stringify(form.get("_id")) + " success: " + success);
						form.patientId = patientId;
						console.log("form.patientId: " + patientId);
						success(form);
					}
			     //};
				options.error = wrapError(options.error, name, options);
			}
		});
	} else {
		form = FORMY.forms.get(name);
		//console.log("this is a form: " + JSON.stringify(form) );
		form.patientId = patientId;
		console.log("fetched from FORMY: " + name + "; patientId: " + patientId);
		var success = options.success;
		if (success) {
			success(form);
		}
	}
};

// Wrap an optional error callback with a fallback error event.
// kudos: http://stackoverflow.com/questions/7090202/error-callback-always-fired-even-when-it-is-successful/7101589#7101589
var wrapError = function(onError, model, options) {
    return function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      if (onError) {
        onError(model, jqXHR, options);
      } else {
        //model.trigger('error', model, jqXHR, options);
        var message = "Error with " + name + " resp: " + resp;
    	console.log(message);
    	alert(message);
      }
    };
  };
 
var AppRouter = Backbone.Router.extend({

        routes: {
        	"/":                 "home",    // #home
        	"home":                 "home",    // #home
        	"newPatient":                 "newPatient",    // #newPatient
        	"arrestDocket/:query":                 "arrestDocket",    // #arrestDocket
        	"patientRecords/:query":                 "patientRecords",    // #patientRecords
        	"record/:query":                 "record",    // #patientRecords
            "*actions": "defaultRoute" // matches http://example.com/#anything-here
        },
        defaultRoute: function( actions ){
        	console.log("defaultRoute route.");
            // The variable passed in matches the variable in the route definition "actions"
        	//FORMY.Patients.fetch();
        	page = new Page({content: "Default List of patients:"});
        	(new HomeView({model: page})).render(); 
        },
        home: function () {
        	//console.log("home route.");
        	var page = new Page({content: "List of patients:"});
        	(new HomeView({model: page})).render(); 
        	//console.log("end home route.");
        },
        newPatient: function () {
        	FORMY.loadForm("PatientRegistration",null,{
        			success: function(form, resp){
        	        	(new FormView({model: form})).render();
        			},
        			error: function() { 
        				console.log("Error loading PatientRegistration: " + arguments); 
        			}
        		});
        },
        arrestDocket: function (query) {
        	FORMY.loadForm("ArrestDocket",query,{
    			success: function(form){
    	        	(new FormView({model: form})).render();
    			},
    			error : function(){
      				console.log("Error loading ArrestDocket: " + arguments); 
      			}
    		});
        },
        patientRecords: function (query) {
        	//Set the _id and then call fetch to use the backbone connector to retrieve it from couch
        	var patient = new Patient({_id: query});
        	patient.fetch( {
        		success: function(model){
        			patient.Records = new PatientRecordList();
        			patient.Records.db["keys"] = [query];
        			patient.Records.fetch({
        			success : function(){
        				//console.log("Records:" + JSON.stringify(patient.Records));
        				console.log("Fetching Records for :" + query);
        				(new PatientRecordView({model: patient})).render(); 
        			},
        			error : function(){
        				console.log("Error loading PatientRecordList: " + arguments); 
        			}
        			});
        		}
        	});
        },
        record: function (query) {
        	//Set the _id and then call fetch to use the backbone connector to retrieve it from couch
        	var record = new Record({_id: query});
        	record.fetch( {
        		success: function(model){
        			(new RecordView({model: record})).render(); 
        		},
				error : function(){
					console.log("Error loading RecordView: " + arguments); 
				}
        	});
        }
    });
    // Initiate the router
    var router = new AppRouter;
    // Start Backbone history a neccesary step for bookmarkable URL's
    Backbone.history.start();
    new PatientsList();
