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
            "design": "design",    // #design
            "*actions": "home", // matches http://example.com/#anything-here - used to point to defaultRoute

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
    			searchResults.db["keys"] = null;
    			//searchResults.db["view"] = ["bySurnameOrId?startkey=\"" + searchTerm + "\"&endkey=\"" + searchTerm + "\u9999\""];
    			searchResults.db["view"] = ["bySurnameOrId?startkey=\"" + searchTerm + "\"&endkey=\"" + searchTerm + "Z\""];   			
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
			//Set the _id and then call fetch to use the backbone connector to retrieve it from couch
        	FORMY.sessionPatient = new Patient({_id: query});
        	console.log("just made a new instance of a patient.");
        	FORMY.sessionPatient.fetch( {
        		success: function(model){
        			console.log("Just successfully fetched the patient.");
                	FORMY.loadForm("ArrestDocket",query,{
                		success: function(form){
                			form.set({"patientSurname": FORMY.sessionPatient.get('surname')});
                			form.set({"patientForenames": FORMY.sessionPatient.get('forenames')});
                			form.set({"patientMiddle_name": FORMY.sessionPatient.get('Middle_name')});
                			var newPatientFormView = new FormView({model: new Form(), currentForm:form, el: $("#formRenderingView")});
                			newPatientFormView.render();
                		},
                		error : function(){
                			console.log("Error loading ArrestDocket: " + arguments); 
                		}
                	});
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
        			console.log("record: " + JSON.stringify(record));
        			var patient = new Patient({_id: record.get("patientId")});
        			console.log("just made a new instance of a patient.");
        			patient.fetch( {
        				success: function(model){
        					console.log("Just successfully fetched the patient.");
        					//record.set({"patient" : patient});
        					record.set({"patientSurname": patient.get('surname')});
        					record.set({"patientForenames": patient.get('forenames')});
        					record.set({"patientMiddle_name": patient.get('Middle_name')});
        					FORMY.sessionPatient = patient;
        					//console.log("record: " + JSON.stringify(record));        					
        					FORMY.loadForm(record.get("formId"), null,{
                        		success: function(form){
                        			(new RecordView({model: record, currentForm:form})).render();
                        		},
                        		error : function(){
                        			console.log("Error loading form: " + arguments); 
                        		}
                        	});
        				}
        			});
        		},
        		error : function(){
        			console.log("Error loading RecordView: " + arguments); 
        		}
        	});
        },
        design: function () {
        	console.log("design route ");
			$("#homePageView").remove();
			$("#patientRecordView").remove();
			$("#formRenderingView").remove();
			$("#designer").remove();
			if (! $("#designer").length){
				var viewDiv = document.createElement("div");
				viewDiv.setAttribute("id", "designer");
				$("#views").append(viewDiv);
			}
			formdesigner.launch({
	            rootElement: "#designer",
	            staticPrefix: "FormDesignerAlpha/",
//	            form: "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<h:html xmlns:h=\"http://www.w3.org/1999/xhtml\" xmlns:orx=\"http://openrosa.org/jr/xforms\" xmlns=\"http://www.w3.org/2002/xforms\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:jr=\"http://openrosa.org/javarosa\">\n\t<h:head>\n\t\t<h:title>Awesome Form</h:title>\n\t\t<model>\n\t\t\t<instance>\n\t\t\t\t<data xmlns:jrm=\"http://dev.commcarehq.org/jr/xforms\" xmlns=\"http://openrosa.org/formdesigner/D1465656-8E57-4307-AD3D-CD8F8492782B\" uiVersion=\"1\" version=\"1\" name=\"Awesome Form\">\n\t\t\t\t\t<question1 />\n\t\t\t\t\t<question2 />\n\t\t\t\t\t<question3 />\n\t\t\t\t\t<question4 />\n\t\t\t\t</data>\n\t\t\t</instance>\n\t\t\t<bind nodeset=\"/data/question1\" type=\"xsd:string\" />\n\t\t\t<bind nodeset=\"/data/question2\" type=\"xsd:string\" />\n\t\t\t<bind nodeset=\"/data/question3\" type=\"xsd:string\" />\n\t\t\t<bind nodeset=\"/data/question4\" type=\"xsd:string\" />\n\t\t\t<itext>\n\t\t\t\t<translation lang=\"en\" default=\"\">\n\t\t\t\t\t<text id=\"question1\">\n\t\t\t\t\t\t<value>So what's your name?</value>\n\t\t\t\t\t</text>\n\t\t\t\t\t<text id=\"question2\">\n\t\t\t\t\t\t<value>Are you male or female?</value>\n\t\t\t\t\t</text>\n\t\t\t\t\t<text id=\"question3\">\n\t\t\t\t\t\t<value>question3</value>\n\t\t\t\t\t</text>\n\t\t\t\t\t<text id=\"question4\">\n\t\t\t\t\t\t<value>question4</value>\n\t\t\t\t\t</text>\n\t\t\t\t</translation>\n\t\t\t</itext>\n\t\t</model>\n\t</h:head>\n\t<h:body>\n\t\t<input ref=\"/data/question1\">\n\t\t\t<label ref=\"jr:itext('question1')\" />\n\t\t</input>\n\t\t<input ref=\"/data/question2\">\n\t\t\t<label ref=\"jr:itext('question2')\" />\n\t\t</input>\n\t\t<input ref=\"/data/question3\">\n\t\t\t<label ref=\"jr:itext('question3')\" />\n\t\t</input>\n\t\t<input ref=\"/data/question4\">\n\t\t\t<label ref=\"jr:itext('question4')\" />\n\t\t</input>\n\t</h:body>\n</h:html>",
	            langs: ""
	        });
        },
    });

//Booststrap app after delay to avoid continuous activity spinner 
//_.delay(function(){
	// Initiate the router
	FORMY.router = new AppRouter();

	// Start Backbone history a necessary step for bookmarkable URL's
	Backbone.history.start();
	FORMY.Patients = new PatientsList();
	//new PatientsList();
//}, 100);
