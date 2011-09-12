var HomeView = Backbone.View.extend({
	//el: $("#homePageView"),
	template: loadTemplate("home.template.html"),

	initialize: function() {
		_.bindAll(this, 'addOne', 'reseted', 'render', 'search', 'orientation');
		//Patients = new PatientsList();
		FORMY.Patients.bind('add',   this.addOne, this);
		//FORMY.Patients.bind('search',   this.search, this);
		FORMY.Patients.bind('reset', this.reseted, this);
		FORMY.Patients.bind('all',   this.render, this);
		FORMY.Patients.bind('change', this.search, this);
		FORMY.Patients.bind('render', this.render, this);
		//FORMY.Patients.fetch();
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
		"click #form-client " : "clientLink",
		"click #form-config " : "configLink",
		"orientationEvent " : "orientation",
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
	  clientLink: function() {
		  FORMY.router.navigate('newPatient', true);
	  },
	  configLink: function() {
		  window.location.href = '/mobilefuton/_design/mobilefuton/index.html';
	  },
	search: function(e) {
		e.preventDefault();
		console.log("Searching");
		var searchTerm =  $('#search_string').val();
		FORMY.router.navigate('search/' + searchTerm, true);
	},
	orientation: "horiz",
	render: function() {
//		$("#formRenderingView").remove();
//		$("#patientRecordView").remove();
		//console.log("render in HomeView:" + JSON.stringify(this.model));
		//this.content = this.model.toJSON();
		
//		window.addEventListener(orientationEvent, function() {
//			alert('HOLY ROTATING SCREENS BATMAN:' + window.orientation + " " + screen.width);
//			}, false);
		// -90 480
		if (window.orientation == -90) {
			//alert('HOLY ROTATING SCREENS BATMAN - render vertical:' + window.orientation + " screen.width: " + screen.width);
			this.orientation = "vert";
			this.template =  loadTemplate("home.vert.template.html");
		} else {
			//alert('HOLY ROTATING SCREENS BATMAN - otherwise:' + window.orientation + " screen.width: " + screen.width);
			this.orientation = "horiz";
			this.template =  loadTemplate("home.vert.template.html");
			//this.template =  loadTemplate("home.template.html");
		}
		
		var homeViewHtml = this.template(this.model.toJSON());
		console.log("rendering HomeView");
		//$(this.el).html(homeViewHtml);
		$("#homePageView").html(homeViewHtml);
		//if(FORMY.Patients.length > 0){
		FORMY.Patients.each(this.addOne);

		//}
		$(".stripeMe tr").mouseover(function(){$(this).addClass("over");}).mouseout(function(){$(this).removeClass("over");});
		   $(".stripeMe tr:even").addClass("alt");
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