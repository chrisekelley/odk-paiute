FORMY.forms = new FormCollection();
FORMY.loadForm = function(name, patientId, options) {
	options || (options = {});
	var form = new Form({_id: name});
	if (typeof FORMY.forms.get(name) === "undefined") {
		console.log("fetching from db: " + name);
		form.fetch({
			success: function(form){
				var success = options.success;
			        if (success) {
						form.patientId = patientId;
						console.log("form.patientId: " + patientId);
						FORMY.forms.add(form);
						console.log("added " + name);
						success(form);
					}
				options.error = wrapError(options.error, name, options);
			}
		});
	} else {
		form = FORMY.forms.get(name);
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
        	"search/:query":                 "search",    // #search
        	"newPatient":                 "newPatient",    // #newPatient
        	"arrestDocket/:query":                 "arrestDocket",    // #arrestDocket
        	"patientRecords/:query":                 "patientRecords",    // #patientRecords
        	"record/:query":                 "record",    // #patientRecords
            "*actions": "home" // matches http://example.com/#anything-here - used to point to defaultRoute
        },
        // The following route is unused.
        defaultRoute: function( actions ){
        	console.log("defaultRoute route.");
            // The variable passed in matches the variable in the route definition "actions"
        	FORMY.Patients.fetch();
        	page = new Page({content: "Default List of patients:"});
        	//page = new Page({});
        	(new HomeView({model: page})).render(); 
        },
        home: function () {
        	console.log("home route.");
        	$("#homePageView").remove();
			$("#patientRecordView").remove();
			$("#formRenderingView").remove();
			if (! $("#homePageView").length){
				var viewDiv = document.createElement("div");
				viewDiv.setAttribute("id", "homePageView");
				$("#views").append(viewDiv);
			}
    		var searchResults = new PatientsList();
    		searchResults.db["keys"] = null;
    		searchResults.db["view"] = ["byPatientSorted?descending=true&limit=15"];
    		searchResults.fetch({
    		success : function(){
    			console.log("Fetching All Records.");
    			FORMY.Patients = searchResults;
    			console.log("render; Patients count: " + FORMY.Patients.length);
    			var page = new Page({content: "Default List of patients:"});
            	(new HomeView({model: page, el: $("#homePageView")})).render();
    		},
    		error : function(){
    			console.log("Error loading PatientRecordList: " + arguments); 
    		}
    		});
        },
        search: function (searchTerm) {
        	console.log("search route.");
        	$("#homePageView").remove();
			$("#patientRecordView").remove();
			$("#formRenderingView").remove();
			if (! $("#homePageView").length){
				var viewDiv = document.createElement("div");
				viewDiv.setAttribute("id", "homePageView");
				$("#views").append(viewDiv);
			}
    		console.log("Searching for " + searchTerm);
    		var searchResults = new PatientsList();
    		if (searchTerm !== "") {
    			searchResults.db["keys"] = [searchTerm];
    			searchResults.db["view"] = ["bySurnameOrId"];
    		} else {
    			console.log("This should reset the collection.");
    			searchResults.db["keys"] = null;
    			searchResults.db["view"] = ["byPatientSorted?descending=true&limit=15"];
    		}
    		searchResults.fetch({
    		success : function(){
    			//console.log("Records:" + JSON.stringify(patient.Records));
    			console.log("Fetching Records for:" + searchTerm);
    			console.log("searchResults: " + JSON.stringify(searchResults));
    			FORMY.Patients = searchResults;
    			console.log("render; Patients count: " + FORMY.Patients.length);
    			var page = new Page({content: "Default List of patients:"});
            	(new HomeView({model: page, el: $("#homePageView")})).render();
    		},
    		error : function(){
    			console.log("Error loading PatientRecordList: " + arguments); 
    		}
    		});
        },
        newPatient: function () {
			$("#homePageView").remove();
			$("#patientRecordView").remove();
			$("#formRenderingView").remove();
			if (! $("#formRenderingView").length){
				var viewDiv = document.createElement("div");
				viewDiv.setAttribute("id", "formRenderingView");
				$("#views").append(viewDiv);
			}
        	FORMY.loadForm("PatientRegistration",null,{
        		success: function(form, resp){
        			var newModel = new Form();
        			var newPatientFormView = new FormView({model: newModel, currentForm:form, el: $("#formRenderingView")});
        			newPatientFormView.render();
        		},
        		error: function() { 
        			console.log("Error loading PatientRegistration: " + arguments); 
        		}
        	});
        },
        arrestDocket: function (query) {
			$("#homePageView").remove();
			$("#patientRecordView").remove();
			$("#formRenderingView").remove();
			if (! $("#formRenderingView").length){
				var viewDiv = document.createElement("div");
				viewDiv.setAttribute("id", "formRenderingView");
				$("#views").append(viewDiv);
			}
        	FORMY.loadForm("ArrestDocket",query,{
        		success: function(form){
        			var newPatientFormView = new FormView({model: new Form(), currentForm:form, el: $("#formRenderingView")});
        			newPatientFormView.render();
        		},
        		error : function(){
        			console.log("Error loading ArrestDocket: " + arguments); 
        		}
        	});
        },
        patientRecords: function (query) {
        	console.log("patientRecords route.");
        	$("#homePageView").remove();
        	$("#formRenderingView").remove();
        	if (! $("#patientRecordView").length){
        		var viewDiv = document.createElement("div");
        		viewDiv.setAttribute("id", "patientRecordView");
        		$("#views").append(viewDiv);
        	}
        	//Set the _id and then call fetch to use the backbone connector to retrieve it from couch
        	FORMY.sessionPatient = new Patient({_id: query});
        	console.log("just made a new instance of a patient.");

        	FORMY.sessionPatient.fetch( {
        		success: function(model){
        			console.log("Just successfully fetched the patient.");
        			FORMY.sessionPatient.records = new PatientRecordList();
        			FORMY.sessionPatient.records.db["keys"] = [query];
        			FORMY.sessionPatient.records.fetch({
        			success : function(){
        				//console.log("Records:" + JSON.stringify(patient.Records));
        				console.log("Fetching Records for :" + query);
        				(new PatientRecordView({model: FORMY.sessionPatient})).render(); 
        			},
        			error : function(){
        				console.log("Error loading PatientRecordList: " + arguments); 
        			}
        			});
        		}
        	});
        },
        record: function (query) {
        	$("#homePageView").remove();
        	$("#formRenderingView").remove();
        	$("#patientRecordView").remove();
        	if (! $("#patientRecordView").length){
        		//$("#views").append("<div id=\"formRenderingView\"></div>");
        		var viewDiv = document.createElement("div");
        		viewDiv.setAttribute("id", "patientRecordView");
        		$("#views").append(viewDiv);
        	}
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

//Booststrap app after delay to avoid continuous activity spinner 
//_.delay(function(){
	// Initiate the router
	FORMY.router = new AppRouter();

	// Start Backbone history a necessary step for bookmarkable URL's
	Backbone.history.start();
	new PatientsList();
//}, 100);
