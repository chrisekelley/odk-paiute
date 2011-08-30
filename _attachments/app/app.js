var FORMY = {};
FORMY.forms = new FormCollection();
//var registration = new Form({_id: "PatientRegistration"});
//registration.fetch({
//	success: function(registration){
//	FORMY.forms.add(registration);
//	console.log("added PatientRegistration in init.");
//	}
//});
//var docket = new Form({_id: "ArrestDocket"});
//docket.fetch({
//  success: function(docket){
//	  FORMY.forms.add(docket);
//	  console.log("added ArrestDocket in init.");
//  }
//});

FORMY.loadForm = function(name, patientId, options) {
	options || (options = {});
	var form = new Form({_id: name});
	if (FORMY.forms.get(name) === undefined) {
		form.fetch({
			success: function(form){
				FORMY.forms.add(form);
				//var formyForm = FORMY.forms.get(name);
				//console.log("added " + name + "; into FORMY.forms: " + JSON.stringify(formyForm));
				console.log("added " + name + "; patientId: " + patientId);
				var formySuccess = options.success;
				if (formySuccess) {
					//console.log("added form: " + JSON.stringify(form.get("_id")) + " success: " + success);
					form.patientId = patientId;
					console.log("form.patientId: " + patientId);
					formySuccess(form);
				}
				//return form;
			}
		});
	} else {
		form = FORMY.forms.get(name);
		//console.log("this is a form: " + JSON.stringify(form) );
		form.patientId = patientId;
		console.log("fetched from FORMY: " + name + "; patientId: " + patientId);
		var formySuccess = options.success;
		if (formySuccess) {
			formySuccess(form);
		}
	}
};


//Collection.prototype.listen_to_changes = function() {
//    if (!this._db_changes_enabled) {
//      this._db_changes_enabled = true;
//      if (!this._db_inst) {
//        this._db_inst = con.helpers.make_db();
//      }
//      return this._db_inst.info({
//        "success": this._db_prepared_for_changes
//      });
//    }
//  };
  
//function loadForm(name, callback) {
//	var form = new Form({_id: name});
//	form.fetch({
//		success: function(form){
//			FORMY.forms.add(form);
//			//console.log("added " + form);
//			console.log("added form: " + JSON.stringify(form.get("_id"))  + " callback: " + JSON.stringify(callback)); 
//		}
//	});
//	return form;
//}
 
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
        	page = new Page({content: "Default List of patients:"});
        	(new HomeView({model: page})).render(); 
        },
        initialize: function() {
        	//var thisForm = FORMY.loadForm("PatientRegistration");
        	//thisForm = FORMY.loadForm("ArrestDocket");
        	console.log(" inspecting FORMY.");
//        	FORMY.forms.each(function (form) {
//        		console.log("form: " + JSON.stringify(form));
//        	});
        },

        home: function () {
        	//Patients.fetch();
        	var page = new Page({content: "List of patients:"});
        	(new HomeView({model: page})).render(); 
        },
        newPatient: function () {
        	//$(this.el).remove();
//        	this.registration = new Form({_id: "PatientRegistration", formCollection: "patients"});
//        	this.registration.fetch({
//        		success: function(registration){	
//        			//(new FormView({model: registration})).render(); 
//        			this.view = new FormView({model: registration});
//        			this.view.render();
//        		}
//        	});
        	FORMY.loadForm("PatientRegistration",null,{
        			success: function(form){
        	        	(new FormView({model: form})).render();
        			}
        		});
        	//}
        	
        },
        arrestDocket: function (query) {
        	//Set the _id and then call fetch to use the backbone connector to retrieve it from couch
//        	this.docket = new Form({_id: "ArrestDocket", formCollection: "arrestDockets", patientId: query});
//        	this.docket.fetch({
//        	  success: function(docket){
//        		  //console.log("patientId:: " + docket.patientId + "; model: " + JSON.stringify(docket));
//        		  console.log(" model: " + JSON.stringify(docket));
//        		  docket.patientId = query;
//        		  //this.model = docket;
//        		  
////        		  this.view = new FormView({model: docket});
////        		  this.view.render();
//        		  (new FormView({model: docket})).render();
//        	  },
//        	  error : function(){
//  				console.log("error");
//  			}
//        	});
        	FORMY.loadForm("ArrestDocket",query,{
    			success: function(form){
    	        	(new FormView({model: form})).render();
    			}
    		});
        	//console.log("theForm: " + JSON.stringify(theForm));
        	//(new FormView({model: theForm})).render();
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
        				console.log("Fetching Records for :" + query);
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