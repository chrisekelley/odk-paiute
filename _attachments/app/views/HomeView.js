var HomeView = Backbone.View.extend({
	el: $("#homePageView"),
	template: loadTemplate("home.template.html"),

	initialize: function() {
		$("#formRenderingView").remove;
		$("#patientRecordView").remove;
//		var viewDiv = $("#views").createElement("div");
//		$(viewDiv).attr({id: "homePageView"});
		$("#views").append("<div id=\"homePageView\"></div>");
		//_.bindAll(this, "render", "addOne");
		_.bindAll(this, 'addOne', 'reseted', 'render', 'search');
		//Patients = new PatientsList();
		FORMY.Patients.bind('add',   this.addOne, this);
		//FORMY.Patients.bind('search',   this.search, this);
		FORMY.Patients.bind('reset', this.reseted, this);
		FORMY.Patients.bind('all',   this.render, this);
		FORMY.Patients.bind('change', this.search, this);
		FORMY.Patients.bind('render', this.render, this);
		FORMY.Patients.fetch();
		return this;
	}, 
	addOne : function(patient){
		this.view = new PatientListItemView({model: patient});
		this.rendered = this.view.render().el;
		//console.log("add one in HomeView:" + JSON.stringify(patient));
		//$(this.$("#patients")).append(this.rendered);
		$("#patients").append(this.rendered);
	},
	events: {
		"click #form-search " : "search",
	},
	reseted: function() {
		console.log("reseted; Patients count: " + FORMY.Patients.length);
		$(this.el).html("");
		FORMY.Patients.each(this.addOne);
	},
	remove: function() {
		  console.log("remove the view in homeView");
		  $(this.el).remove();
	  },
	search: function(e) {
		e.preventDefault();
		var searchTerm =  $('#search_string').val();
		//FORMY.Patients = new PatientsList({db : {view : "byPatientId"}});
		console.log("Searching for " + searchTerm);
		//var searchPatient = new Patient({surname: searchTerm});
		var searchResults = new PatientsList();
		if (searchTerm !== "") {
			searchResults.db["keys"] = [searchTerm];
			searchResults.db["view"] = ["bySurnameOrId"];
		} else {
			console.log("This should reset the collection.")
		}
		//var that = this;
		searchResults.fetch({
		success : function(){
			//console.log("Records:" + JSON.stringify(patient.Records));
			console.log("Fetching Records for:" + searchTerm);
			console.log("searchResults: " + JSON.stringify(searchResults));
			FORMY.Patients = searchResults;
			console.log("render; Patients count: " + FORMY.Patients.length);
			var page = new Page({content: "Default List of patients:"});
        	var homeView = new HomeView({model: page});
			FORMY.Patients.each(homeView.addOne);
			//(new PatientRecordView({model: FORMY.sessionPatient})).render(); 
		},
		error : function(){
			console.log("Error loading PatientRecordList: " + arguments); 
		}
		});
		
		
		//db : {view : "byPatientId",}
		//console.log("Searching...");
		//alert("Search TBD");
	},
	render: function() {
		$("#formRenderingView").remove();
		$("#patientRecordView").remove();
		//console.log("render in HomeView:" + JSON.stringify(this.model));
		//this.content = this.model.toJSON();
		var homeViewHtml = this.template(this.model.toJSON());
		console.log("rendering HomeView");
		//$(this.el).html(homeViewHtml);
		$("#homePageView").html(homeViewHtml);
		//if(FORMY.Patients.length > 0){
		FORMY.Patients.each(this.addOne);
		//}
		return this;
	},
});

var PatientListItemView = Backbone.View.extend({
	tagName : "tr",
	template: Handlebars.compile($("#patient-template").html()),
	initialize : function(){
		//this.model.bind('change', this.render, this);
		// from backbone-couch.js chat example:
		 _.bindAll(this, 'render');
		this.model.bind('change', this.render);
	},

	render : function(){ 
		this.content = this.model.toJSON();
		this.html = this.template(this.content);
		$(this.el).html(this.html);
		//console.log("render PatientListItemView: "+ JSON.stringify(html));
		return this;
	}
});